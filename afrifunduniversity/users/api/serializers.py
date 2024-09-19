from rest_framework import serializers

from afrifunduniversity.users.models import User


class UserSerializer(serializers.ModelSerializer[User]):
    email = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ["email", "url"]

        extra_kwargs = {
            "url": {"view_name": "api:user-detail", "lookup_field": "pk"},
        }
    def get_email(self) -> str:
        return self.instance.email

