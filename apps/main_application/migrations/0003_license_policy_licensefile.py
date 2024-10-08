# Generated by Django 4.2.14 on 2024-09-23 12:00

import apps.main_application.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main_application', '0002_subscription'),
    ]

    operations = [
        migrations.CreateModel(
            name='License',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('country', models.CharField(max_length=100, unique=True)),
                ('slug', models.SlugField(max_length=100)),
                ('license_number', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Policy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateField(auto_now=True)),
            ],
            options={
                'get_latest_by': 'updated_at',
            },
        ),
        migrations.CreateModel(
            name='LicenseFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('document', models.FileField(upload_to=apps.main_application.models.get_file_upload_path)),
                ('license', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='license_file', to='main_application.license')),
            ],
        ),
    ]
