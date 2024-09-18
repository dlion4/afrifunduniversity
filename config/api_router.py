from django.conf import settings
from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework.routers import SimpleRouter

from afrifunduniversity.users.api.views import UserViewSet
from apps.main_application.apis.viewsets import ReviewListViewSet
from apps.press.apis.views import PressReleaseListView
from apps.press.apis.viewsets import PressReleaseViewSet

router = DefaultRouter() if settings.DEBUG else SimpleRouter()

router.register("users", UserViewSet)
router.register("press", PressReleaseViewSet, basename="press")
router.register("reviews", ReviewListViewSet, basename="reviews")

app_name = "api"
urlpatterns = [
    path("", PressReleaseListView.as_view(), name="press_list"),
    *router.urls,
]
