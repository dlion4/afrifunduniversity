from django.urls import path

from .views import LoginView
from .views import LogoutView
from .views import PasswordResetView
from .views import RegisterView

app_name = "users"
urlpatterns = [
    path("login/", view=LoginView.as_view(), name="login"),
    path("logout/", view=LogoutView.as_view(), name="logout"),
    path("create-account/", view=RegisterView.as_view(), name="register"),
    path("reset-password/", view=PasswordResetView.as_view(), name="password_reset"),
]
