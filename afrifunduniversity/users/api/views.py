from rest_framework import generics, mixins
from rest_framework import permissions
from rest_framework import status
from rest_framework import views
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.mixins import ListModelMixin
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.mixins import UpdateModelMixin
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework import exceptions
from afrifunduniversity.users.models import Profile
from afrifunduniversity.users.models import ProfileAPIKey
from afrifunduniversity.users.models import User
from django.db import IntegrityError
from .serializers import ProfileAPIKeySerializer
from .serializers import UserSerializer


class UserViewSet(
    RetrieveModelMixin,
    ListModelMixin,
    UpdateModelMixin,
    mixins.CreateModelMixin,
    GenericViewSet,
    ):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    lookup_field = "pk"
    def retrieve(self, request: Request, *args, **kwargs) -> Response:
        email = request.data.get("email")
        user = None
        if email:
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                user = None
        if not user:
            try:
                user = self.get_object()
            except User.DoesNotExist:
                return Response(
                    {"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(user, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False)
    def me(self, request):
        serializer = UserSerializer(request.user, context={"request": request})
        return Response(status=status.HTTP_200_OK, data=serializer.data)

    def create(self, request: Request, *args, **kwargs) -> Response:
        try:
            user = User.objects.create_user(
                email=request.data["email"],
                password=request.data["password"],
            )
            serializer = self.get_serializer(user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except IntegrityError as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class RequestAPIKeyView(
    generics.CreateAPIView,
    generics.RetrieveAPIView
    ):
    permission_classes = [permissions.AllowAny]
    serializer_class = ProfileAPIKeySerializer
    def _validate_email(self, email:str)->bool:
        return bool(User.objects.filter(email=email).exists())
    def post(self, request: Request, **kwargs):
        print(request.data)
        if self._validate_email(request.data["email"]):
            try:
                instance = ProfileAPIKey.objects.create(
                    profile=Profile.objects.get(user=User.objects.get(email=request.data["email"])),
                    name=f"{request.data["email"]}_API_KEY",
                )
                serializer = self.get_serializer(instance)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except IntegrityError as e:
                return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(
            {"message": "Unknown credential"},
            status=status.HTTP_400_BAD_REQUEST)
    def get(self, request: Request, **kwargs):
        if self._validate_email(request.data.get("email")):
            try:
                instance = ProfileAPIKey.objects.get(
                    profile=Profile.objects.get(
                        user=User.objects.get(email=request.data.get("email"))),
                )
                serializer = self.serializer_class(instance)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except ProfileAPIKey.DoesNotExist:
                return Response(
                    {"message": "API key not found"},
                    status=status.HTTP_404_NOT_FOUND)
        return Response(
            {"message": "Unknown credential"},
            status=status.HTTP_400_BAD_REQUEST)
