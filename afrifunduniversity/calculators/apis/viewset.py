from drf_spectacular.utils import OpenApiExample
from drf_spectacular.utils import OpenApiParameter
from drf_spectacular.utils import OpenApiTypes
from drf_spectacular.utils import extend_schema
from drf_spectacular.utils import extend_schema_field
from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser

from afrifunduniversity.calculators.models import LoanCalculator

from .serializers import LoanCalculatorSerializer


class LoanCalculatorModelViewSet(viewsets.ModelViewSet):
    queryset = LoanCalculator.objects.all()
    serializer_class = LoanCalculatorSerializer
    permission_classes = [permissions.AllowAny]
    parser_classes = [MultiPartParser]

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="icon",
                description="Icon File Field",
                type=OpenApiTypes.BINARY,
            ),
            OpenApiParameter(
                name="Title",
                description="Title Confusion",
                type=OpenApiTypes.STR,
            ),
        ],
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)



    @extend_schema_field(OpenApiTypes.OBJECT)
    def get_serializer(self, *args, **kwargs):
        return super().get_serializer(*args, **kwargs)
