from django.urls import path

from . import views

app_name = "studentloans"

urlpatterns = [
    path("private-student-loans/", views.index, name="private-student-loans"),
    path(
        "undergraduate-student-loans/",
        views.undergrad,
        name="undergraduate-student-loans"),
]
