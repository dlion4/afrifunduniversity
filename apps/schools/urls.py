from django.urls import include
from django.urls import path

app_name = "schools"
urlpatterns = [
    path("", include("apps.schools.school.urls", namespace="school")),
]
