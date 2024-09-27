from django.urls import include
from django.urls import path

app_name = "students"

urlpatterns = [
    path("", include("dashboard.students.student.urls", namespace="student")),
]
