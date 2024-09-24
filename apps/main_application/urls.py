from django.urls import include
from django.urls import path

from .views import AfriFundUniversityAboutPageView
from .views import AfriFundUniversityCareersPageView
from .views import AfriFundUniversityContactPageView
from .views import AfriFundUniversityHomePageView
from .views import AfrifundUniversityLicensePageView
from .views import AfriFundUniversityPastPromotionPageView
from .views import AfrifundUniversityPrivacyPolicyPageView
from .views import AfriFundUniversityPromotionPageView
from .views import AfriFundUniversityResourcesPageView
from .views import AfriFundUniversityReviewsPageView
from .views import AfrifundUniversitySitemapPageView
from .views import AfrifundUniversityTermsOfUsePageView

urlpatterns = [
    path("", AfriFundUniversityHomePageView.as_view(), name="home"),
    path("about/",AfriFundUniversityAboutPageView.as_view(),name="about"),
    path("contact/",AfriFundUniversityContactPageView.as_view(),name="contact"),
    path("about/reviews/",AfriFundUniversityReviewsPageView.as_view(),name="reviews"),
    path("about/careers/",AfriFundUniversityCareersPageView.as_view(),name="careers"),
    path("about/resources/",AfriFundUniversityResourcesPageView.as_view(),name="resources"),
    path("promotions/",AfriFundUniversityPromotionPageView.as_view(),name="promotions"),
    path(
        "promotions/past-promotions/",
        AfriFundUniversityPastPromotionPageView.as_view(),
        name="past_promotions_view",
    ),
    path("privacy/", AfrifundUniversityPrivacyPolicyPageView.as_view(), name="privacy"),
    path("license/", AfrifundUniversityLicensePageView.as_view(), name="license"),
    path(
        "terms-of-use/",
        AfrifundUniversityTermsOfUsePageView.as_view(), name="terms-of-use"),
    path(
        "sitemap/",
        AfrifundUniversitySitemapPageView.as_view(), name="sitemap"),
]
