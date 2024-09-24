from typing import Any

from django.shortcuts import render
from django.views.generic import TemplateView

from afrifunduniversity.help.models import Question, QuestionResponse
from apps.main_application.models import Policy
from apps.press.models import Article, Leadership


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
    articles = Article

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)
        context["articles"] = (
            self.articles.objects.prefetch_related("category").order_by("?")[:10]
        )
        return context

class AfriFundUniversityPromotionPageView(TemplateView):
    template_name = "pages/promotions.html"
    questions = QuestionResponse
    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)
        context["questions"] = (
            self.questions.objects.prefetch_related("question").filter(
            question__category__title="Scholarship",
        ))
        return context

class AfriFundUniversityPastPromotionPageView(TemplateView):
    template_name = "pages/promotions.html"


class AfrifundUniversityPrivacyPolicyPageView(TemplateView):
    template_name = "flatpages/privacy.html"
    policy = Policy
    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)
        context["policy"] = self.policy.objects.first()
        return context


class AfrifundUniversityLicensePageView(TemplateView):
    template_name = "flatpages/license.html"


class AfrifundUniversityTermsOfUsePageView(TemplateView):
    template_name = "flatpages/terms-of-use.html"

class AfrifundUniversitySitemapPageView(TemplateView):
    template_name = "flatpages/sitemap.html"



