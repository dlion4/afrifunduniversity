# Create your views here.
import base64
import contextlib
import json
import threading
import time
from datetime import datetime
from typing import Any
from urllib.parse import parse_qs

from dateutil import parser
from django.db import IntegrityError
from django.http import HttpRequest
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.shortcuts import render
from django.views.generic import TemplateView

from afrifunduniversity.users.models import User
from apps.loans.applications.apis.serializers import LoanApplicationSerializer
from apps.loans.applications.models import LoanApplication

from .forms import LoanApplicationForm
from .forms import ScholarShipEntryForm


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
    scholarship_form = ScholarShipEntryForm
    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)
        context["form"] = self.form_class()
        context["scholarship_form"] = self.scholarship_form()
        return context
    def validate_form_data(self, data:dict):
        data.pop("csrfmiddlewaretoken", None)
        return data
    def post(self, request:HttpRequest, *args, **kwargs):
        time.sleep(4)
        data = self.validate_form_data(json.loads(request.body))
        date_of_birth_str = data.get("date_of_birth", None)
        date_of_birth = (
            parser.parse(date_of_birth_str).date() if date_of_birth_str else None
        )
        data["date_of_birth"] = date_of_birth

        form = self.form_class(data=data)
        if form.is_valid():
            response = self._form_valid(
                form,
                decode_message(data.pop("application_reference_number", "")),
                data.pop("SC", ""))
            return JsonResponse(response, safe=False)
        return JsonResponse(
            {"error": "There was an error processing the request"}, status=400)
    def _create_user_if_note_exist(self, email_address: str, password:str):
        with contextlib.suppress(IntegrityError):
            user = User.objects.create_user(email=email_address,password=password)
            user.is_active = True
            user.save()

    def _form_valid(self, form:LoanApplicationForm, serial_number, serial_id):
        instance:LoanApplication = form.save()
        instance.serial_number = serial_number
        instance.serial_id = serial_id
        instance.save()
        thread = threading.Thread(
            self._create_user_if_note_exist, args=(
                instance.email_address, instance.serial_number))
        thread.start()
        serializer = LoanApplicationSerializer(instance)
        return serializer.data



class LoanApplicationCompletedView(TemplateView):
    template_name = "loans/applications/apply/completed.html"
    def get_object(self, **kwargs):
        return get_object_or_404(
            LoanApplication, serial_number=kwargs.get("serial_number_slug"), pk=kwargs.get("application_pk"))  # noqa: E501
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["application"] = self.get_object(**kwargs)
        return context

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
