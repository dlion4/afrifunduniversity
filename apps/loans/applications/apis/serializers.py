from rest_framework import serializers

from apps.loans.applications.models import LoanApplication
from apps.loans.applications.models import LoanCategory
from apps.loans.applications.models import LoanRepayment


class LoanRepaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanRepayment
        fields = (
            "id",
            "installment_number",
            "amount_paid",
            "date_paid",
        )

class LoanApplicationSerializer(serializers.ModelSerializer):
    repayments = LoanRepaymentSerializer(many=True, read_only=True)
    class Meta:
        model = LoanApplication
        fields = (
            "id",
            # BASIC INFORMATION
            "first_name","middle_name","last_name","email_address",
            # BASIC CONTACT INFORMATION
            "phone" ,"permanent_address","address_2","city_town","home_county",
            "residence_county",
            "zip_code",
            # PERSONAL INFORMATION
            "date_of_birth","national_id","national_id_confirmation",
            # SCHOOL | LOAN INFORMATION,
            "high_school_attended","mean_grade_attained","college_university_admitted",
            "year_of_study", "course_admitted",
            # LOAN DETAILS "loan_amount",
            "semester_fee","annual_fee", "government_support_fee",
            "helb_applied_amount",
            # VERIFICATION DOCUMENTATION
            "national_id_scanned_copy","high_school_certificate_scanned_copy",
            "college_university_admitted_scanned_copy",
            # META DATA VERIFICATION
            "telephone_consumer_protection",
            # THIS IS THE MAIN
            "repayments",
            "serial_id",
            "serial_number",
            "category",
        )

class LoanCategorySerializer(serializers.ModelSerializer):
    applications = LoanApplicationSerializer(many=True, read_only=True)
    class Meta:
        model = LoanCategory
        fields = ("id", "name", "applications")

