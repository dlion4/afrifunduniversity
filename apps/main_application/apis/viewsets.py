from rest_framework.generics import GenericAPIView
from rest_framework import permissions
from apps.main_application.models import Review
from .serializers import ReviewSerializer
from rest_framework import viewsets

class ReviewListViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.AllowAny]
    queryset = Review.objects.all()
