
import { Transaction } from "@/data/sample-data";

/**
 * Calculate the total income from transactions
 */
export function calculateTotalIncome(transactions: Transaction[]): number {
  return transactions
    .filter(t => t.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
}

/**
 * Calculate the total expenses from transactions
 */
export function calculateTotalExpenses(transactions: Transaction[]): number {
  return Math.abs(
    transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, transaction) => sum + transaction.amount, 0)
  );
}

/**
 * Calculate net profit (income - expenses)
 */
export function calculateNetProfit(transactions: Transaction[]): number {
  return calculateTotalIncome(transactions) - calculateTotalExpenses(transactions);
}

/**
 * Calculate the savings rate (savings as percentage of income)
 */
export function calculateSavingsRate(transactions: Transaction[]): number {
  const income = calculateTotalIncome(transactions);
  const savings = calculateNetProfit(transactions);
  
  if (income === 0) return 0;
  return (savings / income) * 100;
}

/**
 * Group transactions by category and calculate totals
 */
export function getCategoryBreakdown(transactions: Transaction[]): Record<string, number> {
  const categorized = transactions.reduce((acc, transaction) => {
    const category = transaction.category;
    const amount = Math.abs(transaction.amount);
    
    if (!acc[category]) {
      acc[category] = 0;
    }
    
    acc[category] += transaction.type === 'expense' ? amount : 0;
    
    return acc;
  }, {} as Record<string, number>);
  
  return categorized;
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

/**
 * Format percentage for display
 */
export function formatPercentage(percentage: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(percentage / 100);
}

/**
 * Calculate month-over-month change
 */
export function calculateChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}
