# Generated by Django 4.2.14 on 2024-09-19 21:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('help', '0005_questionresponse_rename_icons_question_icon_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='slug',
            field=models.SlugField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='questionresponse',
            name='slug',
            field=models.SlugField(blank=True, max_length=100),
        ),
    ]
