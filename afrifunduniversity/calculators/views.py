from typing import Any

from django.shortcuts import render, get_object_or_404
from django.views.generic import TemplateView

from afrifunduniversity.calculators.models import LoanCalculator

# Create your views here.

class LoanCalculatorListView(TemplateView):
    template_name = "calculators/index.html"
    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)
        context["calculators"] = LoanCalculator.objects.all()
        return context

class LoanCalculatorDetailView(TemplateView):
    template_name = "calculators/detail.html"
    def get_object(self):
        return get_object_or_404(
            LoanCalculator,slug=self.kwargs.get("calculator_slug"),
        )
    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)
        context["calculators"] = LoanCalculator.objects.exclude(pk=self.get_object().pk)
        context["calculator"] = self.get_object()
        return context

index = LoanCalculatorListView.as_view()
