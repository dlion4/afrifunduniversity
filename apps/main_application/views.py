from typing import Any

from django.shortcuts import render
from django.views.generic import TemplateView

from apps.press.models import Leadership


class AfriFundUniversityHomePageView(TemplateView):
    template_name="pages/home.html"

class AfriFundUniversityAboutPageView(TemplateView):
    template_name="pages/about.html"
    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context =  super().get_context_data(**kwargs)
        context["leadership"] = Leadership.objects.using(
            "afrifundpress").all().order_by("id")
        return context


class AfriFundUniversityContactPageView(TemplateView):
    template_name="pages/contact.html"


class AfriFundUniversityReviewsPageView(TemplateView):
    template_name="pages/reviews.html"


class AfriFundUniversityCareersPageView(TemplateView):
    template_name="pages/careers.html"

class AfriFundUniversityResourcesPageView(TemplateView):
    template_name = "pages/resources.html"
