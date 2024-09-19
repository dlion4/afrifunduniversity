from django.urls import include
from django.urls import path

app_name = "ss"

urlpatterns = [
    path("help/", include("afrifunduniversity.help.urls", namespace="help")),
]
