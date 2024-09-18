from django.conf import settings
from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework.routers import SimpleRouter

from afrifunduniversity.users.api.views import UserViewSet
from apps.main_application.apis.viewsets import ReviewListViewSet
from apps.press.apis.views import ArticlesInfoListView
from apps.press.apis.views import PressReleaseListView
from apps.press.apis.viewsets import ArticleViewSet
from apps.press.apis.viewsets import CategoryViewSet
from apps.press.apis.viewsets import PressReleaseViewSet

router = DefaultRouter() if settings.DEBUG else SimpleRouter()

router.register("users", UserViewSet)
router.register("press", PressReleaseViewSet, basename="press")
router.register("reviews", ReviewListViewSet, basename="reviews")
router.register("categories", CategoryViewSet, basename="categories")
router.register("articles", ArticleViewSet, basename="articles")

app_name = "api"
urlpatterns = [
    path("", PressReleaseListView.as_view(), name="press_list"),
    path("articles-info/", ArticlesInfoListView.as_view(), name="article_list_view"),
    *router.urls,
]
