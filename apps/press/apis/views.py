from .serializers import PressReleaseSerializer
from ..models import PressRelease
from rest_framework.generics import  GenericAPIView
from rest_framework.response import Response



class PressReleaseListView(GenericAPIView):
    def get(self, request, *args, **kwargs):
        press_releases = PressRelease.objects.using("afrifundpress").all()
        serializer = PressReleaseSerializer(press_releases, many=True)
        return Response(serializer.data)