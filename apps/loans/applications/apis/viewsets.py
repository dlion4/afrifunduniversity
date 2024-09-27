from drf_spectacular.utils import OpenApiParameter
from drf_spectacular.utils import extend_schema
from rest_framework import permissions
from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework_api_key.permissions import HasAPIKey

from apps.loans.applications.models import LoanApplication
from apps.loans.applications.models import LoanCategory
from apps.loans.applications.models import LoanRepayment

from .serializers import LoanApplicationSerializer
from .serializers import LoanCategorySerializer
from .serializers import LoanRepaymentSerializer


@extend_schema(
    parameters=[
        OpenApiParameter("residence_county", str, description="The county of residence"),
        OpenApiParameter("home_county", str, description="The county of Origin"),
    ],
)

class LoanApplicationViewSet(viewsets.ModelViewSet):
    queryset = LoanApplication.objects.all()
    serializer_class = LoanApplicationSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly | HasAPIKey,
    ]

class LoanCategoryViewSet(viewsets.ModelViewSet):
    queryset = LoanCategory.objects.all()
    serializer_class = LoanCategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class LoanRepaymentViewSet(viewsets.ModelViewSet):
    queryset = LoanRepayment.objects.all()
    serializer_class = LoanRepaymentSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly | HasAPIKey,
    ]
