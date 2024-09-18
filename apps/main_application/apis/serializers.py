from django.db import IntegrityError
from rest_framework import serializers
from rest_framework import status
from rest_framework.response import Response

from apps.main_application.models import Review
from apps.main_application.models import Subscription


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [
            "id",
            "review_title",
            "review_content",
            "review_score",
            "date",
            "display_name",
        ]

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ["id", "email"]

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except IntegrityError:
            return Response(
                {"message": "Email already subscribed"},
                status=status.HTTP_400_BAD_REQUEST)

