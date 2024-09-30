from django import forms


class PreQualificationForm(forms.Form):
    f_name = forms.CharField(
        max_length=100, required=True,
        widget=forms.TextInput(attrs={"class": "form-field__input"}),
        label="First Name",
    )
    l_name = forms.CharField(
        max_length=100, required=True,
        widget=forms.TextInput(attrs={"class": "form-field__input"}),
        label="Last Name",
    )
    employment_status = forms.ChoiceField(
        choices=(("E", "Employed"), ("U", "Unemployed")),
        widget=forms.Select(
            attrs={"class": "form-field__input", "style": "cursor:pointer;"}),
        label="Employment Status",
        required=False,
    )

    average_monthly_income = forms.DecimalField(
        required=False,
        widget=forms.NumberInput(attrs={"class": "form-field__input"}),
        label="Average Monthly income",
    )
    street_address = forms.CharField(
        max_length=100, required=True,
        widget=forms.TextInput(attrs={"class": "form-field__input"}),
        label="Street Address",
    )

    zip_code = forms.CharField(
        widget=forms.TextInput(attrs={"class": "form-field__input"}),
        label="Zip Code",
        required=True,
    )
    email_address = forms.CharField(
        widget=forms.EmailInput(attrs={"class": "form-field__input"}),
        max_length=100,
        label="Email Address",
        required=True,
    )
    phone_number = forms.CharField(
       widget=forms.TextInput(attrs={"class": "form-field_input"}),
        label="Phone Number",
        required=False,
    )
    date_of_birth = forms.DateField(
        widget=forms.DateInput(attrs={"class": "form-field_input"}),
        label="Date of Birth",
        required=False,
    )
