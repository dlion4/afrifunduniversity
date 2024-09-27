from rest_framework_api_key.permissions import BaseHasAPIKey

from .models import ProfileAPIKey


class HasProfileAPIKey(BaseHasAPIKey):
    model = ProfileAPIKey
