# Generated by Django 4.2.14 on 2024-09-26 09:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('applications', '0006_alter_loanapplication_middle_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='loanapplication',
            name='telephone_consumer_protection',
            field=models.BooleanField(default=False),
        ),
    ]
