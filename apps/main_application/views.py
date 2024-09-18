from django.shortcuts import render
from django.views.generic import TemplateView


class AfriFundUniversityHomePageView(TemplateView):
    template_name="pages/home.html"

class AfriFundUniversityAboutPageView(TemplateView):
    template_name="pages/about.html"

class AfriFundUniversityContactPageView(TemplateView):
    template_name="pages/contact.html"


class AfriFundUniversityReviewsPageView(TemplateView):
    template_name="pages/reviews.html"


class AfriFundUniversityCareersPageView(TemplateView):
    template_name="pages/careers.html"

class AfriFundUniversityResourcesPageView(TemplateView):
    template_name = "pages/resources.html"
