# ruff: noqa
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import include
from django.urls import path
from django.views import defaults as default_views
from django.views.generic import TemplateView
from drf_spectacular.views import SpectacularAPIView
from drf_spectacular.views import SpectacularSwaggerView
from rest_framework.authtoken.views import obtain_auth_token
from . import views

urlpatterns = [
    path("", include("apps.main_application.urls")),
    path("for-schools/", include("apps.schools.urls", namespace="schools")),
    path("about/press/", include("apps.press.urls", namespace="press")),
    path("partners/", include("apps.partners.urls", namespace="partners")),
    # MAIN WEBSITE CONFIGURATIONS
    path("schema/", views.json_ld_view),
    path('meta-links/', views.meta_links_view, name='meta_links_view'),
    path('load-gtm/', views.load_gtm, name='load_gtm'),
    path('decode-mails/', views.load_decode_mail_script, name='generate-decode-email-script'),
    path('site-inspection/', views.load_site_inspection_script, name='load-site-inspection-script'),
    
    path("files-view/<file_name>", views.AfriFundLoadFileView.as_view(), name="view_file"),
    path("api/video-links/", views.AfriFundLoadYoutubeVideoLinkView.as_view(), name="load_yt_video_link"),

    path("email-protection/", views.email_protection_view, name="email_protection_view"),
    # Django Admin, use {% url 'admin:index' %}
    path(settings.ADMIN_URL, admin.site.urls),
    # User management
    path("account/", include("afrifunduniversity.users.urls", namespace="users")),
    # Your stuff: custom urls includes go here
    # ...
    # Media files
    *static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT),
    # For the subdomain sites #Todo: Implement subdomain later
    path("ss/", include("afrifunduniversity.saas.urls", namespace="ss")),
]
if settings.DEBUG:
    # Static file serving when using Gunicorn + Uvicorn for local web socket development
    urlpatterns += staticfiles_urlpatterns()

# API URLS
urlpatterns += [
    # API base url
    path("api/", include("config.api_router")),
    # DRF auth token
    path("api/auth-token/", obtain_auth_token),
    path("api/schema/", SpectacularAPIView.as_view(), name="api-schema"),
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="api-schema"),
        name="api-docs",
    ),
]

if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        path(
            "400/",
            default_views.bad_request,
            kwargs={"exception": Exception("Bad Request!")},
        ),
        path(
            "403/",
            default_views.permission_denied,
            kwargs={"exception": Exception("Permission Denied")},
        ),
        path(
            "404/",
            default_views.page_not_found,
            kwargs={"exception": Exception("Page not Found")},
        ),
        path("500/", default_views.server_error),
    ]
    if "debug_toolbar" in settings.INSTALLED_APPS:
        import debug_toolbar

        urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns
