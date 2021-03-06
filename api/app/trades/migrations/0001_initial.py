# Generated by Django 2.1.7 on 2019-04-01 18:13

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Trade',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('booked', models.DateTimeField(auto_now_add=True)),
                ('sell_currency', models.CharField(editable=False, max_length=3)),
                ('sell_amount', models.DecimalField(decimal_places=6, editable=False, max_digits=20)),
                ('buy_currency', models.CharField(editable=False, max_length=3)),
                ('buy_amount', models.DecimalField(decimal_places=6, editable=False, max_digits=20)),
                ('rate', models.DecimalField(decimal_places=6, editable=False, max_digits=20)),
            ],
            options={
                'ordering': ('booked',),
            },
        ),
    ]
