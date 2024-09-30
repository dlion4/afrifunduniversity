from rest_framework import serializers

from apps.loans.models import Glossary
from apps.loans.models import LoanInterestRate


class GlossarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Glossary
        fields = [
            "id",
            "title",
            "slug",
            "explanation",
        ]
class LoanInterestRateSerializer(serializers.ModelSerializer):
    # interest_rate_type = serializers.SerializerMethodField()
    class Meta:
        model = LoanInterestRate
        fields = [
            "id",
            "interest_rate_type",
            "min_rate",
            "max_rate",
        ]
    # def get_interest_rate_type(self, obj):
    #     return obj.get_interest_rate_type_display()

class LoanInterestRateSerializerWithGlossary(serializers.ModelSerializer): pass