from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from trades import views

urlpatterns = [
    path('trades', views.TradeList.as_view()),
    path('trades/<int:pk>/', views.TradeDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)