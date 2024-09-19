from django.http import HttpResponse
from django.shortcuts import render


# Create your views here.
def get_home_page(self):
    return HttpResponse("Hello")
