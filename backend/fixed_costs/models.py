from django.conf import settings
from django.db import models


class FixedCosts(models.Model):
    """
    Model representing fixed costs for a user.
    Each user can have only one fixed costs object.

    Fixed costs represent recurring monthly business expenses that remain
    relatively constant regardless of business activity.
    """

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="fixed_costs",
        help_text="The user associated with these fixed costs. One-to-one relationship.",
    )
    rental = models.DecimalField(
        max_digits=10, decimal_places=2, default=0, help_text="Monthly rental expenses in currency units."
    )
    employees = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        help_text="Monthly employee salary and related costs in currency units.",
    )
    communication = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        help_text="Monthly communication expenses (internet, phone, etc.) in currency units.",
    )
    dev = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        help_text="Monthly development and maintenance costs in currency units.",
    )
    transportation = models.DecimalField(
        max_digits=10, decimal_places=2, default=0, help_text="Monthly transportation costs in currency units."
    )
    other = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        help_text="Other monthly fixed expenses not categorized above, in currency units.",
    )
    created_at = models.DateTimeField(auto_now_add=True, help_text="Timestamp when the fixed costs record was created.")
    updated_at = models.DateTimeField(
        auto_now=True, help_text="Timestamp when the fixed costs record was last updated."
    )

    class Meta:
        verbose_name = "Fixed Costs"
        verbose_name_plural = "Fixed Costs"
        ordering = ["-updated_at"]

    def __str__(self):
        return f"{self.user.username}'s Fixed Costs"

    def get_total(self):
        """
        Calculate the total monthly fixed costs

        Returns:
            Decimal: The sum of all fixed cost categories
        """
        return self.rental + self.employees + self.communication + self.dev + self.transportation + self.other
