from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import TemplateView

# Create your views here.


class AuthorizedValidationView(LoginRequiredMixin):
    login_url = reverse_lazy("users:login")

class StudentPortalDashboardHomeView(AuthorizedValidationView, TemplateView):
    template_name = "dashboard/students/index.html"
