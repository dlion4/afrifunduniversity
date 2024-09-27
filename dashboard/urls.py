from django.urls import include
from django.urls import path

app_name = "dashboard"

urlpatterns = [
    path("students/", include("dashboard.students.urls", namespace="students")),
]
