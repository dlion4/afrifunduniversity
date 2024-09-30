from django.db import models
from django.utils.text import slugify
from django.core.exceptions import ValidationError

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


class LoanInterestRate(models.Model):
    MAX_LOAN_INTEREST_RATE_INSTANCES = 2

    INTEREST_RATE_TYPE_CHOICES = (("F", "Fixed"),("V", "Variable"))

    interest_rate_type = models.CharField(
        max_length=1, choices=INTEREST_RATE_TYPE_CHOICES, default="F", unique=True)
    min_rate = models.DecimalField(max_digits=6, decimal_places=2, default=5.00)
    max_rate = models.DecimalField(max_digits=6, decimal_places=2, default=32.00)

    class Meta:
        constraints = [
            models.CheckConstraint(
                check=models.Q(min_rate__gte=5.00) & models.Q(min_rate__lte=32.00),
                name="min_rate_gte_5_and_lte_32",
            ),
            models.UniqueConstraint(
                fields=["interest_rate_type", "min_rate", "max_rate"],
                name="min_max_rate_interest_rate_type_unique",
            ),
        ]

    def __str__(self):
        return (
            f"{self.get_interest_rate_type_display()} rate: {self.min_rate}% - {self.max_rate}%"  # noqa: E501
        )

    def save(self, *args, **kwargs):
        if (
            not self.pk and LoanInterestRate.objects.count() >= self.MAX_LOAN_INTEREST_RATE_INSTANCES  # noqa: E501
            ):
            msg = "You can only have 2 LoanInterestRate instances: one Fixed and one Variable."  # noqa: E501
            raise ValidationError(msg)
        super().save(*args, **kwargs)


# class RepaymentOption(models.Model):
#     MAX_REPAYMENT_OPTION_INSTANCES = 2
#     REPAYMENT_OPTION_TYPE_CHOICES = (("P", "Principal"), ("R", "Remaining Balance"))
#     REPAYMENT_OPTION_TYPE_CHOICES_VERBOSE = {
#         "P": "Principal",
#         "R": "Remaining Balance",
#     }
#     repayment_option_type = models.CharField(
#         max_length=1, choices=REPAYMENT_OPTION_TYPE_CHOICES, default="P")
    