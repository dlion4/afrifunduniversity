from django.db import models
from django.db.models import Q
from django.urls import reverse
from django.utils.text import slugify

class Review(models.Model):
    review_title = models.CharField(max_length=255)
    review_content = models.TextField()
    review_score = models.IntegerField()
    date = models.DateField(auto_now_add=True)
    display_name = models.CharField(
        max_length=100,
        default="Titan Kwishalikwa")

    def __str__(self):
        return f"{self.review_title} by {self.display_name}"

class Subscription(models.Model):
    email = models.EmailField(max_length=100)

    def __str__(self):
        return self.email




class License(models.Model):
    country = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100)
    license_number = models.CharField(max_length=200)

    def __str__(self):
        return self.country


def get_file_upload_path(instance:License, filename:str)->str:
    return f"license/{instance.slug}/{filename}"


class LicenseFile(models.Model):
    license = models.ForeignKey(
        License,
        on_delete=models.CASCADE,
        related_name = "license_file",
    )
    document = models.FileField(upload_to=get_file_upload_path)
    def __str__(self):
        return self.license.country


class Policy(models.Model):
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    class Meta:
        get_latest_by = "updated_at"
    def __str__(self):
        return "Policy Statement"
