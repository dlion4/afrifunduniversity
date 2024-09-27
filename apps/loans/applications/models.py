from django.db import models
from .choices import PartneredUniversity, SupportedCourse, Counties, MEAN_GRADE_CHOICES, YEAR_OF_STUDY

# Create your models here.
class LoanCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    def __str__(self):
        return self.name

class LoanApplication(models.Model):
    STATUS_CHOICES = (
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    )
    category = models.ForeignKey(
        LoanCategory,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="loan_category",
    )
    status = models.CharField(max_length=50, default="pending")
    # BASIC INFORMATION BELOW
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100)
    email_address = models.EmailField(max_length=100)

    # BASIC CONTACT
    phone = models.CharField(max_length=100)
    permanent_address = models.CharField(max_length=255)
    address_2 = models.CharField(max_length=255, blank=True)
    city_town = models.CharField(max_length=100)
    home_county = models.CharField(
        max_length=100,
        choices=Counties.choices
    )
    residence_county = models.CharField(
        max_length=100,
        choices=Counties.choices
    )
    zip_code = models.CharField(max_length=100)

    # PERSONAL INFORMATION
    date_of_birth = models.DateField()
    national_id = models.CharField(max_length=100)
    # the national id the form will consider the confirmation
    national_id_confirmation = models.CharField(
        max_length=100, blank=True)

    # SCHOOL | LOAN INFORMATION
    high_school_attended = models.CharField(max_length=100)
    mean_grade_attained = models.CharField(
        max_length=100, blank=True,
        choices=MEAN_GRADE_CHOICES,
    )
    college_university_admitted = models.CharField(
        max_length=100,
        choices=PartneredUniversity.choices,
        default=PartneredUniversity.JKUAT,
    )
    year_of_study = models.CharField(
        max_length=100,
        choices=YEAR_OF_STUDY,
        blank=True,
    )
    course_admitted = models.CharField(
        max_length=100,
        choices=SupportedCourse.choices,
        default=SupportedCourse.BACHELOR_OF_LAW,
    )

    # LOAN DETAILS
    # loan_amount = models.DecimalField(max_digits=10, decimal_places=2)
    semester_fee = models.DecimalField(max_digits=10, decimal_places=2)
    annual_fee = models.DecimalField(max_digits=10, decimal_places=2)
    government_support_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    helb_applied_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)


    # VERIFICATION DOCUMENTATION
    national_id_scanned_copy = models.ImageField(
        upload_to="applications/", blank=True)
    high_school_certificate_scanned_copy = models.ImageField(
        upload_to="applications/", blank=True)
    college_university_admitted_scanned_copy = models.ImageField(
        upload_to="applications/", blank=True)

    # APPLICATION META DATA
    serial_number = models.CharField(max_length=1000, blank=True)
    serial_id = models.CharField(max_length=1000, blank=True)

    # Commitment information
    telephone_consumer_protection = models.BooleanField(default=False)

    def __str__(self):
        return (
            f"{self.first_name} {self.last_name} Application"
        )

class LoanRepayment(models.Model):
    loan_application = models.ForeignKey(
        LoanApplication,
        on_delete=models.CASCADE,
        related_name="loan_repayments",
    )
    installment_number = models.PositiveIntegerField()
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    date_paid = models.DateField()
    def __str__(self):
        return (
            f"Repayment #{self.installment_number} for {self.loan_application}"
        )
