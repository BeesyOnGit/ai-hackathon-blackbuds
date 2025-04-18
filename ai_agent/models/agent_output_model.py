from pydantic import BaseModel, Field
from typing import List, TypedDict
from datetime import datetime

class OrderDetail(BaseModel):
    price: float
    quantity: int


class CalculationInputs(BaseModel):
    selling_price: float
    total_units_sold: int
    total_units_returned: int
    product_cost_per_unit: float
    packaging_cost_per_unit: float
    confirmation_fees_per_unit: float
    marketing_cost_per_unit: float
    return_cost_per_unit: float
    fixed_cost_total: float
    order_details: List[OrderDetail]


class CalculationResults(BaseModel):
    total_revenue: float
    total_costs: float
    total_profit: float
    profit_margin: float
    fixed_cost_per_unit: float
    return_rate: float


class SimplifiedAnalysisReport(BaseModel):
    
    calculation_inputs: CalculationInputs
    calculation_results: CalculationResults
    
    # Insights sections 
    margin_insights: List[str]
    cost_insights: List[str]
    recommendation_insights: List[str]
    


class FinalOutput(TypedDict):
    report : SimplifiedAnalysisReport
    flag : str