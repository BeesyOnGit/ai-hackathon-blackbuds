
/**
 * AI Engine for financial analysis and recommendations
 * 
 * This module provides simulated AI functionality for the financial assistant.
 * In a production app, this would connect to a real AI service.
 */

import { Transaction } from "@/data/sample-data";
import { calculateTotalIncome, calculateTotalExpenses, formatCurrency } from "./financial-calculations";
import { generateSuggestions } from "./suggestions";

/**
 * Generate a personalized financial insight based on transaction data
 */
export function generateInsight(transactions: Transaction[]): string {
  const totalIncome = calculateTotalIncome(transactions);
  const totalExpenses = calculateTotalExpenses(transactions);
  const savingsRate = ((totalIncome - totalExpenses) / totalIncome) * 100;
  
  // Simple rule-based insights (would be AI-driven in production)
  if (savingsRate > 50) {
    return `Your savings rate of ${savingsRate.toFixed(1)}% is excellent. Consider investing some of your savings for long-term growth.`;
  } else if (savingsRate > 20) {
    return `Your savings rate of ${savingsRate.toFixed(1)}% is good. You're on track to meet your financial goals.`;
  } else if (savingsRate > 10) {
    return `Your savings rate of ${savingsRate.toFixed(1)}% is modest. Look for ways to reduce expenses or increase income.`;
  } else {
    return `Your savings rate of ${savingsRate.toFixed(1)}% is low. Review your budget to find opportunities to save more.`;
  }
}

/**
 * Analyze spending patterns to find areas of improvement
 */
export function analyzeSpendingPatterns(transactions: Transaction[]): { category: string; amount: number; trend: 'increasing' | 'decreasing' | 'stable' }[] {
  // Group transactions by category
  const categorizedExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      const category = transaction.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(transaction);
      return acc;
    }, {} as Record<string, Transaction[]>);
  
  // Calculate total and determine trend for each category
  return Object.entries(categorizedExpenses).map(([category, categoryTransactions]) => {
    const amount = categoryTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    // Simulate trend analysis (would use real data in production)
    const randomTrend = Math.random();
    let trend: 'increasing' | 'decreasing' | 'stable';
    
    if (randomTrend > 0.6) {
      trend = 'increasing';
    } else if (randomTrend > 0.3) {
      trend = 'decreasing';
    } else {
      trend = 'stable';
    }
    
    return { category, amount, trend };
  });
}

/**
 * Generate personalized forecast accuracy assessment
 */
export function assessForecastAccuracy(historicalTransactions: Transaction[]): string {
  const dataPoints = historicalTransactions.length;
  
  if (dataPoints > 50) {
    return "High confidence: Your forecasts are based on substantial historical data.";
  } else if (dataPoints > 20) {
    return "Medium confidence: Your forecasts have a reasonable data foundation.";
  } else {
    return "Low confidence: More transaction history will improve forecast accuracy.";
  }
}

/**
 * Analyze query and provide a contextually relevant response
 */
export function analyzeQuery(query: string, transactions: Transaction[]): string {
  const lowerQuery = query.toLowerCase();
  
  // Simple intent matching (would use NLP in production)
  if (lowerQuery.includes('save') || lowerQuery.includes('saving')) {
    const suggestions = generateSuggestions(transactions);
    if (suggestions.length > 0) {
      return `Here's a saving tip: ${suggestions[0].description}`;
    }
    return "To save more, consider reviewing your highest expense categories and find areas to reduce spending.";
  }
  
  if (lowerQuery.includes('invest') || lowerQuery.includes('investing')) {
    return "Based on your financial profile, a diversified portfolio with 70% index funds, 20% bonds, and 10% cash reserves might align with your goals.";
  }
  
  if (lowerQuery.includes('budget')) {
    const income = calculateTotalIncome(transactions);
    const expenses = calculateTotalExpenses(transactions);
    return `Your current monthly budget shows ${formatCurrency(income)} income and ${formatCurrency(expenses)} expenses. Housing is your largest expense category at 42% of total expenses.`;
  }
  
  if (lowerQuery.includes('trend') || lowerQuery.includes('forecast')) {
    return "Based on your historical data, I project your income will increase by approximately 5% over the next six months, while expenses remain stable.";
  }
  
  // Default response
  return "I can help you analyze your finances, identify savings opportunities, or create budget forecasts. What specific aspect are you interested in?";
}
