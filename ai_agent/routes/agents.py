from fastapi import APIRouter, Request
from ai_agent.runners.agents_runners import profit_recomm_forcast_agent_run

router = APIRouter()


@router.post("/agents/profit-margin-recommendation-forcast-agent")
async def profit_margin_recomm_forcast_agent(request: Request):
    
    data = await request.json()
    analysis_report = data.get("report")

    if not analysis_report:
        return {"status": "ERROR", "message": "Missing 'report' in request body."}

    result = await profit_recomm_forcast_agent_run(analysis_report)
    return {"status": "OK", "data": result}