from django.contrib import admin

from .models import DeliveredOrder, Product, ProductCost


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("product_name", "product_category", "product_selling_price", "total_returns", "has_product_costs")
    list_filter = ("product_category", "created_at")
    search_fields = ("product_name", "product_description", "product_category")
    readonly_fields = ("created_at", "updated_at")


@admin.register(ProductCost)
class ProductCostAdmin(admin.ModelAdmin):
    list_display = ("product", "product_cost", "ads_cost", "get_total_cost")
    search_fields = ("product__product_name",)
    readonly_fields = ("created_at", "updated_at")


@admin.register(DeliveredOrder)
class DeliveredOrderAdmin(admin.ModelAdmin):
    list_display = ("product", "price", "quantity", "discount", "created_at")
    list_filter = ("discount", "created_at")
    search_fields = ("product__product_name",)
    readonly_fields = ("created_at",)
