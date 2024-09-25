# Create your views here.
import base64
import contextlib
from typing import Any

from django.shortcuts import render
from django.views.generic import TemplateView

from .forms import LoanApplicationForm


def decode_message(encoded_msg):
    with contextlib.suppress(Exception):
        return base64.b64decode(encoded_msg).decode("utf-8")




class LoanApplicationHomeView(TemplateView):
    template_name = "loans/applications/layout.html"

class LoanApplicationView(TemplateView):
    template_name = "loans/applications/apply/home.html"

class LoanApplicationFormView(TemplateView):
    template_name = "loans/applications/apply/apply.html"
    form_class = LoanApplicationForm
    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)
        context["form"] = self.form_class()
        return context


class LoanApplicationErrorPageView(TemplateView):
    template_name = "loans/applications/errors/errors.html"
    def get(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)
        encoded_msg = request.GET.get("msg")
        error_message = decode_message(encoded_msg)
        if error_message == "outside-country":
            context["country"] = True
        elif error_message == "vpn-detected":
            context["vpn"] = True
        return render(request, self.template_name, context)
