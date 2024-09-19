from django.urls import path

from . import views

app_name = "help"
urlpatterns = [
    path("", views.HelpView.as_view(), name="help_home"),
]
