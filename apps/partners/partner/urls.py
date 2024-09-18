from django.urls import include
from django.urls import path
from .views import AfriFundPartnerView
app_name = "partner"
urlpatterns = [
    path("", AfriFundPartnerView.as_view(), name="home"),
]
