from django.urls import include
from django.urls import path

from . import views

app_name = "loans"

urlpatterns = [
    path(
        "student-loans/",
        include("apps.loans.studentloans.urls", namespace="studentloans"),
    ),
    path(
        "applications/",
        include("apps.loans.applications.urls", namespace="applications"),
    ),
    path("prequalify/", views.prequalify, name="prequalify"),
]
