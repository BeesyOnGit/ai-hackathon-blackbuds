def pretty_print_analysis(final_output):
    report = final_output["report"]
    flag = final_output["flag"]

    # Display calculation inputs
    inputs = report.calculation_inputs
    print("\n Calculation Inputs:")
    print(f"  - Selling Price: {inputs.selling_price:.2f}DA")
    print(f"  - Units Sold: {inputs.total_units_sold}")
    print(f"  - Units Returned: {inputs.total_units_returned}")
    print(f"  - Product Cost Per Unit: {inputs.product_cost_per_unit:.2f}DA")
    print(f"  - Marketing Cost Per Unit: {inputs.marketing_cost_per_unit:.2f}DA")
    print(f"  - Packaging Cost Per Unit: {inputs.packaging_cost_per_unit:.2f}DA")
    print(f"  - Confirmation Fees Per Unit: {inputs.confirmation_fees_per_unit:.2f}DA")
    print(f"  - Return Cost Per Unit: {inputs.return_cost_per_unit:.2f}DA")
    print(f"  - Fixed Cost Total: {inputs.fixed_cost_total:.2f}DA")

    print("  - Order Details:")
    for i, order in enumerate(inputs.order_details, 1):
        print(f"    • Order {i}: Price: {order.price:.2f}DA, Quantity: {order.quantity}")

    # Display calculation results
    results = report.calculation_results
    print("\n Calculation Results:")
    print(f"  - Total Revenue: {results.total_revenue:,.2f}DA")
    print(f"  - Total Costs: {results.total_costs:,.2f}DA")
    print(f"  - Total Profit: {results.total_profit:,.2f}DA")
    print(f"  - Profit Margin: {results.profit_margin:.2f}%")
    print(f"  - Fixed Cost Per Unit: {results.fixed_cost_per_unit:.2f}DA")
    print(f"  - Return Rate: {results.return_rate:.2f}%")

    # Display insights
    print("\n Margin Insights:")
    for insight in report.margin_insights:
        print("-", insight)

    print("\n Cost Insights:")
    for insight in report.cost_insights:
        print("-", insight)

    print("\n Recommendations:")
    for rec in report.recommendation_insights:
        print("-", rec)

    print(f"\n🚨 Status: {flag}")