import contextlib

from django.shortcuts import get_object_or_404
from rest_framework import permissions
from rest_framework import status
from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.request import Request
from rest_framework.response import Response

from apps.press.apis.serializers import ArticleSerializer
from apps.press.apis.serializers import CategorySerializer
from apps.press.apis.serializers import FootNoteSerializer
from apps.press.apis.serializers import LeadershipSerializer
from apps.press.apis.serializers import ParagraphSerializer
from apps.press.apis.serializers import PressReleaseSerializer
from apps.press.models import Article
from apps.press.models import Category
from apps.press.models import FootNote
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



    def list(self, request, *args, **kwargs) -> Response:
        leadership_id = kwargs.get("leadership_pk")
        instance = self.queryset.filter(leadership__pk=leadership_id)
        serializer = self.serializer_class(instance, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



class FootNoteModelViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = FootNoteSerializer

    def get_queryset(self):
        return FootNote.objects.using("afrifundpress").all()
    def create(self, request: Request, *args, **kwargs) -> Response:
        instance = FootNote.objects.using("afrifundpress").create(**request.data)
        serializer = self.serializer_class(instance)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    def list(self, request: Request, *args, **kwargs) -> Response:
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def get_object(self):
        return FootNote.objects.using("afrifundpress").get(pk=self.kwargs.get("pk"))
    def partial_update(self, request: Request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.serializer_class(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(using="afrifundpress")
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
