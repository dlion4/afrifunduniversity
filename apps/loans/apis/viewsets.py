from rest_framework import permissions
from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.request import Request
from apps.loans.models import Glossary, LoanInterestRate
from django.db import IntegrityError
from rest_framework.exceptions import ValidationError
from .serializers import GlossarySerializer, LoanInterestRateSerializer


class GlossaryModelViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Glossary.objects.all()
    serializer_class = GlossarySerializer

class LoanInterestRateModelViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = LoanInterestRate.objects.all()
    serializer_class = LoanInterestRateSerializer

    def create(self, request: Request, *args, **kwargs) -> Response:
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)  # noqa: E501
        except IntegrityError:
            return Response(
                {"error": "Duplicate interest rate for the same loan type and term."},
                status=status.HTTP_400_BAD_REQUEST)

