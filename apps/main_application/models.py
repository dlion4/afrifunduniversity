from django.db import models


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
