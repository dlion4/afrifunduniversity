import os
from pathlib import Path

from django.conf import settings


class TenantSettingsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        tenant = getattr(request, "tenant", None)
        if tenant.schema_name != "public":
            tenant_template_dir = Path(
                settings.BASE_DIR / "tenants" / "templates" / tenant.schema_name)
            settings.TEMPLATES[0]["DIRS"] = [tenant_template_dir] + (
                settings.TEMPLATES[0]["DIRS"])
            tenant_media_dir = Path(
                settings.BASE_DIR / "tenants" / "media" / tenant.schema_name)
            settings.MEDIA_ROOT = tenant_media_dir
            tenant_static_dir = Path(
                settings.BASE_DIR / "tenants" / "static" / tenant.schema_name)
            settings.STATICFILES_DIRS = [tenant_static_dir, *settings.STATICFILES_DIRS]

        else:
            settings.TEMPLATES[0]["DIRS"] = [Path(settings.BASE_DIR /  "templates")]
            settings.MEDIA_ROOT = Path(settings.BASE_DIR / "media")
            settings.STATICFILES_DIRS = [Path(settings.BASE_DIR / "static")]
        return self.get_response(request)
