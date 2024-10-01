from django.shortcuts import render
from django.views.generic import TemplateView

# Create your views here.
def index(request):
    return render(
        request,
        "loans/student/private-student-loans.html")


def undergrad(request):

    return render(
        request,
        "loans/student/undergraduate/index.html")

def refinance(request):

    return render(
        request,
        "loans/student/undergraduate/refinance.html")




class StudentLoanView(TemplateView):
    template_name = "loans/index.html"
