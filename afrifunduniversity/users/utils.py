import json
import secrets
import string
import threading
import time
from typing import Any
from urllib.parse import parse_qs

import scrapy
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.db import models
from django.http import HttpRequest
from django.http import JsonResponse
from django.urls import reverse
from django.utils import timezone
from django.utils.encoding import force_bytes
from django.utils.http import base36_to_int
from django.utils.http import int_to_base36
from django.utils.http import urlsafe_base64_encode
from django.utils.timezone import timedelta

from .models import User as UserObject
from .tasks import send_background_email


class ConcatField(models.Func):
    arg_joiner = " || "
    function = None
    output_field = models.TextField()
    template = "%(expressions)s"


class BackgroundEmailThread(threading.Thread):

    def __init__(self, email):
        self.email = email
        threading.Thread.__init__(self)

    def run(self):
        send_background_email(self.email)


class ExpiringTokenGenerator(PasswordResetTokenGenerator):
    """
    """

    TOKEN_EXPIRY_TIMEOUT:int = 3600 # Default to 1 hour
    def make_token(self, user):
        timestamp = int(time.time())
        return f"{super().make_token(user)}-{int_to_base36(timestamp)}"

    def check_token(self, user, token):
        try:
            token, timestamp = token.rsplit("-", 1)
            timestamp = base36_to_int(timestamp)
        except (ValueError, TypeError):
            return False
        # Check token age
        if time.time() - timestamp > self.TOKEN_EXPIRY_TIMEOUT:
            # The time duration for which the token remains valid
            return False
        return super().check_token(user, token)

expiring_token_generator = ExpiringTokenGenerator()



class UserAuthFlowController:

    def _build_link_from_path(
        self, request:HttpRequest, path:str, kwds:dict | None=None,
        )->str:
        return request.build_absolute_uri(reverse(path, kwargs=kwds))

    def  build_url_from_path(
        self, request:HttpRequest, path:str, kwds:dict | None=None,
    ):
        return self._build_link_from_path(request, path, kwds)

    def send_login_email(
        self, user:UserObject,email_template:str= "accounts/mails/login.html", context:dict={}):  # noqa: B006, E501
        link = self.build_url_from_path(request=self.request, path="users:login")
        thread = threading.Thread(
            target=send_background_email,
            args=(
                user,
               email_template,
                {
                    "user": user,
                    "email":user.email,
                    "link": link,
                    "subject": "Login Request",
                    "extra": {k:v for k,v in context.items() if v is not None},
                },
            ),
        )
        thread.start()

    def send_signup_email(
        self, email,email_template:str="accounts/mails/signup.html", context:dict={},  # noqa: B006
        )->None:
        link=self._build_link_from_path(request=self.request, path="users:signup")
        thread = threading.Thread(target=send_background_email, args=(
            None, email_template,
            {
                "email": email,
                "link": link,
                "subject": "Liquid Registration",
                "from_email": "no-reply@liquid.com",
                "extra": {k:v for k,v in context.items() if v is not None},
            },
            None,
        ))
        thread.start()

    def send_welcome_email(
        self, email,email_template:str="accounts/mails/welcome/index.html", context:dict={},  # noqa: B006, E501
    )->None:
        """This is the welcome email sent wen a new user just register can be both for
        the
        Referred and the un referred users
        """
        thread = threading.Thread(target=send_background_email, args=(
            None,
            email_template,
            {
                "email": email,
                "subject": "Welcome to Afu Lenders",
                "from_email": "no-reply@afulenders.com",
                "extra": {k:v for k,v in context.items() if v is not None},
            },
            None,
        ))
        thread.start()
        # Wait for the thread to complete
    def send_verification_email(self, email, email_template:str="account/mails/verify_email.html", context:dict={}):
        """
        This function sends a verification email to the user.
        """
        user = UserObject.objects.get(email=email)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = expiring_token_generator.make_token(user)
        link = self._build_link_from_path(request=self.request,path="users:verify-email",
            kwds={"uid": uid, "token": token},
        )
        thread = threading.Thread(target=send_background_email, args=(
            None,
            email_template,
            {
                "email": email,
                "subject": "Welcome to Afu Lenders",
                "from_email": "no-reply@afulenders.com",
                "link": link,
                "extra": {k:v for k,v in context.items() if v is not None},
            },
            None,
        ))
        thread.start()

    def send_password_reset_email(
        self, email, email_template:str="account/mails/reset_password_email.html", context:dict | None=None):  # noqa: E501
        if context is None:
            context = {}
        user = UserObject.objects.get(email=email)
        token = expiring_token_generator.make_token(user)
        link = self._build_link_from_path(
            request=self.request,path="users:reset-password-view",kwds={"token": token},
        )
        thread = threading.Thread(target=send_background_email, args=(
            None,
            email_template,
            {
                "email": email, "subject": "Password Reset Request",
                "from_email": "no-reply@afulenders.com", "link": link,
                "extra": {k:v for k,v in context.items() if v is not None},
            },
            None,
        ))
        thread.start()





class NemisValidatorScraper(scrapy.Spider):
    name = "Nemis Scraper"
    start_urls = ["https://www.zyte.com/blog/"]

    def parse(self, response):
        for title in response.css(".oxy-post-title"):
            yield {"title": title.css("::text").get()}

        for next_page in response.css("a.next"):
            yield response.follow(next_page, self.parse)
