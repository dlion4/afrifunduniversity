# Create your views here.
import base64
import contextlib
import json
from datetime import datetime
from typing import Any
from urllib.parse import parse_qs

from dateutil import parser
from django.http import HttpRequest
from django.http import JsonResponse
from django.shortcuts import render
from django.views.generic import TemplateView

from apps.loans.applications.models import LoanApplication

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
    def validate_form_data(self, data:dict):
        data.pop("csrfmiddlewaretoken", None)

        # return {
        #     field_name: field_value[0] if field_value else None
        #     for field_name, field_value in data.items()
        # }
        return data
    def post(self, request:HttpRequest, *args, **kwargs):
        data = self.validate_form_data(json.loads(request.body))
        date_of_birth_str = data.get("date_of_birth", None)
        date_of_birth = (
            parser.parse(date_of_birth_str).date() if date_of_birth_str else None
        )
        data["date_of_birth"] = date_of_birth

        form = self.form_class(data=data)
        if form.is_valid():
            self._form_valid(form, data.pop("id", ""), data.pop("SC", ""))
        return JsonResponse({"message": "The server responded with 200 status code"})

    def _form_valid(
        self, form:LoanApplicationForm, serial_number, serial_id):
        instance:LoanApplication = form.save()
        instance.serial_number = serial_number
        instance.serial_id = serial_id
        instance.save()


class LoanApplicationErrorPageView(TemplateView):
    template_name = "loans/applications/errors/errors.html"
    def get(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)
        encoded_msg = request.GET.get("msg")
        error_message = decode_message(encoded_msg)
        if error_message == "outside-country":
            context["country"] = True
        elif error_message == "ip-masking":
            context["vpn"] = True
        return render(request, self.template_name, context)
