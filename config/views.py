import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View
from pathlib import Path
from django.conf import settings
from django.http import Http404, FileResponse
from django.utils import timezone


def meta_links_view(request):
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