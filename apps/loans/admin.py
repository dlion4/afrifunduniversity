from django.contrib import admin
from django.core.exceptions import ValidationError

from .models import LoanInterestRate


@admin.register(LoanInterestRate)
class LoanInterestRateAdmin(admin.ModelAdmin):
    MAX_LOAN_INTEREST_RATE_INSTANCES = 2
    list_display = ("interest_rate_type", "min_rate", "max_rate")
    def has_add_permission(self, request):
        return not LoanInterestRate.objects.count() >= self.MAX_LOAN_INTEREST_RATE_INSTANCES  # noqa: E501

    def get_readonly_fields(self, request, obj=None):
        return ["interest_rate_type"] if obj else []

    def save_model(self, request, obj, form, change):
        if not change and LoanInterestRate.objects.count() >= self.MAX_LOAN_INTEREST_RATE_INSTANCES:  # noqa: E501
            msg = "You can only have 2 LoanInterestRate instances: one Fixed and one Variable."  # noqa: E501
            raise ValidationError(msg)
        super().save_model(request, obj, form, change)
