import json
import time
from typing import Any

from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.db import IntegrityError
from django.http import HttpRequest
from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from django.views.generic import DetailView
from django.views.generic import FormView
from django.views.generic import RedirectView
from django.views.generic import TemplateView
from django.views.generic import UpdateView

from afrifunduniversity.users.models import User

from .forms import FrontendUserSignupForm
from .forms import UserLoginForm


class FormValidation:
    def validate_form_data(self, request:HttpRequest, *args, **kwargs):
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid data format"}, status=400)
        return data


class LoginView(FormView, FormValidation):
    template_name = "account/login.html"
    form_class = UserLoginForm


    def post(self, request:HttpRequest, *args, **kwargs):
        data = self.validate_form_data(request, *args, **kwargs)
        form = self.form_class(data=data)
        if form.is_valid():
            return self.form_valid(form)
        return JsonResponse({"error": json.dumps(form.errors.as_text())})

    def form_valid(
        self,
        form: UserLoginForm) -> HttpResponse|JsonResponse:
        user = authenticate(
            self.request,
            email=form.cleaned_data.get("email"),
            password=form.cleaned_data.get("password"),
            )
        if user is not None:
            login(self.request, user)
            return JsonResponse(
                {"message", "User authenticated. Redirecting in 5 seconds ..."})
        return JsonResponse({
            "error": "Authentication Failed. Invalid Login credentials",
            }, status=400)



class RegisterView(FormView, FormValidation):
    template_name = "account/register.html"
    form_class = FrontendUserSignupForm

    def post(self, request:HttpRequest, *args, **kwargs):
        data = self.validate_form_data(request, *args, **kwargs)
        form = self.form_class(data=data)
        if form.is_valid():
            return self.form_valid(form)
        print(form.errors)
        return JsonResponse({"error": json.dumps(form.errors.as_text())}, status=400)

    def form_valid(self, form:FrontendUserSignupForm):
        try:
            dob = form.cleaned_data.get("dob")
            user = User.objects.create(
                email=form.cleaned_data.get("email"),
                password=form.cleaned_data.get("national_id_number"),
                dob=dob.strftime("%Y-%m-%d"),
                national_id_number=form.cleaned_data.get("national_id_number"),
                terms_and_conditions=form.cleaned_data.get("terms_and_conditions"),
            )
            user.set_password(form.cleaned_data.get("national_id_number"))
            user.save()
            return JsonResponse({
                "message": """
                User account created successfully.
                Check your email for instructions on how to proceed from here!""",
                "success": True,
                })

        except IntegrityError:
            return JsonResponse({
                "error": "A user with this email or ID number already exists.",
            }, status=400)
