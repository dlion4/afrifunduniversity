# Generated by Django 4.2.14 on 2024-09-20 10:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('help', '0008_questionresponsearticle_content_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='questionresponsearticle',
            name='updated_at',
            field=models.DateField(auto_now=True),
        ),
    ]
