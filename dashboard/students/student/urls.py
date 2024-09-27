from django.urls import include
from django.urls import path

from . import views

app_name = "student"

urlpatterns = [
    path("", views.StudentPortalDashboardHomeView.as_view(), name="home"),
]
