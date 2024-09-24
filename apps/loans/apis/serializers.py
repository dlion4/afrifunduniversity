from rest_framework import serializers

from apps.loans.models import Glossary


class GlossarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Glossary
        fields = [
            "id",
            "title",
            "slug",
            "explanation",
        ]