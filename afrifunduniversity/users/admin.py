from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.utils.translation import gettext_lazy as _
from rest_framework_api_key.admin import APIKeyModelAdmin

from .forms import UserAdminChangeForm
from .forms import UserAdminCreationForm
from .models import ProfileAPIKey
from .models import User, Profile, AuthenticationToken


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):
    form = UserAdminChangeForm
    add_form = UserAdminCreationForm
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (_("Personal info"), {"fields": ("national_id_number",)}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined", "dob")}),
    )
    list_display = ["email", "is_superuser"]
    search_fields = ["dob"]
    ordering = ["id"]
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2"),
            },
        ),
    )

@admin.register(Profile)
class ProfileModelAdmin(admin.ModelAdmin):
    list_display = ["user", "id"]

@admin.register(ProfileAPIKey)
class ProfileAPIKeyModelAdmin(APIKeyModelAdmin):
    list_display = [*APIKeyModelAdmin.list_display, "profile"]
    search_fields = [*APIKeyModelAdmin.search_fields, "profile"]
    ordering = ["id"]

@admin.register(AuthenticationToken)
class AuthenticationTokenModelAdmin(admin.ModelAdmin):
    list_display = ["user", "hashed_token", "created_at"]
    search_fields = ["user"]
    ordering = ["id"]
    readonly_fields = ["hashed_token"]
    list_filter = ["created_at"]
    date_hierarchy = "created_at"
    actions = ["delete_selected_tokens"]

    @admin.action(description="Delete selected tokens")
    def delete_selected_tokens(self, request, queryset):
        queryset.delete()
        self.message_user(request, "Selected tokens have been deleted.")
