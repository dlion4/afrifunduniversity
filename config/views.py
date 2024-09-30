import json
from pathlib import Path
import time

from django.urls import reverse, reverse_lazy
import ipinfo
from django.conf import settings
from django.http import FileResponse, HttpRequest
from django.http import Http404
from django.http import HttpResponse
from django.http import JsonResponse
from django.shortcuts import render
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View
import requests
import secrets


def meta_links_view(request: HttpRequest):
    links_data = {
        "api_link": "https://www.afrifunduniversity.com/wp-json/",
        "json_alternate": "https://www.afrifunduniversity.com/wp-json/wp/v2/pages/8",
        "edit_uri": "https://www.afrifunduniversity.com/xmlrpc.php?rsd",
        "generator": "Django 4.2.0",
        "shortlink": "https://www.afrifunduniversity.com/",
        "json_oembed": "https://www.afrifunduniversity.com/wp-json/oembed/1.0/embed?url=https%3A%2F%2Fwww.afrifunduniversity.com%2F",
        "xml_oembed": "https://www.afrifunduniversity.com/wp-json/oembed/1.0/embed?url=https%3A%2F%2Fwww.afrifunduniversity.com%2F&amp;format=xml",  
        "msvalidate":"C8C5B8ECFBF9183D92D1DAE072C9DB47",
        "facebook_domain_verification":"c8ovm5djcvbx8rkwbhnkavj98vfo4g",
        "google_site_verification":"ihsEtifobkf1IQB1C5aDQ8B9FIV9ldl9H7wTNiP43-w",
        "BASE_API_ENDPOINT": request.build_absolute_uri(reverse("home")) + "api",
    }

    return render(
        request, "website/meta_links_template.html", {"links_data": links_data})


def json_ld_view(request):
    schema_data = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://afrifunduniversity.com/",
                "url": "https://afrifunduniversity.com/",
                "name": """
                Education Loans & College Planning Resources | Afri Func Cooperation""",
                "isPartOf": {"@id": "https://afrifunduniversity.com/#website"},
                "datePublished": str(timezone.now()),
                "dateModified": str(timezone.now()),
                "description": """
                Afri Fund Cooperation was built to take the stress out of paying
                for college. We offer stress-free, customizable student loans.""",
                "breadcrumb": {"@id": "https://afrifunduniversity.com/#breadcrumb"},
                "inLanguage": "en-US",
                "potentialAction": [
                    {
                        "@type": "ReadAction",
                        "target": ["https://afrifunduniversity.com/"],
                    },
                ],
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://afrifunduniversity.com/#breadcrumb",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1, "name": "Home",
                    },
                ],
            },
            {
                "@type": "WebSite",
                "@id": "https://afrifunduniversity.com/#website",
                "url": "https://afrifunduniversity.com/",
                "name": "Afri Fund Cooperation",
                "description": "",
                "potentialAction": [
                    {
                        "@type": "SearchAction",
                        "target": {
                            "@type": "EntryPoint",
                            "urlTemplate": """
                            https://afrifunduniversity.com/?s={search_term_string}""",
                        },
                        "query-input": """required name=search_term_string""",
                    },
                ],
                "inLanguage": "en-US",
            },
        ],
    }

    return render(
        request,
        "website/json_ld_template.html", {"schema_data": schema_data})


def load_gtm(request):
    gtm_id = "GTM-K6968Z"  # Your Google Tag Manager ID
    gtm_script = f"""
    (function (w, d, s, l, i) {{
      w[l] = w[l] || [];
      w[l].push({{'gtm.start': new Date().getTime(), event: 'gtm.js'}});
      var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    }})(window, document, 'script', 'dataLayer', '{gtm_id}');
    """
    return JsonResponse({"script": gtm_script})

@csrf_exempt
def load_decode_mail_script(request):
    # Extract parameters from the request
    script_path = request.GET.get(
        "path", "/cdn-cgi/challenge-platform/scripts/jsd/main.js",
        )
    cv_params = request.GET.get(
        "params", "window.__CF$cv$params={r:'default_r',t:'default_t'}",
    )

    # Generate the script content dynamically
    script_content = f"""
    (function () {{
        function c() {{
            var b = a.contentDocument || a.contentWindow.document;
            if (b) {{
                var d = b.createElement('script');
                d.innerHTML = "{cv_params}";
                var a = document.createElement('script');
                a.nonce = '';
                a.src = '{script_path}';
                document
                    .getElementsByTagName('head')[0]
                    .appendChild(a);
                b
                    .getElementsByTagName('head')[0]
                    .appendChild(d)
            }}
        }}
        if (document.body) {{
            var a = document.createElement('iframe');
            a.height = 1;
            a.width = 1;
            a.style.position = 'absolute';
            a.style.top = 0;
            a.style.left = 0;
            a.style.border = 'none';
            a.style.visibility = 'hidden';
            document
                .body
                .appendChild(a);
            if ('loading' !== document.readyState)
                c();
            else if (window.addEventListener)
                document.addEventListener('DOMContentLoaded', c);
            else {{
                var e = document.onreadystatechange || function () {
                    {}};
                document.onreadystatechange = function (b) {{
                    e(b);
                    'loading' !== document.readyState && (
                        document.onreadystatechange = e, c())
                }}
            }}
        }}
    }})();
    """
    return HttpResponse(
        script_content, content_type="application/javascript")



