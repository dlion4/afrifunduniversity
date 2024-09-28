# Generated by Django 4.2.14 on 2024-09-28 12:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_alter_user_national_id_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='national_id_number',
            field=models.PositiveBigIntegerField(unique=True, verbose_name='Your National Identification Number'),
        ),
    ]
