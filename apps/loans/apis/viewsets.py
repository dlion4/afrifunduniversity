from rest_framework import permissions
from rest_framework import status
from rest_framework import viewsets

from apps.loans.models import Glossary

from .serializers import GlossarySerializer


class GlossaryModelViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Glossary.objects.all()
    serializer_class = GlossarySerializer

