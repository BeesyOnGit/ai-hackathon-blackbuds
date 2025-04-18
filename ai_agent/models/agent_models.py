from pydantic import BaseModel
from typing import List


class KeyFinding(BaseModel):
    description: str

    def to_dict(self):
        return self.model_dump()

class NumericBreakdown(BaseModel):
    type: str
    current_value: float
    proposed_value: float

    def to_dict(self):
        return self.model_dump()

class MarginImpact(BaseModel):
    current: float
    projected: float

    def to_dict(self):
        return self.model_dump()

class Recommendation(BaseModel):
    id: int
    title: str
    action: str
    margin_impact: MarginImpact
    numeric_breakdown: NumericBreakdown
    risk_note: str

    def to_dict(self):
        return self.model_dump()

class ForecastScenario(BaseModel):
    action: str
    forecasted_margin: float

    def to_dict(self):
        return self.model_dump()

class RecommendationOutput(BaseModel):
    key_findings: List[KeyFinding]
    actionable_recommendations: List[Recommendation]
    forecast_scenarios: List[ForecastScenario]
    summary_for_demo: str

    def to_dict(self):
        return self.model_dump()