from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status

from .models import Project, ContactMessage
from .serializers import ProjectSerializer, ContactMessageSerializer


class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all().order_by('-updated_at')
    serializer_class = ProjectSerializer


class ContactCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({'status': 'ok'}, status=status.HTTP_201_CREATED)
