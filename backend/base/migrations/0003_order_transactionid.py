# Generated by Django 4.0.4 on 2022-07-27 01:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_remove_product_brand'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='transactionId',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
