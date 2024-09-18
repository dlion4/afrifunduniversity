from django.conf import settings
from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework.routers import SimpleRouter

from afrifunduniversity.environments.views import EnvironmentConfigView
from afrifunduniversity.users.api.views import UserViewSet
from apps.main_application.apis.viewsets import ReviewListViewSet
from apps.main_application.apis.viewsets import SubscriptionRecordView
from apps.main_application.apis.viewsets import SubscriptionView
from apps.main_application.apis.viewsets import SubscriptionViewSet
from apps.press.apis.views import ArticlesInfoListView
from apps.press.apis.views import PressReleaseListView
from apps.press.apis.viewsets import ArticleViewSet
from apps.press.apis.viewsets import CategoryViewSet
from apps.press.apis.viewsets import PressReleaseViewSet

router = DefaultRouter() if settings.DEBUG else SimpleRouter()

router.register("users", UserViewSet)
router.register("press", PressReleaseViewSet, basename="press")
router.register("reviews", ReviewListViewSet, basename="reviews")
router.register("subscriptions", SubscriptionViewSet, basename="subscription")
router.register("categories", CategoryViewSet, basename="categories")
router.register("articles", ArticleViewSet, basename="articles")

app_name = "api"
urlpatterns = [
    path("", PressReleaseListView.as_view(), name="press_list"),
    path("articles-info/", ArticlesInfoListView.as_view(), name="article_list_view"),
        path(
            "environment-config/",
            EnvironmentConfigView.as_view(),
            name="environment-config"),
    path(
        "subscription/send/notify/", SubscriptionView.as_view(),
        name="send_subscription_notification"),
    # path("subscriptions/", SubscriptionView.as_view(), name="subscriptions"),
    path("subscriptions/<pk>/",
         SubscriptionView.as_view(), name="subscription_detail"),

    # testing this put
    path("subscription/record/",
         SubscriptionRecordView.as_view(), name="subscription_update_test"),


    *router.urls,
]
