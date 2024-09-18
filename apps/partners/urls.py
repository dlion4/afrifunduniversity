from django.urls import include
from django.urls import path

app_name = "partners"

urlpatterns = [
    path("", include("apps.partners.partner.urls", namespace="partner")),
]
