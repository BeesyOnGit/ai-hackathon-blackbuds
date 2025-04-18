from django.shortcuts import get_object_or_404, render
from drf_spectacular.utils import OpenApiExample, OpenApiParameter, OpenApiResponse, extend_schema
from rest_framework import mixins, permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Product, ProductCost
from .serializers import ProductCostSerializer, ProductDetailSerializer, ProductSerializer


class ProductViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """
    ViewSet for handling Product model operations.

    This viewset provides endpoints to retrieve specific products (detail only).
    It also provides specialized endpoints for managing products with or without
    associated product costs, adding product costs to products, and updating product costs.

    Note: The main list endpoint has been removed. Use /with-costs or /without-costs
    endpoints instead to get lists of products.
    """

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProductSerializer
    http_method_names = ["get", "post", "head", "options"]  # Only allow GET and special POST actions

    def get_queryset(self):
        """
        Return products belonging to the current user.
        """
        return Product.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        """
        Return different serializers based on the action.
        """
        if self.action == "retrieve":
            return ProductDetailSerializer
        return ProductSerializer

    @extend_schema(
        summary="List products without costs",
        description="Returns a list of all products that do not have associated product costs.",
        responses={
            200: OpenApiResponse(
                response=ProductSerializer(many=True), description="List of products without product costs"
            ),
        },
    )
    @action(detail=False, methods=["get"], url_path="without-costs")
    def products_without_costs(self, request):
        """
        Get all products that don't have product costs.

        Returns:
            200 OK: List of products without product costs
        """
        # Get products without product costs using related name
        products = self.get_queryset().filter(product_cost__isnull=True)
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)

    @extend_schema(
        summary="List products with costs",
        description="Returns a list of all products that have associated product costs.",
        responses={
            200: OpenApiResponse(
                response=ProductSerializer(many=True), description="List of products with product costs"
            ),
        },
    )
    @action(detail=False, methods=["get"], url_path="with-costs")
    def products_with_costs(self, request):
        """
        Get all products that have product costs.

        Returns:
            200 OK: List of products with product costs
        """
        # Get products with product costs using related name
        products = self.get_queryset().filter(product_cost__isnull=False)
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)

    @extend_schema(
        summary="Add product costs to a product",
        description="Add product costs to a product if it doesn't already have one.",
        request=ProductCostSerializer,
        responses={
            200: OpenApiResponse(response=ProductDetailSerializer, description="Product with newly added costs"),
            400: OpenApiResponse(description="Invalid request or product already has costs"),
            404: OpenApiResponse(description="Product not found"),
        },
        examples=[
            OpenApiExample(
                name="Product Cost Example",
                value={
                    "product_cost": 900,
                    "confirmation_fees": 100,
                    "packaging_fees": 100,
                    "return_cost": 290,
                    "ads_cost": 2000,
                },
                request_only=True,
            ),
        ],
    )
    @action(detail=True, methods=["post"], url_path="add-costs")
    def add_product_costs(self, request, pk=None):
        """
        Add product costs to a product if it doesn't already have one.

        Request body:
            product_cost (decimal): Base cost of the product
            confirmation_fees (decimal): Fees related to confirming product orders
            packaging_fees (decimal): Fees related to packaging the product
            return_cost (decimal): Costs associated with product returns
            ads_cost (decimal): Advertising costs for the product

        Returns:
            200 OK: Product with newly added costs
            400 Bad Request: If validation fails or product already has costs
            404 Not Found: If product not found
        """
        product = self.get_object()

        # Check if product already has costs
        if hasattr(product, "product_cost"):
            return Response(
                {"detail": "This product already has associated costs."}, status=status.HTTP_400_BAD_REQUEST
            )

        # Validate and create product costs
        serializer = ProductCostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(product=product)
            # Return the updated product with costs
            product_serializer = ProductDetailSerializer(product)
            return Response(product_serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(
        summary="Update product costs",
        description="Update the cost information for a product that already has product costs.",
        request=ProductCostSerializer,
        responses={
            200: OpenApiResponse(response=ProductDetailSerializer, description="Product with updated costs"),
            400: OpenApiResponse(description="Invalid request data"),
            404: OpenApiResponse(description="Product not found or has no associated costs"),
        },
        examples=[
            OpenApiExample(
                name="Update Product Cost Example",
                value={
                    "product_cost": 950,
                    "confirmation_fees": 120,
                    "ads_cost": 2200,
                },
                request_only=True,
                summary="Example of updating specific cost fields",
            ),
        ],
    )
    @action(detail=True, methods=["patch"], url_path="update-costs")
    def update_product_costs(self, request, pk=None):
        """
        Update the cost information for a product.

        Only fields included in the request will be updated.

        Request body:
            product_cost (decimal, optional): Base cost of the product
            confirmation_fees (decimal, optional): Fees related to confirming product orders
            packaging_fees (decimal, optional): Fees related to packaging the product
            return_cost (decimal, optional): Costs associated with product returns
            ads_cost (decimal, optional): Advertising costs for the product

        Returns:
            200 OK: Product with updated costs
            400 Bad Request: If validation fails
            404 Not Found: If product not found or has no associated costs
        """
        product = self.get_object()

        # Check if product has costs
        if not hasattr(product, "product_cost"):
            return Response(
                {"detail": "This product has no associated costs to update."}, status=status.HTTP_404_NOT_FOUND
            )

        # Validate and update product costs
        serializer = ProductCostSerializer(product.product_cost, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            # Return the updated product with costs
            product_serializer = ProductDetailSerializer(product)
            return Response(product_serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(
        summary="Get product details",
        description="Get detailed information about a specific product, including product costs if available.",
        responses={
            200: OpenApiResponse(response=ProductDetailSerializer, description="Detailed product information"),
            404: OpenApiResponse(description="Product not found"),
        },
    )
    def retrieve(self, request, *args, **kwargs):
        """
        Get detailed information about a specific product.

        Returns:
            200 OK: Detailed product information including product costs if available
            404 Not Found: If product not found
        """
        return super().retrieve(request, *args, **kwargs)
