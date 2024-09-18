from rest_framework import serializers

from ..models import PressRelease


class PressReleaseSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = PressRelease
        fields = ["id", "title", "url", "date"]

    def get_url(self, obj):
        return obj.get_absolute_url()
