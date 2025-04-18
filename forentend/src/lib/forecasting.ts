
import { Transaction, Forecast } from "@/data/sample-data";

/**
 * Calculate simple linear regression for forecasting
 */
function linearRegression(
  x: number[],
  y: number[]
): { slope: number; intercept: number } {
  const n = x.length;
  
  // Calculate means
  const xMean = x.reduce((sum, val) => sum + val, 0) / n;
  const yMean = y.reduce((sum, val) => sum + val, 0) / n;
  
  // Calculate slope and intercept
  let numerator = 0;
  let denominator = 0;
  
  for (let i = 0; i < n; i++) {
    numerator += (x[i] - xMean) * (y[i] - yMean);
    denominator += (x[i] - xMean) ** 2;
  }
  
  const slope = denominator !== 0 ? numerator / denominator : 0;
  const intercept = yMean - slope * xMean;
  
  return { slope, intercept };
}

/**
 * Predict future value based on regression model
 */
function predict(model: { slope: number; intercept: number }, x: number): number {
  return model.slope * x + model.intercept;
}

/**
 * Group transactions by month for time-series analysis
 */
export function groupTransactionsByMonth(
  transactions: Transaction[]
): Record<string, { income: number; expenses: number; savings: number }> {
  return transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!acc[month]) {
      acc[month] = { income: 0, expenses: 0, savings: 0 };
    }
    
    if (transaction.type === 'income') {
      acc[month].income += transaction.amount;
    } else {
      acc[month].expenses += Math.abs(transaction.amount);
    }
    
    acc[month].savings = acc[month].income - acc[month].expenses;
    
    return acc;
  }, {} as Record<string, { income: number; expenses: number; savings: number }>);
}

/**
 * Generate forecasts for future months based on historical data
 */
export function generateForecasts(
  transactions: Transaction[],
  months: number = 6
): Forecast[] {
  // Group transactions by month
  const monthlyData = groupTransactionsByMonth(transactions);
  
  // Convert to arrays for regression
  const monthIndices: number[] = [];
  const incomeValues: number[] = [];
  const expenseValues: number[] = [];
  
  Object.entries(monthlyData).forEach(([_, data], index) => {
    monthIndices.push(index);
    incomeValues.push(data.income);
    expenseValues.push(data.expenses);
  });
  
  // Calculate regression models
  const incomeModel = linearRegression(monthIndices, incomeValues);
  const expenseModel = linearRegression(monthIndices, expenseValues);
  
  // Generate forecasts for future months
  const forecasts: Forecast[] = [];
  const currentDate = new Date();
  
  for (let i = 1; i <= months; i++) {
    const forecastDate = new Date(currentDate);
    forecastDate.setMonth(currentDate.getMonth() + i);
    
    const monthName = forecastDate.toLocaleString('default', { month: 'long' });
    const predictedIncome = Math.max(0, predict(incomeModel, monthIndices.length + i - 1));
    const predictedExpenses = Math.max(0, predict(expenseModel, monthIndices.length + i - 1));
    const predictedSavings = predictedIncome - predictedExpenses;
    
    forecasts.push({
      month: monthName,
      predictedIncome: Math.round(predictedIncome),
      predictedExpenses: Math.round(predictedExpenses),
      predictedSavings: Math.round(predictedSavings)
    });
  }
  
  return forecasts;
}

/**
 * Calculate confidence level for forecast (simplified version)
 */
export function calculateForecastConfidence(transactions: Transaction[]): number {
  // In a real app, this would be more sophisticated
  // For demo purposes, we'll base it on the amount of data available
  const monthlyData = groupTransactionsByMonth(transactions);
  const monthsOfData = Object.keys(monthlyData).length;
  
  // More months of data = higher confidence, up to 90%
  return Math.min(0.5 + (monthsOfData * 0.1), 0.9);
}
