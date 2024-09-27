
from typing import ClassVar

from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.db.models import EmailField
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from rest_framework_api_key.models import AbstractAPIKey

from .managers import ProfileAPIKeyManager
from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    """
    Default custom user model for afrifunduniversity.
    If adding fields that need to be filled at user signup,
    check forms.SignupForm and forms.SocialSignupForms accordingly.
    """

    # dob = models.DateField(_("Your date of birth"))
    email = EmailField(_("Email Address"), unique=True)
    # national_id_number = models.IntegerField(
    #     _("Your National Identification Number"), unique=True)
    terms_and_conditions = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects: ClassVar[UserManager] = UserManager()

    def get_absolute_url(self):
        return reverse(
            "api:user-detail",
            kwargs={"pk": self.pk},
        )


class Profile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="user_profile")
    def __str__(self):
        return self.user.email


class ProfileAPIKey(AbstractAPIKey):
    profile = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name="profile_api_keys",
    )
    objects = ProfileAPIKeyManager()
    class Meta(AbstractAPIKey.Meta):
        verbose_name = "Profile API key"
        verbose_name_plural = "Profile API keys"


class AuthenticationToken(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user_authentication_token")
    hashed_token = models.CharField(max_length=120, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expiry_date = models.DateTimeField()
    is_expired = models.BooleanField(default=False)
    is_revoked = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Authentication token"
        verbose_name_plural = "Authentication tokens"
        ordering = ["-created_at"]

    def __str__(self):
        return f"Token for user {self.user.email}"
