from django.db import models
from django.urls import reverse
from django.utils.text import slugify


# Create your models here.
class ContactBlock(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    html_url = models.CharField(max_length=200, help_text="{% url 'contact' %}")

    def __str__(self):
        return self.name


class Question(models.Model):
    title = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, blank=True)
    description = models.CharField(max_length=500)
    icon = models.ImageField(blank=True, null=True)


    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        return super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse(
            "ss:help:question_detail_view",
            kwargs={
                "pk": self.pk,
                "question_slug":self.slug,
            })

    def get_responses(self):
        return self.question_response.all()

class QuestionResponse(models.Model):
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name="question_response",
    )
    title = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, blank=True)


    def __str__(self):
        return self.title


    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        return super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse(
            "ss:help:question_response_detail_view",
            kwargs={
                "pk": self.question.pk,
                "question_slug":self.question.slug,
                "response_pk": self.pk,
                "response_slug": self.slug,
            })

    def get_response_articles(self):
        return self.question_response_article.all()


class QuestionResponseArticle(models.Model):
    response = models.ForeignKey(
        QuestionResponse,
        on_delete=models.CASCADE,
        related_name="question_response_article",
    )
    title = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100)
    content = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    is_helpful = models.BooleanField(default=True)
    up_vote = models.IntegerField(default=0)
    down_vote = models.IntegerField(default=0)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        return super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse(
            "ss:help:question_response_article_view",
            kwargs={
                "pk": self.response.question.pk,
                "question_slug":self.response.question.slug,
                "response_pk": self.response.pk,
                "response_slug": self.response.slug,
                "article_pk": self.pk,
                "article_slug": self.slug,
            })
    def get_total_votes(self):
        return int(self.up_vote) + int(self.down_vote)

# class QuestionResponseArticleContent(models.Model):
#     article = models.ForeignKey(
#         QuestionResponseArticle,
#         on_delete=models.CASCADE,
#         related_name="question_response_article_content",
#     )
#     title = models.CharField(max_length=100, unique=True)
#     content = models.TextField()
#     slug = models.SlugField(max_length=100)

#     def __str__(self):
#         return self.title


#     def save(self, *args, **kwargs):
#         if not self.slug:
#             self.slug = slugify(self.title)
#         return super().save(*args, **kwargs)
