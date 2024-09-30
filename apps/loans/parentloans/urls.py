from django.urls import path

from . import views

app_name = "parentloans"

urlpatterns = [
    path("", views.index, name="parent-loans"),
    # path(
    #     "undergraduate-student-loans/",
    #     views.undergrad,
    #     name="undergraduate-student-loans"),
]
