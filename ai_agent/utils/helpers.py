def format_insights(insights):
    return "\n".join(f"- {insight}" for insight in insights)

def format_simplified_analysis_report(report):
    inputs = report.calculation_inputs
    results = report.calculation_results

    report_str = f"""
=== Simplified Analysis Report ===

-- Calculation Inputs --
Selling Price: {inputs.selling_price} DA
Total Units Sold: {inputs.total_units_sold}
Total Units Returned: {inputs.total_units_returned}
Product Cost per Unit: {inputs.product_cost_per_unit} DA
Packaging Cost per Unit: {inputs.packaging_cost_per_unit} DA
Confirmation Fees per Unit: {inputs.confirmation_fees_per_unit} DA
Marketing Cost per Unit: {inputs.marketing_cost_per_unit} DA
Return Cost per Unit: {inputs.return_cost_per_unit} DA
Fixed Cost Total: {inputs.fixed_cost_total} DA

-- Calculation Results --
Total Revenue: {results.total_revenue} DA
Total Costs: {results.total_costs} DA
Total Profit: {results.total_profit} DA
Profit Margin: {results.profit_margin}%
Fixed Cost per Unit: {results.fixed_cost_per_unit} DA
Return Rate: {results.return_rate}%

-- Margin Insights --
{format_insights(report.margin_insights)}

-- Cost Insights --
{format_insights(report.cost_insights)}

-- Recommendation Insights --
{format_insights(report.recommendation_insights)}
"""
    return report_str.strip()


