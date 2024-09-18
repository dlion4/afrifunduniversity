from django.db import models
from django.urls import reverse
from django.utils.text import slugify


class PressRelease(models.Model):
    title = models.CharField(max_length=1000, unique=True)
    slug = models.SlugField(max_length=1000)
    date = models.DateField(auto_now_add=True)
    content = models.TextField()
    author = models.CharField(max_length=100, default="Afri Fund")
    is_archived = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=True)


    def __str__(self):
        return self.title
    def save(self, *args,**kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        return super().save( *args,**kwargs)


    def get_absolute_url(self):
        return reverse(
            "press:press_release_detail_view",
            kwargs={
                "year":self.date.year,
                "month": self.date.month,
                "day":self.date.day,
                "slug": self.slug,
                })
        

