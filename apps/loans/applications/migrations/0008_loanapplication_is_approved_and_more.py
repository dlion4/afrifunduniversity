# Generated by Django 4.2.14 on 2024-10-02 20:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('applications', '0007_loanapplication_telephone_consumer_protection'),
    ]

    operations = [
        migrations.AddField(
            model_name='loanapplication',
            name='is_approved',
            field=models.BooleanField(default=False),
        ),
        migrations.AddConstraint(
            model_name='loanapplication',
            constraint=models.UniqueConstraint(condition=models.Q(('is_approved', False)), fields=('email_address',), name='unique_email_pending_application'),
        ),
    ]
