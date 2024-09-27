import contextlib
import os
from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class UsersConfig(AppConfig):
    name = "afrifunduniversity.users"
    verbose_name = _("Users")

    def ready(self):
        from afrifunduniversity.users import signals
        from afrifunduniversity.users.access.cryptography import check_and_generate_keys
        check_and_generate_keys()

