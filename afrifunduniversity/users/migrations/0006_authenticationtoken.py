# Generated by Django 4.2.14 on 2024-09-26 13:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_alter_user_options_alter_user_managers_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='AuthenticationToken',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hashed_token', models.CharField(max_length=120, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('is_expired', models.BooleanField(default=False)),
                ('is_revoked', models.BooleanField(default=False)),
                ('expiry_data', models.DateTimeField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_authentication_token', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Authentication token',
                'verbose_name_plural': 'Authentication tokens',
                'ordering': ['-created_at'],
            },
        ),
    ]
