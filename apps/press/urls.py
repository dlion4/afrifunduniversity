from django.urls import include
from django.urls import path

from .views import AfriFundPressView
from .views import AfriFundPressReleaseDetailView

app_name = "press"
urlpatterns = [
    path("", AfriFundPressView.as_view(), name="home"),
    path(
        "release/<year>/<month>/<day>/<slug>/",
        AfriFundPressReleaseDetailView.as_view(), name="press_release_detail_view"),
]
