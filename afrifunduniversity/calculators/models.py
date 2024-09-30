from django.db import models
from django.urls import reverse
from django.utils.text import slugify


# Create your models here.
class LoanCalculator(models.Model):
    title = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100)
    description = models.TextField(max_length=200, blank=True)
    icon = models.ImageField(
        upload_to="calculators/",
        blank=True, null=True,
    )
    def __str__(self):
        return str(self.title)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        return super().save(*args, **kwargs)
    def get_absolute_url(self):
        return reverse("calculators:detail", kwargs={"calculator_slug": self.slug})
