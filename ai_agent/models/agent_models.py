from pydantic import BaseModel

class KeyFinding(BaseModel):
    description: str

class NumericBreakdown(BaseModel):
    type: str
    current_value: float
    proposed_value: float

class MarginImpact(BaseModel):
    current: float
    projected: float

class Recommendation(BaseModel):
    id: int
    title: str
    action: str
    margin_impact: MarginImpact
    numeric_breakdown: NumericBreakdown
    risk_note: str

class ForecastScenario(BaseModel):
    action: str
    forecasted_margin: float

class Output(BaseModel):
    actionable_recommendations: list[Recommendation]
    forecast_scenarios: list[ForecastScenario]
    summary_for_demo: str