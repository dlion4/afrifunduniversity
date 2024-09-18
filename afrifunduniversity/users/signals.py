from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Profile
from .models import User


@receiver(post_save, sender=User)
def create_profile_on_registration(
    sender:User, instance:User, created:bool, **kwargs: dict):  # noqa: FBT001
    if created:
        Profile.objects.create(user=instance)
    else:
        instance.user_profile.save()