@csrf_exempt
def load_site_inspection_script(request):
    cloudflare_data = {
        "src":"https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015",
        "integrity":"sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ==",
        "data_cf_beacon": {
            "rayId": "8c3a52d3dd7d7412",
            "serverTiming": {"name": {"cfExtPri": True, "cfL4": True}},
            "version": "2024.8.0",
            "token": "baad667b7d814a248033e30dcba8d51d",
        },
        "crossorigin":"anonymous",
    }
    # Generate the script content
    script_content = f"""
        <script defer="defer" src={cloudflare_data['src']!s}
        integrity="{cloudflare_data['integrity']!s}"
        data-cf-beacon='{json.dumps(cloudflare_data['data_cf_beacon'])}'
        crossorigin="{cloudflare_data['crossorigin']!s}">
        </script>
    """
    return HttpResponse(
        script_content, content_type="text/html")

@csrf_exempt
def email_protection_view(request):
    # Render the HTML content that will be injected into the page
    return render(request, "website/email_protection.html")


class AfriFundLoadFileView(View):
    def get(self, request, file_name, *args, **kwargs):
        # The path where the PDFs are stored
        pdf_path = Path(settings.BASE_DIR / "media", file_name)

        # Check if the file exists
        if not Path.exists(pdf_path):
            msg = "PDF file not found."
            raise Http404(msg)
        # Open the file as a binary stream
        pdf_file = Path.open(pdf_path, "rb")

        # Serve the file with inline disposition
        response = FileResponse(pdf_file, content_type="application/pdf")
        response["Content-Disposition"] = f'inline; filename="{file_name}"'

        return response

class AfriFundLoadYoutubeVideoLinkView(View):
    def get(self, request, *args, **kwargs):
        links = [
            "https://www.youtube.com/embed/LNLaY8Fqr9k",
            "https://www.youtube.com/embed/rySJ2Cm5xwc?list=RDGMEMYH9CUrFO7CfLJpaD7UR85w" 
            ]
        return JsonResponse(links, safe=False)


def get_user_ip(request:HttpResponse):
    # Get the user's IP address
    ip = request.META.get("HTTP_X_FORWARDED_FOR")  # For load balancers or proxies
    ip = ip.split(",")[0] if ip else request.META.get("REMOTE_ADDR")
    return {"ip": ip}



def get_public_ip(request:HttpRequest):

    time.sleep(3)
    response = requests.get(
        "https://api.ipify.org?format=json", timeout=5)
    response.raise_for_status()
    data = response.json()
    return data["ip"]

def get_actual_user_location(
    ip_address:str,
    access_key="0ec66558b407a88da165787b6ae207f2"):
    response = requests.get(
        f"https://api.ipinfo.info/api/{ip_address}?access_key={access_key}",
        timeout=5,
    )
    response.raise_for_status()
    return response.json()
def get_ip_details(ip_address=None):
    ipinfo_token = getattr(settings, "IPINFO_TOKEN", None)
    ipinfo_settings = getattr(settings, "IPINFO_SETTINGS", {})
    ip_data = ipinfo.getHandler(ipinfo_token, **ipinfo_settings)
    return ip_data.getDetails(ip_address)

def location(request:HttpRequest):
    time.sleep(3)
    print(get_public_ip(request))
    ip_data = get_actual_user_location(ip_address=get_public_ip(request))
    time.sleep(1)
    print(ip_data)
    return JsonResponse(json.dumps(ip_data), safe=False)


from django.utils import timezone

# Token expiration time in seconds (15 minutes)
TOKEN_EXPIRATION_TIME = 15 * 60

def generate_obfuscation_token(request:HttpRequest):
    token = secrets.token_urlsafe(64)
    expiry_time = timezone.now() + timezone.timedelta(minutes=TOKEN_EXPIRATION_TIME)
    request.session["website_obfuscation_token"] = {
        "token": token, "expires_at": expiry_time.isoformat()}
    return JsonResponse({"token": token})

def is_token_valid(request:HttpRequest):
    if stored_token_info := request.session.get("website_obfuscation_token", None):
        stored_token = stored_token_info["token"]
        expires_at = stored_token_info["expires_at"]
        expiry_datetime = timezone.datetime.fromisoformat(expires_at)
        return stored_token == stored_token and timezone.now() < expiry_datetime  # noqa: PLR0124
    return False


def validate_token(request: HttpRequest):
    token = request.GET.get("token", None)
    if stored_token_info := request.session.get(
        "website_obfuscation_token", None,
    ):
        stored_token = stored_token_info["token"]
        expires_at = stored_token_info["expires_at"]
        expiry_datetime = timezone.datetime.fromisoformat(expires_at)
        if token == stored_token and timezone.now() < expiry_datetime:
            return JsonResponse({"valid": True})
    print(token)
    print(stored_token_info)
    return JsonResponse({"valid": False})


def get_obfuscation_token_view(request: HttpRequest):
    if not is_token_valid(request):
        return generate_obfuscation_token(request)
    current_token = request.session["website_obfuscation_token"]
    token = current_token["token"]
    print(token)
    print(request.session.get("website_obfuscation_token"))
    return JsonResponse({"token": token, "message": "Token is valid."})
