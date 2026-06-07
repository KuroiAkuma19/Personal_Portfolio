from django.db import models


class Project(models.Model):
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=200, blank=True)
    description = models.TextField(blank=True)
    repo = models.URLField(blank=True)
    stars = models.IntegerField(null=True, blank=True)
    updated_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.name


class ContactMessage(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} <{self.email}>"
