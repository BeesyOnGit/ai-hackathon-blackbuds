
import { Transaction, Suggestion } from "@/data/sample-data";
import { getCategoryBreakdown } from "./financial-calculations";

/**
 * Generate intelligent financial suggestions based on transaction history
 */
export function generateSuggestions(
  transactions: Transaction[],
  previousMonthTransactions: Transaction[] = []
): Suggestion[] {
  const suggestions: Suggestion[] = [];
  let suggestionId = 1;
  
  // Get category breakdowns
  const currentBreakdown = getCategoryBreakdown(transactions);
  const previousBreakdown = getCategoryBreakdown(previousMonthTransactions);
  
  // Analyze spending patterns
  Object.entries(currentBreakdown).forEach(([category, amount]) => {
    const previousAmount = previousBreakdown[category] || 0;
    
    // Look for categories with increased spending
    if (amount > previousAmount && previousAmount > 0) {
      const percentIncrease = ((amount - previousAmount) / previousAmount) * 100;
      
      if (percentIncrease > 15) {
        suggestions.push({
          id: String(suggestionId++),
          title: `Reduce ${category} Spending`,
          description: `Your ${category} expenses have increased by ${percentIncrease.toFixed(0)}% compared to last month. Consider reviewing your spending in this category.`,
          impact: Math.round(amount - previousAmount),
          category,
          difficulty: percentIncrease > 30 ? 'hard' : 'medium'
        });
      }
    }
  });
  
  // Check for recurring subscriptions
  const potentialSubscriptions = transactions.filter(
    t => t.type === 'expense' && Math.abs(t.amount) < 50 && Math.abs(t.amount) > 5
  );
  
  if (potentialSubscriptions.length >= 3) {
    suggestions.push({
      id: String(suggestionId++),
      title: 'Review Subscriptions',
      description: 'You appear to have multiple small recurring charges. Review your subscriptions and consider canceling unused services.',
      impact: Math.round(potentialSubscriptions.reduce((sum, t) => sum + Math.abs(t.amount), 0) * 0.3),
      category: 'Subscriptions',
      difficulty: 'easy'
    });
  }
  
  // Check food expenses vs. income ratio
  const foodExpenses = transactions
    .filter(t => t.category.toLowerCase().includes('food') && t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  if (foodExpenses > totalIncome * 0.2) {
    suggestions.push({
      id: String(suggestionId++),
      title: 'Optimize Food Budget',
      description: 'Your food expenses are more than 20% of your income. Consider meal planning and grocery shopping with a list to reduce costs.',
      impact: Math.round(foodExpenses * 0.2),
      category: 'Food',
      difficulty: 'medium'
    });
  }

  // Add emergency fund suggestion if savings are low
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
  const monthlySavings = totalIncome - totalExpenses;
  
  if (monthlySavings < totalExpenses * 0.1) {
    suggestions.push({
      id: String(suggestionId++),
      title: 'Build Emergency Fund',
      description: 'Your current savings rate is low. Aim to save at least 10% of your income for emergencies.',
      impact: Math.round(totalExpenses * 0.1),
      category: 'Savings',
      difficulty: 'hard'
    });
  }
  
  return suggestions;
}

/**
 * Sort suggestions by potential impact (highest first)
 */
export function sortSuggestionsByImpact(suggestions: Suggestion[]): Suggestion[] {
  return [...suggestions].sort((a, b) => b.impact - a.impact);
}

/**
 * Filter suggestions by difficulty level
 */
export function filterSuggestionsByDifficulty(
  suggestions: Suggestion[],
  difficulty: 'easy' | 'medium' | 'hard'
): Suggestion[] {
  return suggestions.filter(s => s.difficulty === difficulty);
}
