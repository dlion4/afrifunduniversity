from rest_framework import serializers

from apps.main_application.models import Review


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [
            "id",
            "review_title","review_content","review_score","date",
            "display_name"]
