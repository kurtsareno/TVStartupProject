from django.db import models
from datetime import datetime

class Movie(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    video_file = models.FileField(upload_to='movies/', null=True, blank=True) 
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title