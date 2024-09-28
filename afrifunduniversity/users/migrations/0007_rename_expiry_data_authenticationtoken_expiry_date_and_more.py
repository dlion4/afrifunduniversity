# Generated by Django 4.2.14 on 2024-09-28 11:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_authenticationtoken'),
    ]

    operations = [
        migrations.RenameField(
            model_name='authenticationtoken',
            old_name='expiry_data',
            new_name='expiry_date',
        ),
        migrations.AddField(
            model_name='user',
            name='dob',
            field=models.DateField(blank=True, null=True, verbose_name='Your date of birth'),
        ),
        migrations.AddField(
            model_name='user',
            name='national_id_number',
            field=models.IntegerField(default=3003203, verbose_name='Your National Identification Number'),
            preserve_default=False,
        ),
    ]
