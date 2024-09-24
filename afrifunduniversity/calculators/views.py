from typing import Any

from django.shortcuts import render
from django.views.generic import TemplateView

from afrifunduniversity.calculators.models import LoanCalculator

# Create your views here.

class LoanCalculatorListView(TemplateView):
    template_name = "calculators/index.html"
    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)
        context["calculators"] = LoanCalculator.objects.all()
        return context


index = LoanCalculatorListView.as_view()
