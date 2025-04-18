from rest_framework import serializers

from .models import DeliveredOrder, Product, ProductCost


class DeliveredOrderSerializer(serializers.ModelSerializer):
    """
    Serializer for the DeliveredOrder model.

    This serializer handles the representation of order history data for products,
    including price, quantity, discount status, and creation timestamp.
    """

    class Meta:
        model = DeliveredOrder
        fields = ["price", "quantity", "discount", "created_at"]


class ProductCostSerializer(serializers.ModelSerializer):
    """
    Serializer for the ProductCost model.

    This serializer handles the representation of product cost data,
    including various cost components like base product cost, fees,
    and marketing expenses.
    """

    class Meta:
        model = ProductCost
        fields = [
            "id",
            "product_cost",
            "confirmation_fees",
            "packaging_fees",
            "return_cost",
            "ads_cost",
            "created_at",
            "updated_at",
        ]


class ProductSerializer(serializers.ModelSerializer):
    """
    Serializer for the Product model.

    This serializer provides a representation of product data including basic
    product information, sales history, and a flag indicating whether the
    product has associated cost data.

    The has_product_costs field is a read-only boolean that indicates whether
    the product has associated cost information.

    The delivered_orders field provides a nested representation of all order
    history associated with the product.
    """

    has_product_costs = serializers.BooleanField(read_only=True)
    delivered_orders = DeliveredOrderSerializer(source="delivered_orders_list", many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "product_name",
            "product_category",
            "product_image",
            "product_selling_price",
            "product_description",
            "total_returns",
            "has_product_costs",
            "delivered_orders",
            "created_at",
            "updated_at",
        ]


class ProductDetailSerializer(ProductSerializer):
    """
    Detailed serializer for the Product model.

    This serializer extends the base ProductSerializer to include the
    product's cost information when available. This is typically used
    for detailed single product views rather than list views.

    The product_cost field provides a nested representation of the
    associated ProductCost object, if one exists.
    """

    product_cost = ProductCostSerializer(read_only=True)

    class Meta(ProductSerializer.Meta):
        fields = ProductSerializer.Meta.fields + ["product_cost"]
