from django.db import IntegrityError
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.utils.text import slugify
from drf_spectacular.utils import OpenApiParameter
from drf_spectacular.utils import extend_schema
from rest_framework import permissions
from rest_framework import status
from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.generics import ListCreateAPIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.response import Response

from afrifunduniversity.help.models import Category
from afrifunduniversity.help.models import ContactBlock
from afrifunduniversity.help.models import Question
from afrifunduniversity.help.models import QuestionResponse
from afrifunduniversity.help.models import QuestionResponseArticle

# from afrifunduniversity.help.models import QuestionResponseArticleContent
from .serializers import ContactBlockSerializer
from .serializers import HelpCategorySerializer

# from .serializers import QuestionResponseArticleContentSerializer
from .serializers import QuestionResponseArticleSerializer
from .serializers import QuestionResponseSerializer
from .serializers import QuestionSerializer


class ContactBlockModelViewSet(viewsets.ModelViewSet):
    queryset = ContactBlock.objects.all()[:3]  # Limit to the first 3
    serializer_class = ContactBlockSerializer
    permission_classes = [permissions.AllowAny]

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = {
            "blocks": serializer.data,
            "images": [],
            "imageHeight": "50px",
            "numberColumns": 3,
            "color": "white",
        }
        return Response(data)


class QuestionModelViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = QuestionSerializer


class QuestionResponseModelViewSet(viewsets.ModelViewSet):
    queryset = QuestionResponse.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = QuestionResponseSerializer

    def create(self, request, *args, **kwargs) -> Response:
        q_pk = kwargs.pop("question_pk", None)
        if not q_pk:
            raise ValidationError(
                {"detail": "Question primary key (question_pk) is required."})
        question = get_object_or_404(Question, pk=q_pk)
        title = request.data.pop("title")
        if not title:
            raise ValidationError({"detail": "Title field is required."})
        slug = slugify(title)
        try:
            instance = QuestionResponse.objects.create(
                question=question,
                title=title,
                slug=slug,
                **request.data,
            )
        except (ValidationError, IntegrityError) as e:
            raise ValidationError(
                {"detail": f"Error creating QuestionResponse: {e!s}"},
            ) from e
        serializer = self.serializer_class(instance)
        return Response(serializer.data, status=status.HTTP_201_CREATED)




class QuestionResponseArticleModelViewSet(viewsets.ModelViewSet):
    queryset = QuestionResponseArticle.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = QuestionResponseArticleSerializer


    @extend_schema(
        parameters=[
            OpenApiParameter(
                "response__question___pk",
                int, description="Primary key of the question"),
            OpenApiParameter(
                "response_pk",
                int, description="Primary key of the response"),
            OpenApiParameter("title", str, description="Title of the article"),
            OpenApiParameter("slug", str, description="Slug of the article"),
            OpenApiParameter("content", str, description="Content of the article"),
        ],
    )
    def create(self, request, *args, **kwargs) -> Response:
        # [('question_pk', '2'), ('response_pk', '1')]  # noqa: ERA001
        question_pk = kwargs.get("question_pk", None)
        response_pk = kwargs.get("response_pk", None)
        if question_pk is None and response_pk is None:
            raise ValidationError(
                {"detail": """
                 Question primary key (question_pk) and Response Primary Key
                 (response_pk) are required."""})
        # question = get_object_or_404(Question, pk=question_pk)  # noqa: E501, ERA001, RUF100
        response = QuestionResponse.objects.get(pk=response_pk)
        title = request.data.pop("title", None)

        slug = slugify(title)
        if not title:
            raise ValidationError({"detail": "Title field is required."})
        try:
            instance = QuestionResponseArticle.objects.create(
                response=response,
                title=title,
                slug=slug,
                **request.data,
            )
        except (ValidationError, IntegrityError) as e:
            raise ValidationError(
                {"detail": f"Error creating the resources {e!s}"}) from e
        serializer = self.serializer_class(instance)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


    @extend_schema(
        parameters=[
            OpenApiParameter(
                "response__question___pk",
                int,
                description="Primary key of the question"),
            OpenApiParameter(
                "id", int, description="Primary key of the article"),
            OpenApiParameter(
                "response__question__slug",
                str,
                description="Slug of the question"),
            OpenApiParameter(
                "response__pk",
                int, description="Primary key of the response"),
            OpenApiParameter(
                "response__slug", str, description="Slug of the response"),
            OpenApiParameter("pk", int, description="Primary key of the article"),
            OpenApiParameter("slug", str, description="Slug of the article"),
        ]
    )
    def retrieve(self, request, question_pk, id, question_slug, response_pk, response_slug, article_pk, article_slug):
        # Your logic here
        pass

# class QuestionResponseArticleContentModelViewSet(viewsets.ModelViewSet):
#     queryset = QuestionResponseArticleContent
#     serializer_class = QuestionResponseArticleContentSerializer
#     permission_classes = [permissions.AllowAny]


class CategoryModelViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = HelpCategorySerializer
    queryset = Category.objects.all()
