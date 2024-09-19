import contextlib

from rest_framework import permissions
from rest_framework import status
from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

from apps.press.apis.serializers import ArticleSerializer
from apps.press.apis.serializers import CategorySerializer
from apps.press.apis.serializers import LeadershipSerializer
from apps.press.apis.serializers import ParagraphSerializer
from apps.press.apis.serializers import PressReleaseSerializer
from apps.press.models import Article
from apps.press.models import Category
from apps.press.models import Leadership
from apps.press.models import Paragraph
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


# The `LeadershipViewSet` is a viewset class that handles API requests related to the
# `Leadership` model in the application. It is set up as a ModelViewSet, which means it provides
# CRUD (Create, Retrieve, Update, Delete) operations for the `Leadership` model.
class LeadershipViewSet(viewsets.ModelViewSet):
    queryset = Leadership.objects.using("afrifundpress").all()
    serializer_class = LeadershipSerializer
    permission_classes = [permissions.AllowAny]

class ParagraphViewSet(viewsets.ModelViewSet):
    queryset = Paragraph.objects.using("afrifundpress").all()
    model = Paragraph
    serializer_class = ParagraphSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs) -> Response:
        leadership_id = self.kwargs.get("leadership_pk")
        if leadership_id is None:
            raise ValidationError({"leadership": "Leadership ID is required."})
        try:
            leader = Leadership.objects.using("afrifundpress").get(pk=leadership_id)
            instance = self.model.objects.using("afrifundpress").create(
                leadership=leader,
                **request.data,
            )
            serializer = self.serializer_class(instance)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Leadership.DoesNotExist as e:
            raise ValidationError(
                {"leadership": "No leader with the provided ID"},
            ) from e

        # Extract leadership_id from kwargs


    def list(self, request, *args, **kwargs) -> Response:
        leadership_id = kwargs.get("leadership_pk")
        instance = self.queryset.filter(leadership__pk=leadership_id)
        serializer = self.serializer_class(instance, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

