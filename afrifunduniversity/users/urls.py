from django.urls import path

from .views import AccountEmailVerificationView
from .views import AccountEmailVerificationErrorScreenView
from .views import LockScreenView
from .views import LoginView
from .views import LogoutView
from .views import PasswordResetView
from .views import RegisterView
from .views import SendTokenScreenView
from .views import AccountPasswordResetViewView

app_name = "users"
urlpatterns = [
    path("login/", view=LoginView.as_view(), name="login"),
    path("logout/", view=LogoutView.as_view(), name="logout"),
    path("registration/", view=RegisterView.as_view(), name="register"),
    path("reset-password/", view=PasswordResetView.as_view(), name="password_reset"),
    path("index/lockscreen", view=LockScreenView.as_view(), name="lockscreen"),
    path("uno/dos/registration", view=SendTokenScreenView.as_view(), name="send-token"),
    path(
        "uno/dos/verification/<uid>/<token>",
        view=AccountEmailVerificationView.as_view(),
        name="verify-email"),
    path(
        "uno/dos/verification/failed",
        view=AccountEmailVerificationErrorScreenView.as_view(),
        name="token-expired"),
    path(
        "uno/dos/password/reset/<token>",
        view=AccountPasswordResetViewView.as_view(),
        name="reset-password-view"),
]
