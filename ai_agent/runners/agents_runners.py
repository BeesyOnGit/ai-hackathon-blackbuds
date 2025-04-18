from agents import Runner
from ai_agents.profit_margin_recommendation_forcast_agent import profit_margin_recommendation_forcast_agent
from ai_agents.tracking_costs_calculating_margin_agent import agent

async def profit_recomm_forcast_agent_run(report: str):
    result = await Runner.run(profit_margin_recommendation_forcast_agent, report)



async def tracking_costs_calculating_margin_agent_run(financial_data):
    """
    Run the margin calculation agent with the provided financial data.
    
    Args:
        agent: The margin calculation agent
        financial_data: Dictionary containing financial data structure
        
    Returns:
        The final output from the agent
    """
    result = await Runner.run(
        agent, 
       financial_data
    )
    
    return result.final_output