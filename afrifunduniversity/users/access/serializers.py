from rest_framework import serializers

from afrifunduniversity.users.models import AuthenticationToken
from afrifunduniversity.users.models import User


class AuthenticationTokenSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        queryset=User.objects.all(),
        slug_field="username",
    )
    class Meta:
        model = AuthenticationToken
        fields = (
            "user",
            "pk",
            "hashed_token",
            "created_at",
            "expiry_date",
            "is_expired",
            "is_revoked",
        )
