from django.urls import include
from django.urls import path

from . import views

app_name = "studentloans"

urlpatterns = [
    path("private-student-loans/", views.index, name="private-student-loans"),
    path("refinance/", views.refinance, name="refinance"),
    path(
        "undergraduate-student-loans/",
        views.undergrad,
        name="undergraduate-student-loans"),
    path("", views.StudentLoanView.as_view(), name="loans"),
    path("parent/",include("apps.loans.parentloans.urls", namespace="parentloans")),
    path("career/",include("apps.loans.careerloans.urls", namespace="careerloans")),
]
