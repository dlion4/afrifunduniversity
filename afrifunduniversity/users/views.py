import json

from django.contrib import messages
from django.contrib.auth import authenticate
from django.contrib.auth import login
from django.contrib.auth import logout
from django.db import IntegrityError
from django.http import HttpRequest
from django.http import HttpResponse
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.shortcuts import redirect
from django.urls import reverse
from django.utils.decorators import method_decorator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import FormView
from django.views.generic import TemplateView

from afrifunduniversity.users.models import User

from .forms import FrontendUserSignupForm
from .forms import PasswordResetForm
from .forms import PasswordResetRequestForm
from .forms import UserLoginForm
from .utils import UserAuthFlowController
from .utils import expiring_token_generator


class FormValidation:
    def validate_form_data(self, request:HttpRequest, *args, **kwargs):
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid data format"}, status=400)
        return data

class UserAuthenticationRedirectView:
    def dispatch(self, request: HttpRequest, *args, **kwargs) -> HttpResponse:
        if request.user.is_authenticated:
            return redirect("dashboard:students:student:home")
        return super().dispatch(request, *args, **kwargs) 

class LoginView(UserAuthenticationRedirectView, FormView, FormValidation):
    template_name = "account/login.html"
    form_class = UserLoginForm

    def post(self, request: HttpRequest, *args, **kwargs):
        data = self.validate_form_data(request, *args, **kwargs)
        next_url = data.get("next") or reverse("dashboard:students:student:home")
        user = authenticate(request, username=data.get("email"), password=data.get("password"))  # noqa: E501
        if user is not None:
            login(request, user)
            return JsonResponse({"message": "Authentication successful", "redirect_to": next_url})  # noqa: E501
        return JsonResponse({"error": "Invalid User Credentials"}, status=400)

class RegisterView(UserAuthenticationRedirectView, FormView, FormValidation):
    template_name = "account/register.html"
    form_class = FrontendUserSignupForm

    def post(self, request:HttpRequest, *args, **kwargs):
        data = self.validate_form_data(request, *args, **kwargs)
        form = self.form_class(data=data)
        if form.is_valid():
            return self.form_valid(form)
        return JsonResponse({"error": json.dumps(form.errors.as_text())}, status=400)

    def form_valid(self, form:FrontendUserSignupForm):
        try:
            dob = form.cleaned_data.get("dob")
            user = User.objects.create_user(email=form.cleaned_data.get("email"),password=form.cleaned_data.get("password"))  # noqa: E501
            user.dob = dob.strftime("%Y-%m-%d")
            user.is_active = False
            user.save()
            return JsonResponse({
                "message": """User account created successfully.""",
                "url": reverse("users:send-token"),
                "email": form.cleaned_data.get("email"),
                }, status=200)

        except IntegrityError:
            return JsonResponse({
                "error": "A user with this email or ID number already exists.",
            }, status=400)


class PasswordResetView(
    FormView, UserAuthenticationRedirectView, UserAuthFlowController, FormValidation):
    template_name = "account/reset-password.html"
    form_class = PasswordResetRequestForm
    def post(self, request: HttpRequest, *args, **kwargs):
        data = self.validate_form_data(request, *args, **kwargs)
        email = data.get("email")
        try:
            user = User.objects.get(email=email)
            self.send_password_reset_email(email=user.email)
            return JsonResponse(
                {"message": "Email sent with password reset instructions."},
                status=200)
        except User.DoesNotExist:
            return JsonResponse(
                {"error": "We could not find an account with that email"},
                status=400)

class AccountPasswordResetViewView(
    UserAuthenticationRedirectView, FormView, FormValidation):
    template_name = "account/reset-password-form.html"
    form_class = PasswordResetForm
    def post(self, request: HttpRequest, *args, **kwargs):
        data = self.validate_form_data(request, *args, **kwargs)
        email = data.pop("email", None)
        form = self.form_class(data=data)
        if form.is_valid():
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return JsonResponse({"error": "User not found"}, status=404)
            token = kwargs.get("token")
            if user and expiring_token_generator.check_token(user, token):
                user.set_password(form.cleaned_data.get("password"))
                user.save()
                request.session.flush()
                return JsonResponse(
                    {
                        "message": "Password reset successful",
                        "redirect_to_login": reverse("users:login"),
                    }, status=200)

            return JsonResponse({"error": "Invalid token or expired token"}, status=400)
        return JsonResponse({"error": form.errors.as_text()}, status=400)


class LogoutView(View):
    def get(self, request):
        logout(request)
        return redirect("users:login")

class LockScreenView(TemplateView):
    template_name = "account/lockscreen.html"
    def post(self, request:HttpRequest, *args, **kwargs):
        try:
            data:dict = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid data format"}, status=400)
        password:str = data.get("password")
        user:User = request.user
        if user.check_password(password):
            return JsonResponse({"success": "message obtained"}, status=200)
        return JsonResponse({"error": "Invalid password"}, status=400)

class SendTokenScreenView(UserAuthFlowController, TemplateView):
    template_name = "account/activate.html"
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    def post(self, request:HttpRequest, *args, **kwargs):
        try:
            data:dict = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid data format"}, status=400)
        try:
            user = get_object_or_404(User, email=data.get("email"))
        except User.DoesNotExist:
            return JsonResponse(
                {"error": "Something went wrong with the onboarding process"},
                status=400)
        self.send_verification_email(email=user.email)
        return JsonResponse(
            {"message": "Verification Email sent to your email"}, status=200)

class AccountEmailVerificationErrorScreenView(TemplateView):
    template_name = "account/token_expired.html"

class AccountEmailVerificationView(View):
    """
    Invalid test login link:
    http://127.0.0.1:8000/users/login/Mw/ccher2-a4994fd72a57823d4609173f1fc7abbd-sixp32
    """

    def get(self, request:HttpRequest, uid:str, token:str) -> HttpResponse:
        try:
            uuid = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=uuid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user and expiring_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            messages.success(request, "Email Verified successfully")
            return redirect("users:login")
        return redirect("users:token-expired")
