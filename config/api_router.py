from django.conf import settings
from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework.routers import SimpleRouter
from rest_framework_nested.routers import NestedDefaultRouter

from afrifunduniversity.environments.views import EnvironmentConfigListCreateApiView
from afrifunduniversity.environments.views import (
    EnvironmentConfigRetrieveUpdateDestroyAPIView,
)
from afrifunduniversity.help.apis.viewsets import ContactBlockModelViewSet
from afrifunduniversity.help.apis.viewsets import QuestionModelViewSet

# from afrifunduniversity.help.apis.viewsets import (
#     QuestionResponseArticleContentModelViewSet,
# )  # noqa: ERA001, RUF100
from afrifunduniversity.help.apis.viewsets import QuestionResponseArticleModelViewSet
from afrifunduniversity.help.apis.viewsets import QuestionResponseModelViewSet
from afrifunduniversity.users.api.views import UserViewSet
from apps.main_application.apis.viewsets import ReviewListViewSet
from apps.main_application.apis.viewsets import SubscriptionRecordView
from apps.main_application.apis.viewsets import SubscriptionView
from apps.main_application.apis.viewsets import SubscriptionViewSet
from apps.press.apis.views import ArticlesInfoListView
from apps.press.apis.views import PressReleaseListView
from apps.press.apis.viewsets import ArticleViewSet
from apps.press.apis.viewsets import CategoryViewSet
from apps.press.apis.viewsets import LeadershipViewSet
from apps.press.apis.viewsets import ParagraphViewSet
from apps.press.apis.viewsets import PressReleaseViewSet

router = DefaultRouter() if settings.DEBUG else SimpleRouter()




router.register("users", UserViewSet)
router.register("press", PressReleaseViewSet, basename="press")
router.register("reviews", ReviewListViewSet, basename="reviews")
router.register("subscriptions", SubscriptionViewSet, basename="subscription")
router.register("categories", CategoryViewSet, basename="categories")
router.register("articles", ArticleViewSet, basename="articles")
router.register("leadership", LeadershipViewSet, basename="leadership")
router.register(
    "ss/help/contact-block",
    ContactBlockModelViewSet, basename="contact-block")
router.register("questions",QuestionModelViewSet, basename="question")

# Nested router for the leadership
leadership_router = NestedDefaultRouter(router, r"leadership", lookup="leadership")
leadership_router.register(
    r"paragraphs", ParagraphViewSet, basename="leadership-paragraphs")

# Nested for the questions and the question response article

question_router = NestedDefaultRouter(router, r"questions", lookup="question")
question_router.register(
    r"responses", QuestionResponseModelViewSet, basename="question-response",
)

response_router = NestedDefaultRouter(question_router, r"responses", lookup="response")
response_router.register(
    r"articles", QuestionResponseArticleModelViewSet, basename="article")

# article_title_router = NestedDefaultRouter(  # noqa: ERA001, RUF100
#     response_router, r"articles", lookup="article")
# article_title_router.register(
#     r"article-contents", QuestionResponseArticleContentModelViewSet,
#     basename="article-content",  # noqa: ERA001
# )  # noqa: ERA001, RUF100

app_name = "api"
urlpatterns = [
    path("", PressReleaseListView.as_view(), name="press_list"),
    path("articles-info/", ArticlesInfoListView.as_view(), name="article_list_view"),


    path(
        "environment-config/",
        EnvironmentConfigListCreateApiView.as_view(),
        name="environment-config"),
    path("environment-config/<int:id>/",
         EnvironmentConfigRetrieveUpdateDestroyAPIView.as_view(),
         name="environment-config-detail"),


    path(
        "subscription/send/notify/", SubscriptionView.as_view(),
        name="send_subscription_notification"),
    # path("subscriptions/", SubscriptionView.as_view(), name="subscriptions"),  # noqa: E501, ERA001
    path("subscriptions/<int:id>/",
         SubscriptionView.as_view(), name="subscription_detail"),
    # path("subscriptions/<int:id>/",
    #      SubscriptionViewSet.as_view({"get": "retrieve"}),  # noqa: ERA001
    #      name='subscription-detail'),
    # testing this put
    path("subscription/record/",
         SubscriptionRecordView.as_view(), name="subscription_update_test"),


    *router.urls,
    *leadership_router.urls,
    *question_router.urls,
    *response_router.urls,
    # *article_title_router.urls,
]
