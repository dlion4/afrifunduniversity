
from typing import Any
from django.http import JsonResponse
from django.views.generic import TemplateView

from apps.press.models import PressRelease


class AfriFundPartnerView(TemplateView):
    template_name = "partners/index.html"


