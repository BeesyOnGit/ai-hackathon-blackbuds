import json
from typing import Dict, List
from agents import function_tool
from pydantic import BaseModel

# Define a model for order details
class OrderDetail(BaseModel):
    price: float
    quantity: float

@function_tool
def calculate_profit_marginn(
    selling_price: float,
    total_units_sold: int,
    total_units_returned: int,
    product_cost_per_unit: float,
    packaging_cost_per_unit: float,
    confirmation_fees_per_unit: float,
    marketing_cost_per_unit: float,
    return_cost_per_unit: float,
    fixed_cost_total: float,
    order_details: List[OrderDetail],
    
) -> str:
    """
    Calculates detailed profit margin based on unit economics, return costs, and fixed/marketing costs.
    
    Parameters:
    - selling_price: Average price after discounts.
    - total_units_sold: Total quantity sold (before returns).
    - total_units_returned: Quantity returned.
    - product_cost_per_unit: Cost per unit of product.
    - packaging_cost_per_unit: Packaging cost per unit.
    - confirmation_fees_per_unit: Confirmation/transaction fees per unit.
    - marketing_cost_per_unit: Marketing cost per unit.
    - fixed_cost_total: Total fixed cost (allocated once).
    - return_cost_per_unit: Return handling cost per unit returned.
    - order_details: List of OrderDetail objects with price and quantity for each order.

    Returns:
    - JSON string with input parameters, total_revenue, total_costs, total_profit, and profit_margin.
    """
    # Revenue
    total_units_sold_and_returned = total_units_sold + total_units_returned
    total_revenue = sum(order.price * order.quantity for order in order_details)

    # Total variable cost per unit
    unit_variable_cost = (
        product_cost_per_unit +
        packaging_cost_per_unit +
        confirmation_fees_per_unit +
        marketing_cost_per_unit
    )

    # Total costs
    total_product_cost = unit_variable_cost * total_units_sold_and_returned
    total_return_cost = return_cost_per_unit * total_units_returned
    total_cost = (
        total_product_cost +
        fixed_cost_total +
        total_return_cost
    )

    # Profit & Margin
    total_profit = total_revenue - total_cost
    profit_margin = 100 * (total_profit / total_revenue) if total_revenue > 0 else 0

    # Calculate fixed cost allocation per unit
    fixed_cost_per_unit = fixed_cost_total / total_units_sold if total_units_sold > 0 else 0
    
    # Convert order details to dict for JSON serialization
    order_details_dict = [{"price": order.price, "quantity": order.quantity} for order in order_details]
    
    # Return inputs and calculated values
    return json.dumps({

        "inputs": {
            "selling_price": selling_price,
            "total_units_sold": total_units_sold,
            "total_units_returned": total_units_returned,
            "product_cost_per_unit": product_cost_per_unit,
            "packaging_cost_per_unit": packaging_cost_per_unit,
            "confirmation_fees_per_unit": confirmation_fees_per_unit,
            "marketing_cost_per_unit": marketing_cost_per_unit,
            "return_cost_per_unit": return_cost_per_unit,
            "fixed_cost_total": fixed_cost_total,
            "order_details": order_details_dict
        },
        # Calculated results
        "total_revenue": total_revenue,
        "total_costs": total_cost,
        "total_profit": total_profit,
        "profit_margin": profit_margin,
        "fixed_cost_per_unit": fixed_cost_per_unit,
        "return_rate": 100 * (total_units_returned / total_units_sold_and_returned)  if total_units_sold > 0 else 0
    })

