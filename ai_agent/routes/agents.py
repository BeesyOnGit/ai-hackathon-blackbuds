from fastapi import APIRouter, Request
from fastapi.encoders import jsonable_encoder
from ai_agent.runners.agents_runners import profit_recomm_forcast_agent_run
from ai_agent.runners.agents_runners import tracking_costs_calculating_margin_agent_run
import json

router = APIRouter()


@router.post("/agents/profit-margin-recommendation-forcast-agent")
async def profit_margin_recomm_forcast_agent(request: Request):
    
    data = await request.json()
    analysis_report = data.get("report")

    if not analysis_report:
        return {"status": "ERROR", "message": "Missing 'report' in request body."}

    result = await profit_recomm_forcast_agent_run(analysis_report)

    result_json = jsonable_encoder(result)
    
    return {"status": "OK", "data": result_json}


@router.post("/agents/profit-margin-analysis")
async def profit_margin_analysis_agent(request: Request):
    try:

        data= await request.json()
        financial_data = data.get("financial_data")

        if not financial_data:
            return {"status": "ERROR", "message" : "Missing 'financial data' in request body."}
        
        financial_data_json_str = json.dumps(financial_data)
        
        
        result = await tracking_costs_calculating_margin_agent_run(financial_data_json_str)

        return {"status" : "OK", "data": result}
    
    except Exception as e:
        return {"status": "ERROR", "message": str(e)}
