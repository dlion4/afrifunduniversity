from rest_framework import serializers

from .models import EnvironmentConfig


class EnvironmentConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnvironmentConfig
        fields = ["id", "config"]
