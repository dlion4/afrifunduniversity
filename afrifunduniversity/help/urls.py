from django.urls import path

from . import views

app_name = "help"
urlpatterns = [
    path("", views.HelpView.as_view(), name="help_home"),
    path(
        "categories/<pk>/<question_slug>/",
        views.QuestionCategoryDetailView.as_view(),
        name="question_detail_view",
    ),
    path(
        "categories/<pk>/<question_slug>/sections/<response_pk>/<response_slug>/",
        views.QuestionResponseDetailView.as_view(),
        name="question_response_detail_view",
    ),
    path(
        "categories/<pk>/<question_slug>/sections/<response_pk>/<response_slug>/<article_pk>/<article_slug>/",
        views.QuestionResponseArticleDetailView.as_view(),
        name="question_response_article_view",
    ),
    path(
        "categories/<pk>/<question_slug>/sections/<response_pk>/<response_slug>/<article_pk>/<article_slug>/vote/",
        views.QuestionResponseArticleVoteView.as_view(),
        name="question_response_article_vote_view",
    ),
]
