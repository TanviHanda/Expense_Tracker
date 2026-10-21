import { useEffect, useState } from "react";
import { getExpenses } from "../services/expenseService";
import { getIncomes } from "../services/incomeService";
import { getbudget } from "../services/budgetService";
const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [expenseData, incomeData, budgetData] = await Promise.all([
          getExpenses(),
          getIncomes(),
          getbudget(),
        ]);

        setExpenses(expenseData);
        setIncomes(incomeData);
        setBudgets(budgetData);
      } catch (err) {
        setError("Failed to load dashboard data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const totalIncome = incomes.reduce((total, income) => total + Number(income.amount || 0), 0);

  const totalExpenses = expenses.reduce(
    (total, expense) => total + Number(expense.amount || 0),
    0
  );

  const totalBalance = totalIncome - totalExpenses;

  const totalBudget = budgets.reduce(
    (total, budget) => total + Number(budget.amount || 0),
    0
  );

  const expenseBreakdown = expenses.reduce((acc, expense) => {
    const category = expense.category;
    const amount = Number(expense.amount || 0);

    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  const recentTransactions = [
    ...expenses.map((expense) => ({
      ...expense,
      type: "expense",
      date: expense.expense_date,
    })),
    ...incomes.map((income) => ({
      ...income,
      type: "income",
      date: income.income_Date,
    })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const totalBudgetSpent = totalExpenses;
  const remainingBudget = totalBudget - totalBudgetSpent;

  const budgetUsedPercentage =
    totalBudget > 0
      ? (totalBudgetSpent / totalBudget) * 100
      : 0;

  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Heading */}
      <div>
        <h1 className="text-2xl font-bold">
          Welcome to the Expense Tracker
        </h1>
        <p className="text-gray-500 mt-1">
          Here's your financial overview.
        </p>
      </div>


      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white shadow p-4 rounded-xl">
          <h2 className="font-semibold text-gray-500">Total Balance</h2>
          <p className="text-2xl font-bold mt-2">₹{totalBalance.toLocaleString("en-IN")}</p>
        </div>

        <div className="bg-white shadow p-4 rounded-xl">
          <h2 className="font-semibold text-gray-500">Total Income</h2>
          <p className="text-2xl font-bold mt-2">₹{totalIncome.toLocaleString("en-IN")}</p>
        </div>

        <div className="bg-white shadow p-4 rounded-xl">
          <h2 className="font-semibold text-gray-500">Total Expenses</h2>
          <p className="text-2xl font-bold mt-2">₹{totalExpenses.toLocaleString("en-IN")}</p>
        </div>

        <div className="bg-white shadow p-4 rounded-xl">
          <h2 className="font-semibold text-gray-500">Monthly Budget</h2>
          <p className="text-2xl font-bold mt-2">₹{totalBudget.toLocaleString("en-IN")}</p>
        </div>
      </div>

      {/* Main Dashboard Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Transactions */}
        <div className="bg-white shadow p-5 rounded-xl">
          <h2 className="text-lg font-bold">Recent Transactions</h2>

          <div className="mt-4 space-y-4">
            {recentTransactions.length === 0 ? (
              <p className="text-sm text-gray-500">
                No transactions yet.
              </p>
            ) : (
              recentTransactions.map((transaction) => (
                <div
                  key={`${transaction.type}-${transaction.id}`}
                  className="flex justify-between items-center gap-4"
                >
                  <div>
                    <p className="font-medium">
                      {transaction.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {transaction.type === "income"
                        ? "Income"
                        : transaction.category}
                    </p>
                  </div>

                  <p
                    className={`font-semibold whitespace-nowrap ${transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-500"
                      }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}₹
                    {Number(transaction.amount || 0).toLocaleString("en-IN")}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Budget Overview */}
        <div className="bg-white shadow p-5 rounded-xl">
          <h2 className="text-lg font-bold">Budget Overview</h2>

          <div className="flex justify-between mt-4">
            <p className="text-gray-500">Monthly Budget</p>
            <p className="font-semibold">
              ₹{totalBudget.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="flex justify-between mt-4">
            <div>
              <p className="text-sm text-gray-500">Spent</p>
              <p className="font-semibold">
                ₹{totalBudgetSpent.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">Remaining</p>
              <p className="font-semibold">
                ₹{remainingBudget.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
            <div
              className={`h-2 rounded-full ${budgetUsedPercentage > 100 ? "bg-red-500" : "bg-green-500"
                }`}
              style={{
                width: `${Math.min(budgetUsedPercentage, 100)}%`,
              }}
            />
          </div>

          <div className="flex justify-between mt-2 text-sm">
            <p className="text-green-600">
              {budgetUsedPercentage.toFixed(1)}% used
            </p>
            <p className="text-gray-500">
              {Math.max(100 - budgetUsedPercentage, 0).toFixed(1)}% remaining
            </p>
          </div>






        </div>

        {/* Expense Breakdown */}
        <div className="bg-white shadow p-5 rounded-xl">
          <h2 className="text-lg font-bold">Expense Breakdown</h2>

          <div className="mt-5 space-y-5">
            {Object.entries(expenseBreakdown).length === 0 ? (
              <p className="text-sm text-gray-500">
                No expenses to display yet.
              </p>
            ) : (
              Object.entries(expenseBreakdown).map(([category, amount]) => {
                const percentage =
                  totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0;

                return (
                  <div key={category}>
                    <div className="flex justify-between mb-2 gap-4">
                      <p>{category}</p>
                      <p className="font-semibold">
                        ₹{amount.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Quick Summary */}
        <div className="bg-white shadow p-5 rounded-xl">
          <h2 className="text-lg font-bold">Quick Summary</h2>

          <div className="mt-5 space-y-4">
            <div className="flex justify-between gap-4">
              <p className="text-gray-500">Total Income</p>
              <p className="font-semibold text-green-600">
                ₹{totalIncome.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="flex justify-between gap-4">
              <p className="text-gray-500">Total Expenses</p>
              <p className="font-semibold text-red-500">
                ₹{totalExpenses.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="flex justify-between border-t pt-4">
              <p className="font-medium">Savings</p>
              <p className="font-bold">
                ₹{totalBalance.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;