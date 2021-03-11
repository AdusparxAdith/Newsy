from django.shortcuts import render
from rest_framework import viewsets
from .serializers import SubscriptionSerializer
from .models import Subscription

# Create your views here.


class SubscriptionView(viewsets.ModelViewSet):
    serializer_class = SubscriptionSerializer
    queryset = Subscription.objects.all()
