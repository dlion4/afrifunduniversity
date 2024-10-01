import json
from django.http import JsonResponse
from django.shortcuts import render
from django.views.generic import FormView
from django.views.generic import TemplateView
from .forms import PreQualificationForm

# Create your views here.


class PreQualificationView(FormView):
    template_name = "loans/prequalify.html"
    form_class = PreQualificationForm
    def post(self, request, *args, **kwargs):
        try:
            data:dict = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"message": "Invalid request"}, status=400)
        token = data.pop("csrfmiddlewaretoken", None)
        prequalifyWho = data.pop("prequalifyWho", None)
        print(token, prequalifyWho)
        form = self.form_class(data=data)
        if form.is_valid():
            return JsonResponse({
                    "message": "Prequalification received",
                    "client": form.cleaned_data.get("f_name")}, status=200)
        return JsonResponse({"message": "received prequalification"}, status=400)

prequalify = PreQualificationView.as_view()
