from django.urls import path
from .views import ProjectListView, ContactCreateView

urlpatterns = [
    path('projects/', ProjectListView.as_view(), name='projects-list'),
    path('contact/', ContactCreateView.as_view(), name='contact-create'),
]
