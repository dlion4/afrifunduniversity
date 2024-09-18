from rest_framework import viewsets
from apps.press.apis.serializers import PressReleaseSerializer
from apps.press.models import PressRelease
from rest_framework import permissions

class PressReleaseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PressRelease.objects.using("afrifundpress").all()
    serializer_class = PressReleaseSerializer
    permission_classes = [permissions.AllowAny]