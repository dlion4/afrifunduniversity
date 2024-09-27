from rest_framework import serializers

from afrifunduniversity.users.models import User, ProfileAPIKey


class UserSerializer(serializers.ModelSerializer[User]):
    email = serializers.SerializerMethodField()
    url = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ["id", "email", "url"]

        # extra_kwargs = {
        #     "url": {"view_name": "api:user-detail", "lookup_field": "pk"},
        # }
    def get_email(self, obj:User) -> str:
        return obj.email
    def get_url(self, obj: User)->str:
        return self.context["request"].build_absolute_uri(obj.get_absolute_url())

class ProfileAPIKeySerializer(serializers.ModelSerializer[ProfileAPIKey]):
    email = serializers.EmailField(source="profile.user.email", read_only=True)
    hashed_key = serializers.ReadOnlyField()
    prefix = serializers.ReadOnlyField()
    class Meta:
        model = ProfileAPIKey
        fields = ["email", "hashed_key", "prefix", "id"]

