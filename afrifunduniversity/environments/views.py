import contextlib

from rest_framework import permissions
from rest_framework import status
from rest_framework.generics import ListCreateAPIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.response import Response

from .models import EnvironmentConfig
from .serializers import EnvironmentConfigSerializer


class EnvironmentConfigListCreateApiView(ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = EnvironmentConfigSerializer
    queryset = EnvironmentConfig.objects.all()

    def list(self, request, *args, **kwargs) -> Response:
        with contextlib.suppress(EnvironmentConfig.DoesNotExist):
            instance = self.queryset.first()
            serializer = self.serializer_class(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response([], status=status.HTTP_200_OK)


    def create(self, request, *args, **kwargs):
        with contextlib.suppress(EnvironmentConfig.DoesNotExist):
            if existing_config := self.queryset.first():
                existing_config.delete()
        # Now add the new EnvironmentConfig object via POST
        serializer = EnvironmentConfigSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # This will create a new record
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EnvironmentConfigRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = EnvironmentConfigSerializer
    queryset = EnvironmentConfig.objects.all()


