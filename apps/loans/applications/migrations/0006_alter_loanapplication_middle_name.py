# Generated by Django 4.2.14 on 2024-09-26 09:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('applications', '0005_remove_loanapplication_loan_amount_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='loanapplication',
            name='middle_name',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
