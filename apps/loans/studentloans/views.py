from django.shortcuts import render


# Create your views here.
def index(request):
    return render(
        request,
        "loans/student/private-student-loans.html")


def undergrad(request):
    
    return render(
        request,
        "loans/student/undergraduate/index.html")