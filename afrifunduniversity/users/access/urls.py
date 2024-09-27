from django.urls import path

from . import views

urlpatterns = [
    path("access/", views.UserView.as_view()),
    path(
        "update-session/",
        views.UpdateSessionView.as_view(),
        name="update_session",
    ),
]
