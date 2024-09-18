from django.urls import path

from .views import LoginView
from .views import RegisterView

app_name = "users"
urlpatterns = [
    path("login/", view=LoginView.as_view(), name="login"),
    path("create-account/", view=RegisterView.as_view(), name="register"),
]
