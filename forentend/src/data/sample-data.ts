
// Sample financial data for demonstration
export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
};

export type Forecast = {
  month: string;
  predictedIncome: number;
  predictedExpenses: number;
  predictedSavings: number;
};

export type Suggestion = {
  id: string;
  title: string;
  description: string;
  impact: number; // Positive number for savings
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
};

export const sampleTransactions: Transaction[] = [
  {
    id: '1',
    date: '2025-04-01',
    description: 'Salary',
    amount: 5000,
    category: 'Income',
    type: 'income'
  },
  {
    id: '2',
    date: '2025-04-02',
    description: 'Rent',
    amount: -1500,
    category: 'Housing',
    type: 'expense'
  },
  {
    id: '3',
    date: '2025-04-03',
    description: 'Grocery Shopping',
    amount: -200,
    category: 'Food',
    type: 'expense'
  },
  {
    id: '4',
    date: '2025-04-05',
    description: 'Freelance Work',
    amount: 800,
    category: 'Income',
    type: 'income'
  },
  {
    id: '5',
    date: '2025-04-07',
    description: 'Utilities',
    amount: -150,
    category: 'Bills',
    type: 'expense'
  },
  {
    id: '6',
    date: '2025-04-10',
    description: 'Restaurant Dinner',
    amount: -85,
    category: 'Food',
    type: 'expense'
  },
  {
    id: '7',
    date: '2025-04-15',
    description: 'Bonus',
    amount: 1000,
    category: 'Income',
    type: 'income'
  },
  {
    id: '8',
    date: '2025-04-18',
    description: 'Gas',
    amount: -60,
    category: 'Transportation',
    type: 'expense'
  }
];

export const sampleForecasts: Forecast[] = [
  { month: 'May', predictedIncome: 6000, predictedExpenses: 4200, predictedSavings: 1800 },
  { month: 'June', predictedIncome: 6200, predictedExpenses: 4300, predictedSavings: 1900 },
  { month: 'July', predictedIncome: 6100, predictedExpenses: 4150, predictedSavings: 1950 },
  { month: 'August', predictedIncome: 6500, predictedExpenses: 4400, predictedSavings: 2100 },
  { month: 'September', predictedIncome: 6300, predictedExpenses: 4350, predictedSavings: 1950 },
  { month: 'October', predictedIncome: 6400, predictedExpenses: 4500, predictedSavings: 1900 }
];

export const sampleSuggestions: Suggestion[] = [
  {
    id: '1',
    title: 'Reduce Dining Out',
    description: 'Your restaurant expenses are 25% higher than last month. Consider cooking at home more often to save approximately $200 monthly.',
    impact: 200,
    category: 'Food',
    difficulty: 'medium'
  },
  {
    id: '2',
    title: 'Streaming Service Optimization',
    description: 'You are subscribed to multiple streaming services. Consolidating to just 2 services could save you $35 monthly.',
    impact: 35,
    category: 'Entertainment',
    difficulty: 'easy'
  },
  {
    id: '3',
    title: 'Energy Efficiency',
    description: 'Your utility bills are trending upward. Installing a programmable thermostat could reduce these costs by 15%, saving approximately $45 monthly.',
    impact: 45,
    category: 'Bills',
    difficulty: 'medium'
  },
  {
    id: '4',
    title: 'Refinance Loan',
    description: 'Current interest rates are favorable. Refinancing your loan could save you $120 monthly in interest payments.',
    impact: 120,
    category: 'Loans',
    difficulty: 'hard'
  }
];

export const financialSummary = {
  currentMonth: {
    income: 6800,
    expenses: 1995,
    savings: 4805,
    savingsRate: 70.66
  },
  previousMonth: {
    income: 6500,
    expenses: 2300,
    savings: 4200,
    savingsRate: 64.62
  },
  ytd: {
    income: 27200,
    expenses: 8790,
    savings: 18410,
    savingsRate: 67.68
  }
};

export const expenseBreakdown = {
  Housing: 1500,
  Food: 285,
  Bills: 150,
  Transportation: 60,
  Entertainment: 0,
  Other: 0
};
