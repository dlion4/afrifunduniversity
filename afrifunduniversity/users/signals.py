from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework_api_key.models import APIKey  # noqa: F401

from .models import Profile
from .models import ProfileAPIKey
from .models import User


@receiver(post_save, sender=User)
def create_profile_on_registration(
    sender:User, instance:User, created:bool, **kwargs: dict):  # noqa: FBT001
    if created:
        Profile.objects.create(user=instance)
        # ProfileAPIKey.objects.create(profile=profile, name=f"{profile.user.email}_API_KEY")  # noqa: E501
        # APIKey.objects.create(name=f"{profile.user.email}_API_KEY")  # noqa: ERA001
    else:
        instance.user_profile.save()


# @receiver(post_save, sender=Profile)
# def update_profile_api_key_on_update(sender, instance, **kwargs):
#     if instance.pk and kwargs.get('created', False) is False:
