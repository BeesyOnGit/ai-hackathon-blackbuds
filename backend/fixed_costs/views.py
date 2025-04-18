from django.shortcuts import render
from drf_spectacular.utils import OpenApiExample, OpenApiParameter, OpenApiResponse, extend_schema
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import FixedCosts
from .serializers import FixedCostsSerializer


class FixedCostsView(APIView):
    """
    API View for managing Fixed Costs for the authenticated user.

    Each user can have only one Fixed Costs object associated with their account.
    This view provides endpoints to create, retrieve, and update fixed costs.
    """

    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        summary="Create fixed costs",
        description="Create a new fixed costs record for the current user. This will fail if the user already has a fixed costs record.",
        request=FixedCostsSerializer,
        responses={
            201: OpenApiResponse(response=FixedCostsSerializer, description="Fixed costs created successfully"),
            400: OpenApiResponse(description="Invalid request or fixed costs already exist"),
        },
        examples=[
            OpenApiExample(
                name="Fixed Costs Example",
                value={
                    "rental": 20000,
                    "employees": 40000,
                    "communication": 6000,
                    "dev": 5000,
                    "transportation": 30000,
                    "other": 5000,
                },
                request_only=True,
            ),
        ],
    )
    def post(self, request):
        """
        Create fixed costs for the current user (only if it doesn't already exist)

        Creates a new fixed costs record linked to the authenticated user.
        Will return an error if the user already has fixed costs.

        Request body:
            rental (decimal): Monthly rental expenses
            employees (decimal): Monthly employee costs
            communication (decimal): Monthly communication expenses
            dev (decimal): Monthly development costs
            transportation (decimal): Monthly transportation costs
            other (decimal): Other monthly fixed expenses

        Returns:
            201 Created: Fixed costs created successfully with data
            400 Bad Request: If validation fails or user already has fixed costs
        """
        # Check if fixed costs already exist for the user
        if hasattr(request.user, "fixed_costs"):
            return Response({"detail": "Fixed costs already exist for this user."}, status=status.HTTP_400_BAD_REQUEST)

        # Create fixed costs for the user
        serializer = FixedCostsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(
        summary="Get user's fixed costs",
        description="Retrieve the fixed costs for the current authenticated user.",
        responses={
            200: OpenApiResponse(
                response=FixedCostsSerializer, description="User's fixed costs retrieved successfully"
            ),
            404: OpenApiResponse(description="No fixed costs found for this user"),
        },
    )
    def get(self, request):
        """
        Retrieve the current user's fixed costs

        Returns the fixed costs record associated with the authenticated user.

        Returns:
            200 OK: User's fixed costs data
            404 Not Found: If no fixed costs exist for the user
        """
        try:
            fixed_costs = FixedCosts.objects.get(user=request.user)
            serializer = FixedCostsSerializer(fixed_costs)
            return Response(serializer.data)
        except FixedCosts.DoesNotExist:
            return Response({"detail": "No fixed costs found for this user."}, status=status.HTTP_404_NOT_FOUND)

    @extend_schema(
        summary="Update user's fixed costs",
        description="Update specific fields in the fixed costs for the current authenticated user.",
        request=FixedCostsSerializer,
        responses={
            200: OpenApiResponse(response=FixedCostsSerializer, description="Fixed costs updated successfully"),
            400: OpenApiResponse(description="Invalid request data"),
            404: OpenApiResponse(description="No fixed costs found for this user"),
        },
        examples=[
            OpenApiExample(
                name="Update Example",
                value={"rental": 25000, "transportation": 35000},
                request_only=True,
                summary="Example of updating specific fields",
            ),
        ],
    )
    def patch(self, request):
        """
        Update fields in the current user's fixed costs

        Partially updates the fixed costs record for the authenticated user.
        Only the fields included in the request will be updated.

        Request body:
            rental (decimal, optional): Monthly rental expenses
            employees (decimal, optional): Monthly employee costs
            communication (decimal, optional): Monthly communication expenses
            dev (decimal, optional): Monthly development costs
            transportation (decimal, optional): Monthly transportation costs
            other (decimal, optional): Other monthly fixed expenses

        Returns:
            200 OK: Updated fixed costs data
            400 Bad Request: If validation fails
            404 Not Found: If no fixed costs exist for the user
        """
        try:
            fixed_costs = FixedCosts.objects.get(user=request.user)
            serializer = FixedCostsSerializer(fixed_costs, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except FixedCosts.DoesNotExist:
            return Response({"detail": "No fixed costs found for this user."}, status=status.HTTP_404_NOT_FOUND)
