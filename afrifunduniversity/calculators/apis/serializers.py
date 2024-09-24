# serializers.py
from rest_framework import serializers

from afrifunduniversity.calculators.models import LoanCalculator


class LoanCalculatorSerializer(serializers.ModelSerializer):

    icon = serializers.FileField(required=False)
    slug = serializers.SlugField(required=False)


    class Meta:
        model = LoanCalculator
        fields = ("id", "title", "slug", "icon")
