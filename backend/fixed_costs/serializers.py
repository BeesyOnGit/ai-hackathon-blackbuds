from rest_framework import serializers

from .models import FixedCosts


class FixedCostsSerializer(serializers.ModelSerializer):
    """
    Serializer for the FixedCosts model.

    Handles serialization and deserialization of FixedCosts objects,
    including the computation of the total fixed costs.
    """

    total = serializers.SerializerMethodField(help_text="The sum of all fixed costs categories")

    class Meta:
        model = FixedCosts
        fields = [
            "id",
            "rental",
            "employees",
            "communication",
            "dev",
            "transportation",
            "other",
            "total",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at", "total"]

    def get_total(self, obj):
        """
        Calculate the total fixed costs from all categories

        Args:
            obj: The FixedCosts instance

        Returns:
            float: The total sum of all fixed costs
        """
        return float(obj.get_total())
