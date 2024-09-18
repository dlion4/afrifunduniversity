import os
from pathlib import Path
from typing import Any

from django.conf import settings
from django.http import FileResponse
from django.http import Http404
from django.http import JsonResponse
from django.shortcuts import render
from django.views.generic import TemplateView
from django.views.generic import View


def list_school_media_files():
    # Get the path to the media directory
    media_dir = Path(settings.BASE_DIR / "media")
    # Get the list of files in the media directory
    media_files = []
    for filename in os.listdir(media_dir):
        file_path = Path(media_dir/ filename)

        # Filter to only include files, not directories
        if Path.is_file(file_path):
            # Get the absolute URL for the file (to use in the template)
            media_files.append({
                "name": filename,
                "url": Path(media_dir / filename),
            })
    # Pass the list of files to the template context
    return  media_files



def faq_schema_json(request):
    # JSON-LD data
    json_ld_data = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is Afri Fund  Student Loans?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": """
                    Afri Fund  Student Loans launched in 2014, with a goal to create
                    private student loan products that help students pay for school as
                    easily and inexpensively as possible.""",
                },
            },
            {
                "@type": "Question",
                "name": """
                Who is eligible for an undergraduate student loan with Afri Fund ?""",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": """
                    To qualify, undergraduate students with a social security number
                    must be enrolled at an eligible school. International students
                    will need to apply with a qualified cosigner that is a U.S.
                    Citizen or a Permanent Resident. All students must meet the
                    satisfactory academic progress (SAP)
                    guidelines as defined by their school.""",
                }
            },
            # More questions here...
        ],
    }

    return JsonResponse(json_ld_data)


# Create your views here.
class AfriFundForSchoolsHomeView(TemplateView):
    template_name = "schools/index.html"

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context =  super().get_context_data(**kwargs)
        context["load_products"] = list_school_media_files()
        return context



class AfriFundForSchoolsLenderInfoView(View):
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



