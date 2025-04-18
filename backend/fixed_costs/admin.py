from django.contrib import admin

from .models import FixedCosts


@admin.register(FixedCosts)
class FixedCostsAdmin(admin.ModelAdmin):
    list_display = ("user", "rental", "employees", "communication", "dev", "transportation", "other", "updated_at")
    list_filter = ("updated_at",)
    search_fields = ("user__username", "user__email")
    readonly_fields = ("created_at", "updated_at")
