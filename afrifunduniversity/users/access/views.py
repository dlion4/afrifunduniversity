import json
from django.contrib.auth import get_user_model
from django.contrib.auth import login
from django.contrib.auth.models import UserManager
from django.contrib.sessions.models import Session
from django.http import HttpRequest, JsonResponse
from django.urls import reverse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from rest_framework import permissions
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from afrifunduniversity.users.api.serializers import UserSerializer


class UserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        data = {
            "id": user.id,
            "username": user.email,
            "is_active": user.is_active,
            "is_staff": user.is_staff,
            "is_superuser": user.is_superuser,
            "Date Joined": user.date_joined,
        }
        return Response(data, status=200)

User = get_user_model()  # This retrieves your custom user model

@method_decorator(csrf_exempt, name="dispatch")
class UpdateSessionView(View):

    def post(self, request:HttpRequest, *args, **kwargs):
        if user_id := json.loads(request.body).get("user_id"):
            try:
                return self._extracted_from_post_4(request, user_id)
            except User.DoesNotExist:
                return JsonResponse(
                    {"error": "User not found."},
                    status=status.HTTP_404_NOT_FOUND,
                )
            except Exception as e:  # noqa: BLE001
                return JsonResponse(
                    {"error": str(e)},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
        return JsonResponse(
            {"error": "No user ID provided."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    def _extracted_from_post_4(self, request: HttpRequest, user_id:int):
        user = User.objects.get(pk=user_id)
        login(request, user)
        return JsonResponse(
            {
                "success": True,
                "message": "Session updated.",
                "url": request.build_absolute_uri(reverse("home")),
            },
            status=status.HTTP_200_OK,
        )
