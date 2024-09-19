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
                },
        )



class Category(models.Model):
    label = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100)



    def __str__(self):
        return self.label

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.label)
        return super().save(*args, **kwargs)


class Article(models.Model):
    title = models.CharField(max_length=255, unique=True)
    category = models.ForeignKey(
        Category, related_name="articles", on_delete=models.CASCADE)
    slug = models.SlugField(max_length=1000)
    date = models.DateField(auto_now_add=True)
    content = models.TextField()
    is_archived = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=True)
    author = models.CharField(max_length=100, default="Afri Fund")


    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["title", "category"],
                name="unique_title_per_category",
            ),
        ]

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse(
            "press:article_detail_view",
            kwargs={
                    "category_slug":self.category.slug,
                    "year":self.date.year,
                    "month": self.date.month,
                    "day":self.date.day,
                    "slug": self.slug,
            },
        )


class Leadership(models.Model):
    image = models.URLField(
        max_length=400,
        default="https://cdn.collegeavestudentloans.com/ca2023/wp-content/uploads/2023/10/07145727/joe-depaulo.png")
    name = models.CharField(max_length=255)
    job_title = models.CharField(max_length=255)


    def __str__(self):
        return self.name

class Paragraph(models.Model):
    leadership = models.ForeignKey(
        Leadership, related_name="paragraphs",
        on_delete=models.CASCADE)
    paragraph = models.TextField()


    def __str__(self):
        return str(self.leadership.name)

    def save(self, *args, **kwargs):
        using = kwargs.pop("using", None)
        super().save(using=using, *args, **kwargs)
