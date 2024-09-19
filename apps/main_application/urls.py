from django.urls import include
from django.urls import path

from .views import AfriFundUniversityAboutPageView
from .views import AfriFundUniversityCareersPageView
from .views import AfriFundUniversityContactPageView
from .views import AfriFundUniversityHomePageView
from .views import AfriFundUniversityResourcesPageView
from .views import AfriFundUniversityReviewsPageView

urlpatterns = [
    path("", AfriFundUniversityHomePageView.as_view(), name="home"),
    path("about/",AfriFundUniversityAboutPageView.as_view(),name="about"),
    path("contact/",AfriFundUniversityContactPageView.as_view(),name="contact"),
    path("about/reviews",AfriFundUniversityReviewsPageView.as_view(),name="reviews"),
    path("about/careers",AfriFundUniversityCareersPageView.as_view(),name="careers"),
    path("about/resources",AfriFundUniversityResourcesPageView.as_view(),name="resources"),
]
