# Generated by Django 4.2.14 on 2024-09-17 15:53

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PressRelease',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=1000, unique=True)),
                ('slug', models.SlugField(max_length=1000)),
                ('date', models.DateField(auto_now_add=True)),
                ('content', models.TextField()),
                ('author', models.CharField(default='Afri Fund', max_length=100)),
                ('is_archived', models.BooleanField(default=False)),
                ('is_approved', models.BooleanField(default=True)),
            ],
        ),
    ]
