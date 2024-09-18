from rest_framework import serializers

from afrifunduniversity.users.models import User


class UserSerializer(serializers.ModelSerializer[User]):
    name = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ["name", "url"]

        extra_kwargs = {
            "url": {"view_name": "api:user-detail", "lookup_field": "pk"},
        }
    def get_name(self, obj):
        return obj.email

