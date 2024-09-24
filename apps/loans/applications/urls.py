from django.urls import path

from . import views

app_name = "applications"

urlpatterns = [
    path(
        "",
        views.LoanApplicationHomeView.as_view(),
        name="apply-undergraduate",
    ),
    path(
        "error",
        views.LoanApplicationErrorPageView.as_view(),
        name="application_entry_error",
    ),
    path(
        "apply",
        views.LoanApplicationView.as_view(),
        name="application_entry",
    ),
]
