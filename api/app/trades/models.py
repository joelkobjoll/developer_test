import uuid
from django.db import models

class Trade(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    booked = models.DateTimeField(auto_now_add=True)
    buy_amount = models.DecimalField(decimal_places=2, max_digits=20)
    buy_currency = models.CharField(max_length=3)
    rate = models.DecimalField(decimal_places=6, max_digits=20)
    sell_amount = models.DecimalField(decimal_places=2, max_digits=20)
    sell_currency = models.CharField(max_length=3)

    class Meta:
        ordering = ('booked',)