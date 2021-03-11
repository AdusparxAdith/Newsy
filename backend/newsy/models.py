from django.db import models


# Create your models here.


class Subscription(models.Model):
    email = models.EmailField(max_length=254)
    date = models.DateTimeField()

    def _str_(self):
        return '{self.email} - date'.format(self=self)
