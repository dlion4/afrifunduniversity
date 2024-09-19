from rest_framework import generics
from rest_framework import permissions
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.press.models import Article
from apps.press.models import Category
from apps.press.models import PressRelease

from .serializers import ArticleSerializer
from .serializers import CategorySerializer
from .serializers import PressReleaseSerializer


class PressReleaseListView(generics.ListCreateAPIView):
    queryset = PressRelease.objects.using("afrifundpress").all()
    serializer_class = PressReleaseSerializer
    permission_classes = [permissions.AllowAny]


class ArticlesInfoListView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ArticleSerializer

    def get(self, request, *args, **kwargs):
        categories = Category.objects.using("afrifundpress").all()
        articles = Article.objects.using(
            "afrifundpress").prefetch_related("category").all()

        categories_data = CategorySerializer(categories, many=True).data
        articles_data = ArticleSerializer(articles, many=True).data

        return Response({
            "categories": categories_data,
            "articles": articles_data,
        })

