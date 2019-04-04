
from .models import Trade
from datetime import datetime
from rest_framework import serializers

class TradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trade
        fields = ('booked', 'sell_currency', 'sell_amount', 'buy_currency', 'buy_amount', 'rate')