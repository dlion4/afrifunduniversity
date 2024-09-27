from rest_framework import generics
from rest_framework import permissions
from rest_framework import status
from rest_framework import views
from rest_framework import viewsets
from rest_framework.request import Request
from rest_framework.response import Response

from .models import Profile
from .models import ProfileAPIKey
from .models import User


class RequestAPIKeyView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request: Request, **kwargs):
        print(request.data)
        return Response(
            {"message": "api key created successfully"},
            status=status.HTTP_201_CREATED)
