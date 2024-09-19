
from typing import Any
from django.http import JsonResponse
from django.views.generic import TemplateView

from apps.press.models import Article, PressRelease


class AfriFundPressView(TemplateView):
    template_name = "press/index.html"


class AfriFundPressReleaseDetailView(TemplateView):
    template_name = "press/detail.html"
    model = PressRelease

    def get_object(self, **kwargs):
        return (
            self.model.objects.using(
                "afrifundpress").get(
                date__year=kwargs.get("year"),
                date__month=kwargs.get("month"),
                date__day=kwargs.get("day"),
                slug=kwargs.get("slug"),
                )
        )
    def get_shareable_url(self, **kwargs):
        return self.request.build_absolute_uri(self.get_object(**kwargs).get_absolute_url())
    
    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context =  super().get_context_data(**kwargs)
        context["release"] = self.get_object(**kwargs)
        context["release_get_shareable_url"] = self.get_object(**kwargs)
        return context

class AfriFundArticleListView(TemplateView):
    template_name = "press/articles/index.html"


class AfriFundArticleDetailView(TemplateView):
    template_name = "press/articles/detail.html"

    def get_object(self, **kwargs):
        return Article.objects.using("afrifundpress").get(
            category__slug=kwargs.get("category_slug"),
            date__year=kwargs.get("year"),
            date__month=kwargs.get("month"),
            date__day=kwargs.get("day"),
            slug=kwargs.get("slug"),
        )
    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)
        context["article"] = self.get_object(**kwargs)
        return context

