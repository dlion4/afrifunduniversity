
from django import forms
from django.contrib.auth import forms as admin_forms
from django.forms import EmailField
from django.utils.translation import gettext_lazy as _

from .models import User


class UserAdminChangeForm(admin_forms.UserChangeForm):
    class Meta(admin_forms.UserChangeForm.Meta):  # type: ignore[name-defined]
        model = User
        field_classes = {"email": EmailField}


class UserAdminCreationForm(admin_forms.UserCreationForm):
    """
    Form for User Creation in the Admin Area.
    To change user signup, see UserSignupForm and UserSocialSignupForm.
    """

    class Meta(admin_forms.UserCreationForm.Meta):  # type: ignore[name-defined]
        model = User
        fields = ("email",)
        field_classes = {"email": EmailField}
        error_messages = {
            "email": {"unique": _("This email has already been taken.")},
        }



# Extend the UserAdminCreationForm for frontend user registration
class FrontendUserSignupForm(forms.ModelForm):
    """
    Form for frontend user registration.
    This extends the UserAdminCreationForm.
    """

    # Additional fields (if required for frontend)
    dob = forms.DateField(
        required=True,
        label=_("Date of Birth (MM/DD/YYYY)"),
        widget=forms.DateInput(
        format="%m/%d/%Y",
         attrs={
                "autocomplete":"off",
                "name":"dob",
                "id":"dob",
                "class":"input c4053936d caff7ffcc dobMask",
            },
        ),
        input_formats=["%m/%d/%Y"],  # Specify the input format expected
    )
    email = forms.CharField(
        max_length=255,
        required=True,
        label=_("Email Address"),
        widget=forms.TextInput(
            attrs={
                "autocomplete":"off",
                "name":"email_address",
                "id":"email",
                "class":"input c4053936d caff7ffcc",
            },
        ),
    )
    national_id_number = forms.CharField(
        max_length=30,
        required=True,
        label=_("National Identification Number"),
        widget=forms.TextInput(
            attrs={
                "autocomplete":"off",
                "name":"id_number",
                "id":"idno",
                "class":"input c4053936d ssnMask",
            },
        ),
    )
    terms_and_conditions = forms.BooleanField(
        required=False,
        label="""
        Accept
        <a href="/privacy/" class="embedded-link">
        Afri Fund University's Privacy Policy
        </a>
        and
        <a href="/terms/" class="embedded-link">KAS' Terms.</a>
        """,
        error_messages={
            "required": "You must accept the privacy policy and terms and conditions.",
        },
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            "class": "input c4053936d",
            "id": "password",
        }),
        label="Password",
    )
    password2 = forms.CharField(
        widget=forms.PasswordInput(attrs={
            "class": "input c4053936d",
            "id": "password2"
        }),
        label="Confirm Password",
    )

    class Meta:
        model = User
        fields = ("dob", "email", "national_id_number", "terms_and_conditions")
        field_classes = {"email": forms.EmailField}
        error_messages = {
            "email": {
                "unique": _("This email has already been taken."),
            },
        }

class UserLoginForm(forms.Form):
    email = forms.CharField(
        max_length=255,
        required=True,
        label=_("Email Address"),
        widget=forms.TextInput(
            attrs={
                "name":"email",
                "id":"email",
                "class":"input c4053936d",
            },
        ),
    )
    password = forms.CharField(
        max_length=255,
        required=True,
        label=_("Password"),
        widget=forms.PasswordInput(
            attrs={
                "name":"password",
                "id":"password",
                "class":"input c4053936d",
            },
        ),
    )
    remember_me = forms.BooleanField(
        required=False,
        label="""
        Remember Email Address
        """,
        widget=forms.CheckboxInput(
            attrs={
                "class":"rememberMeCheckbox",
                "id":"RememberLogin",
                "name":"RememberLogin",
            },
        ),
    )
class PasswordResetRequestForm(forms.Form):
    email = forms.CharField(
        max_length=255,
        required=True,
        label=_("Email Address"),
        widget=forms.TextInput(
            attrs={
                "name":"email",
                "id":"email",
                "class":"input c4053936d",
            },
        ),
    )
class PasswordResetForm(forms.Form):
    password = forms.CharField(
        max_length=255,
        required=True,
        label=_("New Password"),
        widget=forms.PasswordInput(
            attrs={
                "name":"password",
                "id":"password",
                "class":"input c4053936d",
            },
        ),
    )
    password2 = forms.CharField(
        max_length=255,
        required=False,
        label=_("Confirm New Password"),
        widget=forms.PasswordInput(
            attrs={
                "id":"password2",
                "class":"input c4053936d",
            },
        ),
    )
