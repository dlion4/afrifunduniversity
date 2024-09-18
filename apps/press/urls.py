from django.urls import include
from django.urls import path

from .views import AfriFundArticleDetailView
from .views import AfriFundArticleListView
from .views import AfriFundPressReleaseDetailView
from .views import AfriFundPressView

app_name = "press"
urlpatterns = [
    path("", AfriFundPressView.as_view(), name="home"),
    path(
        "release/<year>/<month>/<day>/<slug>/",
        AfriFundPressReleaseDetailView.as_view(),
        name="press_release_detail_view",
    ),
    path(
        "articles/",
        AfriFundArticleListView.as_view(),
        name="article_list_view",
    ),
    path(
        "articles/<category_slug>/<year>/<month>/<day>/<slug>/",
        AfriFundArticleDetailView.as_view(),
        name="article_detail_view",
    ),
]
