from typing import Any
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
from django.views.generic import TemplateView
from .models import Question, QuestionResponse

# Create your views here.
def get_home_page(self):
    return HttpResponse("Hello")

class HelpView(TemplateView):
    template_name = "tenants/help/pages/index.html"
    faqs = Question

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context =  super().get_context_data(**kwargs)
        context["questions"] = self.faqs.objects.all().order_by("-id")[:4]
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


