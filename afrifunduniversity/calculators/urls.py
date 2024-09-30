from django.urls import path

from . import views

app_name = "calculators"
urlpatterns = [
    path("", views.index, name="home"),
    path(
        "<calculator_slug>/",
        views.LoanCalculatorDetailView.as_view(),
        name="detail"),
]
