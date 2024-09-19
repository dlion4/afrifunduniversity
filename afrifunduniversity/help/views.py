from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import TemplateView


# Create your views here.
def get_home_page(self):
    return HttpResponse("Hello")

class HelpView(TemplateView):
    template_name = "tenants/help/pages/index.html"
