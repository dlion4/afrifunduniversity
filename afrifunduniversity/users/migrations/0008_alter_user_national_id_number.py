# Generated by Django 4.2.14 on 2024-09-28 11:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_rename_expiry_data_authenticationtoken_expiry_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='national_id_number',
            field=models.IntegerField(unique=True, verbose_name='Your National Identification Number'),
        ),
    ]
