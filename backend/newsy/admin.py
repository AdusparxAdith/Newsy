from django.contrib import admin
from .models import Subscription


class NewsyAdmin(admin.ModelAdmin):
    list_display = ('email', 'date')


# Register your models here.
admin.site.register(Subscription, NewsyAdmin)
