import json

from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema
from rest_framework import generics
from rest_framework import permissions
from rest_framework import status
from rest_framework import views
from rest_framework import viewsets
from rest_framework.generics import GenericAPIView
from rest_framework.request import Request
from rest_framework.response import Response

from apps.main_application.models import Review
from apps.main_application.models import Subscription
from apps.main_application.services import AIServicePipeline

from .serializers import ReviewSerializer
from .serializers import SubscriptionRecordSerializer
from .serializers import SubscriptionSerializer


class ReviewListViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.AllowAny]
    queryset = Review.objects.all()

    @extend_schema(
        operation_id="create_review",
        request=ReviewSerializer,
        responses={201: ReviewSerializer},
    )
    def create(self, request:Request, *args, **kwargs) -> Response:
        ai_service = AIServicePipeline()
        review_rate = ai_service.process_review_request(request.data)
        return super().create(request, *args, **kwargs)


class SubscriptionViewSet(viewsets.ModelViewSet):
    serializer_class = SubscriptionSerializer
    queryset = Subscription.objects.all()
    permission_classes = [permissions.AllowAny]

    @extend_schema(
        operation_id="create_subscription",
        request=SubscriptionSerializer,
        responses={201: SubscriptionSerializer},
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

class SubscriptionView(views.APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = SubscriptionSerializer
    queryset = Subscription.objects.all()
    def get(self, request, pk=None, *args, **kwargs):
        try:
            subscription = get_object_or_404(Subscription, pk=pk)
            serializer = SubscriptionSerializer(subscription)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Subscription.DoesNotExist:
            subscriptions = Subscription.objects.all()
            serializer = SubscriptionSerializer(subscriptions, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = SubscriptionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk=None, *args, **kwargs):
        return self._extracted_from_patch_2(pk, request, False)

    def patch(self, request, pk=None, *args, **kwargs):
        return self._extracted_from_patch_2(pk, request, True)

    # TODO Rename this here and in `put` and `patch`
    def _extracted_from_patch_2(self, pk, request, partial):
        subscription = get_object_or_404(Subscription, pk=pk)
        serializer = SubscriptionSerializer(
            subscription, data=request.data, partial=partial
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None, *args, **kwargs):
        subscription = get_object_or_404(Subscription, pk=pk)
        subscription.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SubscriptionRecordView(
    generics.ListCreateAPIView, generics.RetrieveUpdateDestroyAPIView):
    http_method_names = ["put"]
    permission_classes = [permissions.AllowAny]
    serializer_class = SubscriptionRecordSerializer
    def put(self, request, *args, **kwargs):
        print("Put data: ", json.loads(request.body))
        return Response({"message": "Data updated"}, status=status.HTTP_200_OK)
