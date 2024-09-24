from django.db import models
from django.utils.text import slugify


# Create your models here.
class Glossary(models.Model):
    title = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, blank=True)
    explanation = models.TextField(max_length=6000)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        return super().save(*args, **kwargs)
