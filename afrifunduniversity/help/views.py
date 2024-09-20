from typing import Any
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, render
from django.views.generic import TemplateView
from .models import Question, QuestionResponse, QuestionResponseArticle
from rest_framework import views as api_views, generics as api_generics
from rest_framework.response import Response
from rest_framework import status
from afrifunduniversity.help.apis.serializers import QuestionResponseArticleSerializer
from rest_framework import permissions
import json

# Create your views here.
def get_home_page(self):
    return HttpResponse("Hello")

class HelpView(TemplateView):
    template_name = "tenants/help/pages/index.html"
    faqs = Question

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context =  super().get_context_data(**kwargs)
        context["questions"] = self.faqs.objects.all().order_by("-id")[:4]
        context["top_fags"] = QuestionResponseArticle.objects.prefetch_related("response").order_by("-id")[:12]
        return context


class QuestionCategoryDetailView(TemplateView):
    template_name = "tenants/help/pages/question.html"
    model = Question

    def get_question_object(self, **kwargs):
        return get_object_or_404(
            self.model,
            pk=kwargs.get("pk"),
            slug=kwargs.get("question_slug"),
        )
    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context =  super().get_context_data(**kwargs)
        context["question"] = self.get_question_object(**kwargs)
        context["questions"] = self.model.objects.all().order_by("-id")
        return context

class QuestionResponseDetailView(TemplateView):
    # pk question_slug response_pk response_slug
    template_name = "tenants/help/pages/response.html"
    question_queryset = Question.objects.all().order_by("-id")
    response_queryset = QuestionResponse.objects.prefetch_related(
        "question").order_by("-id")

    def get_question_response_object(self, **kwargs):
        return get_object_or_404(
            QuestionResponse,
            question__pk=kwargs.get("pk"),
            question__slug=kwargs.get("question_slug"),
            pk=kwargs.get("response_pk"),
            slug=kwargs.get("response_slug"),
        )
    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context =  super().get_context_data(**kwargs)
        context["questions"] = self.question_queryset
        context["responses"] = self.response_queryset
        context["response"] = self.get_question_response_object(**kwargs)
        return context


class QuestionResponseArticleDetailView(TemplateView):
    template_name = "tenants/help/pages/article.html"
    question_queryset = Question.objects.all().order_by("-id")
    response_queryset = QuestionResponse.objects.prefetch_related(
        "question").order_by("-id")
    article_queryset = QuestionResponseArticle.objects.prefetch_related(
        "response").order_by("-id")

    def get_question_response_article_object(self, **kwargs):
        return get_object_or_404(
            QuestionResponseArticle,
            response__question__pk=kwargs.get("pk"),
            response__question__slug=kwargs.get("question_slug"),
            response__pk=kwargs.get("response_pk"),
            response__slug=kwargs.get("response_slug"),
            pk=kwargs.get("article_pk"),
            slug=kwargs.get("article_slug")
        )
    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context =  super().get_context_data(**kwargs)
        context["questions"] = self.question_queryset
        context["responses"] = self.response_queryset
        context["articles"] = self.article_queryset
        context["article"] = self.get_question_response_article_object(**kwargs)
        context["current_pk"] = (
            self.get_question_response_article_object(**kwargs).pk
        )
        return context
    
class QuestionResponseArticleVoteView(api_generics.RetrieveUpdateAPIView):
    serializer_class = QuestionResponseArticleSerializer
    queryset = QuestionResponseArticle
    permission_classes = [permissions.AllowAny]

    def put(self, request, *args, **kwargs)->JsonResponse:
        try:
            data:dict = json.loads(request.body)
        except json.JSONDecodeError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        try:
            article = get_object_or_404(
                QuestionResponseArticle,
                pk=data.get("pk"),
                slug=data.get("slug")
            )
        except QuestionResponseArticle.DoesNotExist:
            return Response(
                {"detail": "Error updating the article voting"},
                status=status.HTTP_400_BAD_REQUEST)
        is_upvote = data.get("upvote", False)
        if is_upvote:
            article.up_vote += 1
        else:
            article.down_vote += 1
        article.save()
        serializer = self.serializer_class(instance=article)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def get(self, request, *args, **kwargs):
        return Response({"message": "Item Retrieved"})
