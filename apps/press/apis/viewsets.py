from rest_framework import permissions
from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response

from apps.press.apis.serializers import ArticleSerializer
from apps.press.apis.serializers import CategorySerializer
from apps.press.apis.serializers import PressReleaseSerializer
from apps.press.models import Article
from apps.press.models import Category
from apps.press.models import PressRelease


class PressReleaseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PressRelease.objects.using("afrifundpress").all()
    serializer_class = PressReleaseSerializer
    permission_classes = [permissions.AllowAny]

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.using("afrifundpress").all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]



class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.using("afrifundpress").prefetch_related("category").all()
    serializer_class = ArticleSerializer
    permission_classes = [permissions.AllowAny]
