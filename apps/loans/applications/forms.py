from django import forms

from apps.loans.applications.models import LoanApplication

from .choices import MEAN_GRADE_CHOICES
from .choices import YEAR_OF_STUDY
from .choices import Counties
from .choices import PartneredUniversity
from .choices import SupportedCourse


class LoanApplicationForm(forms.ModelForm):
    # SCHOOL | LOAN INFORMATION,
    mean_grade_attained = forms.ChoiceField(
        choices=MEAN_GRADE_CHOICES,
        widget=forms.Select(attrs={
            "class": "form-control sc-eilVRo byoPMv js-basic-single"}),
        required=True,
        help_text=(
            "Any grade for vocational training is currently not available but it will be rolled out soon <br />"  # noqa: E501
            "We currently pick only grades B+ and above. For any clarification please feel free to reach us"  # noqa: E501
            "On our socials or contact us page"
        ),
    )
    college_university_admitted = forms.ChoiceField(
        choices=PartneredUniversity.choices,
        widget=forms.Select(attrs={
            "class": "form-control sc-eilVRo byoPMv js-basic-single"}),
        required=True,
        help_text=(
            "If you don't see the university in which you've been placed then it means we've not partnered with those. "
            "We have partnered with the following universities to offer you a loan. You can apply to any of them. "
            "Feel free to contact for guidance "
        ),
    )

    year_of_study = forms.ChoiceField(
        required=False,
        initial="Select your current year of stud (First Year if is yet to join)",
        widget=forms.Select(
            attrs={
                "class": "sc-eilVRo byoPMv js-basic-single",
            },
        ),
        choices=YEAR_OF_STUDY,
        help_text=(
            "Your specific cost of attendance may vary; this is a general estimate of "
            "what the school expects tuition, fees, books, supplies, room &amp; board "
            "and transportation will cost to complete one academic year as a "
            "full-time student. You don't need to edit this."
        ),
    )

    course_admitted = forms.ChoiceField(
        choices=SupportedCourse.choices,
        widget=forms.Select(attrs={
            "class": "form-control sc-eilVRo byoPMv js-basic-single"}),
        required=True,
        help_text=(
            "We support specific course in those partnered universities. So as you are applying you need to understand that "
            "Just by virtue of being placed in any of our partnered universities does not guarantee you'll qualify for the loan."
        ),
    )
    # LOAN DETAILS
    # loan_amount = forms.DecimalField(
    #     decimal_places=2, max_digits=12,
    #     widget=forms.NumberInput(attrs={
    #         "placeholder": "Requested Loan Amount (min KES 5,000)",
    #         "class": "form-control sc-eilVRo byoPMv",
    #     }),
    #     help_text=(
    #         "Enter the amount you need this loan to cover. "
    #         "You should also know that this amount will be sent directly to your school. ",
    #     ),
    # )
    semester_fee = forms.DecimalField(
        decimal_places=2, max_digits=12,
        widget=forms.NumberInput(attrs={
            "placeholder": "Fee per semester as in the fee structure",
            "class": "form-control sc-eilVRo byoPMv",
        }),
        help_text=(
            "This form will only be updated once unless there is fee hikes in school "
            "Also the fee will be paid per semester subject to maintained academic excellence",
        ),
    )
    annual_fee = forms.DecimalField(decimal_places=2, max_digits=12,
        widget=forms.NumberInput(attrs={
            "placeholder": "Annual fee for your course as in the fee structure",
            "class": "form-control sc-eilVRo byoPMv",
        }),
        help_text=(
            "This form will only be updated once unless there is fee hikes in school "
            "Also the fee will be paid per semester subject to maintained academic excellence",
        ),
    )
    government_support_fee = forms.DecimalField(
        decimal_places=2, max_digits=12,required=False, initial="0.00",
        widget=forms.NumberInput(attrs={
            "placeholder": "Annual fee for your course as in the fee structure",
            "class": "form-control sc-eilVRo byoPMv",
        }),
        help_text=(
            "This is the amount of money that the government is paying for you per semester as scholarship "
            "This is based on the current model of funding to help us determine the amount you'll need "
        ),
    )
    helb_applied_amount = forms.DecimalField(
        decimal_places=2, max_digits=12,required=False, initial="0.00",
        widget=forms.NumberInput(attrs={
            "placeholder": "The total amount applied/Received from helb per year",
            "class": "form-control sc-eilVRo byoPMv",
        }),
        help_text=(
            "This is the amount of money that you've applied for from the HELB "
            "Please ensure what you provide is the truth since any kind of liar will lead to automatic rejection of your application "
        ),
    )

    # META ACCEPT
    telephone_consumer_protection = forms.BooleanField(
        required=True,
        initial=True,
        label="I agree to the telephone consumer protection policy",
        widget=forms.CheckboxInput(attrs={"class": "form-check-input"}),
    )

    # BASIC INFORMATION
    home_county = forms.ChoiceField(
        widget=forms.Select(
            attrs={
                "class": "sc-eilVRo byoPMv js-basic-single",
            },
        ),
        choices=Counties.choices,
        help_text="""
            "This is your home county or where your permanent home is
            "The location however can charge based on where you are""",
    )
    residence_county = forms.ChoiceField(
        widget=forms.Select(
            attrs={
                "class": "sc-eilVRo byoPMv js-basic-single",
            },
        ),
        choices=Counties.choices,
        help_text="""
        This is  county or where your currently reside in home is
        The location however can charge based on where you are""",
    )
    middle_name = forms.CharField(
        widget=forms.TextInput(attrs={
                    "class": "form-control sc-eilVRo byoPMv",
                    "placeholder": "Middle Initial (Optional) ",
                },
            ),
        required=False,
    )


    class Meta:
        model = LoanApplication
        fields = [
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
        ]
        widgets = {
            # BASIC INFORMATION
            "first_name": forms.TextInput(
                attrs={
                    "class": "form-control sc-eilVRo byoPMv",
                    "placeholder": "First name",
                }),
            "last_name": forms.TextInput(attrs={
                    "class": "form-control sc-eilVRo byoPMv",
                    "placeholder": "Last name",
                }),
            "email_address": forms.EmailInput(attrs={
                    "class": "form-control sc-eilVRo byoPMv",
                    "placeholder": "Email Address",
                }),
            # BASIC CONTACT INFORMATION
            "phone": forms.TextInput(attrs={
                "class": "form-control sc-eilVRo byoPMv",
                "id": "phoneInput",
                "placeholder":"07xxxxxxxxxx",
            }),
            "permanent_address": forms.TextInput(attrs={
                "class": "form-control sc-eilVRo byoPMv",
                "placeholder":"Permanent Address",
                }),
            "address_2": forms.TextInput(attrs={
                 "class": "form-control sc-eilVRo byoPMv",
                "placeholder":"Address 2 (if applicable)",
                }),
            "city_town": forms.TextInput(attrs={
                "class": "form-control sc-eilVRo byoPMv",
                "placeholder": "City/Town",
                }),
            "zip_code": forms.TextInput(attrs={
                "class": "form-control sc-eilVRo byoPMv",
                "placeholder": "Zip Code",
            }),
            # PERSONAL INFORMATION
            "date_of_birth": forms.DateInput(
                format="MM/DD/YYYY",
                attrs={
                    "placeholder": "Date of Birth (MM/DD/YYYY)",
                    "class": "form-control sc-eilVRo byoPMv",
                    "id": "dateInput",
                },
            ),
            "national_id": forms.TextInput(attrs={
                "class": "form-control sc-eilVRo byoPMv",
                "placeholder": "National ID Number",
                }),
            "national_id_confirmation": forms.TextInput(attrs={
                "class": "form-control sc-eilVRo byoPMv",
                "placeholder": "Confirm National ID Number",
                }),
            # SCHOOL | LOAN INFORMATION,
            "high_school_attended": forms.TextInput(attrs={
                    "class": "form-control sc-eilVRo byoPMv",
                    "placeholder": "High School You attended",
                }),

            "college_university_admitted": forms.TextInput(
                attrs={"class": "form-control"}),
            "course_admitted": forms.TextInput(attrs={"class": "form-control"}),
            # LOAN DETAILS
            # VERIFICATION DOCUMENTATION
            "national_id_scanned_copy": forms.FileInput(),
            "high_school_certificate_scanned_copy": forms.FileInput(),
            "college_university_admitted_scanned_copy": forms.FileInput(),
        }
        help_texts = {
        "email_address": (
            "By providing your email address, we may use it to contact you about "
            "your loan and tell you about our products and services. We will not "
            "sell your information to any third parties for marketing."
            ),
        "permanent_address": (
            "Your permanent address is the address we will use to verify your identity."
            "Be sure this matches the address on your license or other government IDs."
            "P.O. Boxes are not accepted."
            ),
        "city_town": "This is your home city or town.",
        "zip_code": "The postal code of your present town or city where you reside",
        }
    def get_consent_text(self):
        return (
            "I understand and agree that Afri Fund (and its agents, servicers, debt collectors, "  # noqa: E501
            "independent contractors, assigns and successors) may contact me regarding my application "  # noqa: E501
            "or loan, and any prior or subsequent applications or loans, using prerecorded or artificial "  # noqa: E501
            "voice messages, calls, messages from automated dialing systems, and text messages at any "  # noqa: E501
            "telephone number I have provided or will provide in the future. I understand and agree that "  # noqa: E501
            "normal usage and text message charges may apply and that I may revoke this consent at any time."  # noqa: E501
        )
    def get_security_protection_mechanism_text(self):
        return "We use SSL security and 256-bit encryption to keep your information safe."  # noqa: E501



class ScholarShipEntryForm(forms.Form):
    participant_identity = forms.ChoiceField(
        widget=forms.Select(
            attrs={
                "class": "sc-eilVRo byoPMv js-basic-single",
            },
        ),
        choices=(
            ("UNDERGRADUATE", "UNDERGRADUATE STUDENT"),
            ("GRADUATE", "GRADUATE STUDENT"),
            ("PARENT", "PARENT"),
            ),
        help_text="""""",
    )
    first_name = forms.CharField(max_length=300,widget=forms.TextInput(
        attrs={
            "class": "form-control sc-eilVRo byoPMv",
            "placeholder": "First name",
    }))
    last_name = forms.CharField(max_length=300,widget=forms.TextInput(attrs={
            "class": "form-control sc-eilVRo byoPMv",
            "placeholder": "Last name",
    }))
    email_address = forms.CharField(max_length=300,widget=forms.EmailInput(attrs={
            "class": "form-control sc-eilVRo byoPMv",
            "placeholder": "Email Address",
    }))
    phone = forms.CharField(widget=forms.TextInput(attrs={
        "class": "form-control sc-eilVRo byoPMv",
        "id": "phoneInput",
        "placeholder":"07xxxxxxxxxx",
    }))
