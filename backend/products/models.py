import json

from django.conf import settings
from django.db import models


class ProductCost(models.Model):
    """
    Model representing the cost breakdown for a product.

    Each product can have only one associated ProductCost object that details
    various cost components related to the product, such as base cost,
    fees, and marketing expenses.

    Attributes:
        product (ForeignKey): One-to-one relationship with the Product model
        product_cost (DecimalField): Base cost of acquiring or producing the product
        confirmation_fees (DecimalField): Fees related to confirming product orders
        packaging_fees (DecimalField): Costs for packaging materials and labor
        return_cost (DecimalField): Average cost of handling product returns
        ads_cost (DecimalField): Costs related to marketing and advertising the product
        created_at (DateTimeField): When the record was created
        updated_at (DateTimeField): When the record was last updated
    """

    product = models.OneToOneField(
        "Product",
        on_delete=models.CASCADE,
        related_name="product_cost",
        null=True,
        help_text="The product associated with these costs",
    )
    product_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0, help_text="Base cost of the product")
    confirmation_fees = models.DecimalField(
        max_digits=10, decimal_places=2, default=0, help_text="Fees related to confirming product orders"
    )
    packaging_fees = models.DecimalField(
        max_digits=10, decimal_places=2, default=0, help_text="Fees related to packaging the product"
    )
    return_cost = models.DecimalField(
        max_digits=10, decimal_places=2, default=0, help_text="Costs associated with product returns"
    )
    ads_cost = models.DecimalField(
        max_digits=10, decimal_places=2, default=0, help_text="Advertising costs for the product"
    )
    created_at = models.DateTimeField(auto_now_add=True, help_text="Timestamp when the record was created")
    updated_at = models.DateTimeField(auto_now=True, help_text="Timestamp when the record was last updated")

    class Meta:
        verbose_name = "Product Cost"
        verbose_name_plural = "Product Costs"

    def __str__(self):
        return f"Costs for {self.product.product_name}" if self.product else "ProductCost (no product)"

    def get_total_cost(self):
        """
        Calculate the total cost of the product.

        This method sums all cost components to provide the total cost
        associated with the product.

        Returns:
            Decimal: The sum of all cost components
        """
        return self.product_cost + self.confirmation_fees + self.packaging_fees + self.return_cost + self.ads_cost


class DeliveredOrder(models.Model):
    """
    Model representing a delivered order for a product.

    This model tracks individual order information for products including
    price, quantity, and whether a discount was applied. This helps in
    analyzing sales history and patterns.

    Attributes:
        price (DecimalField): The price at which the product was sold
        quantity (PositiveIntegerField): Number of units sold in this order
        discount (BooleanField): Whether a discount was applied
        product (ForeignKey): Relationship to the Product model
        created_at (DateTimeField): When the order was recorded
    """

    price = models.DecimalField(max_digits=10, decimal_places=2, help_text="Price at which the product was sold")
    quantity = models.PositiveIntegerField(help_text="Quantity of products in this order")
    discount = models.BooleanField(default=False, help_text="Whether a discount was applied to this order")
    product = models.ForeignKey(
        "Product",
        on_delete=models.CASCADE,
        related_name="delivered_orders_list",
        help_text="The product this order is associated with",
    )
    created_at = models.DateTimeField(auto_now_add=True, help_text="Timestamp when the order was recorded")

    class Meta:
        verbose_name = "Delivered Order"
        verbose_name_plural = "Delivered Orders"
        ordering = ["-created_at"]

    def __str__(self):
        return f"Order of {self.quantity} units at {self.price} each"

    def get_total_price(self):
        """
        Calculate the total price for this order.

        Returns:
            Decimal: The total price (price per unit * quantity)
        """
        return self.price * self.quantity


class Product(models.Model):
    """
    Model representing a product with its details and sales history.

    This is the central model that stores product information, including name,
    category, pricing, and return statistics. It also maintains relationships
    to delivered orders and product costs.

    Attributes:
        product_name (CharField): Name of the product
        product_category (CharField): Category the product belongs to
        product_image (CharField): Path to the product image
        product_selling_price (DecimalField): Current selling price
        product_description (TextField): Detailed description of the product
        total_returns (PositiveIntegerField): Total number of product returns
        user (ForeignKey): The user who owns/manages this product
        created_at (DateTimeField): When the product was created
        updated_at (DateTimeField): When the product was last updated
    """

    product_name = models.CharField(max_length=255, help_text="Name of the product")
    product_category = models.CharField(max_length=100, help_text="Category of the product")
    product_image = models.CharField(max_length=255, help_text="Path to the product image")
    product_selling_price = models.DecimalField(
        max_digits=10, decimal_places=2, help_text="Current selling price of the product"
    )
    product_description = models.TextField(help_text="Detailed description of the product")
    total_returns = models.PositiveIntegerField(default=0, help_text="Total number of product returns")
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="products",
        help_text="User who owns this product",
    )
    created_at = models.DateTimeField(auto_now_add=True, help_text="Timestamp when the product was created")
    updated_at = models.DateTimeField(auto_now=True, help_text="Timestamp when the product was last updated")

    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"
        ordering = ["-updated_at"]

    def __str__(self):
        return self.product_name

    @property
    def has_product_costs(self):
        """
        Check if the product has associated product costs.

        This property is useful for filtering products based on whether they
        have cost information available or not.

        Returns:
            bool: True if the product has associated product costs, False otherwise
        """
        return hasattr(self, "product_cost")

    def add_delivered_order(self, price, quantity, discount=False):
        """
        Helper method to add a delivered order to this product.

        This convenience method creates a new DeliveredOrder record
        associated with this product.

        Args:
            price (Decimal): The price at which the product was sold
            quantity (int): Number of units sold
            discount (bool, optional): Whether a discount was applied. Defaults to False.

        Returns:
            DeliveredOrder: The newly created delivered order instance
        """
        return DeliveredOrder.objects.create(product=self, price=price, quantity=quantity, discount=discount)
