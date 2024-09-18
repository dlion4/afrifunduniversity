from django.urls import include
from django.urls import path

from .views import AfriFundForSchoolsHomeView
from .views import AfriFundForSchoolsLenderInfoView
from .views import faq_schema_json

app_name = "school"
urlpatterns = [
    path("", AfriFundForSchoolsHomeView.as_view(), name="home"),
    path(
        "lender-information/<file_name>/",
        AfriFundForSchoolsLenderInfoView.as_view(), name="lender_information"),

    path("faq-schema/", faq_schema_json, name="faq-schema-json"),
]
