from rest_framework import permissions
from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import EnvironmentConfig
from .serializers import EnvironmentConfigSerializer


class EnvironmentConfigView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, *args, **kwargs):
        # Assuming you want to return the first or latest configuration
        config = EnvironmentConfig.objects.first()
        if config:
            serializer = EnvironmentConfigSerializer(config)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(
            {"detail": "No configuration found."}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        # This will allow you to add a new environment config via POST
        serializer = EnvironmentConfigSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
