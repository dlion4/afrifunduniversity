from django.urls import path

from . import views

app_name = "careerloans"

urlpatterns = [
    path("", views.index, name="career-loans"),
    # path(
    #     "undergraduate-student-loans/",
    #     views.undergrad,
    #     name="undergraduate-student-loans"),
]
