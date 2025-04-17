from agents import Runner
from ai_agent.ai_agents.profit_margin_recommendation_forcast_agent import profit_margin_recommendation_forcast_agent




async def profit_recomm_forcast_agent_run(report: str):
    result = await Runner.run(profit_margin_recommendation_forcast_agent, report)

    return result.final_output