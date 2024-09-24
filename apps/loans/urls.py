from django.urls import include
from django.urls import path

app_name = "loans"
urlpatterns = [
    path(
        "student-loans/",
        include("apps.loans.studentloans.urls", namespace="studentloans"),
    ),
]
