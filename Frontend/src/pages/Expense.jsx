import { useState, useEffect } from "react";
import { getExpenses, addExpense, deleteExpense, updateExpense } from "../services/expenseService";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getExpenses();
        console.log("Expenses API response:", data);
        setExpenses(data);
      }
      catch {
        setError("Failed to fetch expenses.");
      }
      finally {
        setLoading(false);
      }
    }
    fetchExpenses();
  }, []);
  const handleAddExpense = async (expense) => {
    try {
      const newExpense = await addExpense(expense);
      const savedExpense = Array.isArray(newExpense)
        ? newExpense[0]
        : newExpense;
      setExpenses(prevExpenses => [...prevExpenses, savedExpense]);
    }
    catch {
      setError("Failed to add expense.");
    }
  }
  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
  };

  const handleUpdateExpense = async (id, updatedData) => {
    setError("");

    try {
      const updatedExpense = await updateExpense(id, updatedData);

      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === id
            ? updatedExpense
            : expense
        )
      );

      setEditingExpense(null);
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to update expense."
      );
    }
  };
  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
    }
    catch {
      setError("Failed to delete expense.");
    }
  }
  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Expenses
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage and track your daily spending.
        </p>
      </div>

      {/* Expense Form and List */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        {/* Form */}
        <div className="xl:col-span-1">
          <ExpenseForm
            onAddExpense={handleAddExpense}
            editingExpense={editingExpense}
            onUpdateExpense={handleUpdateExpense}
            onCancelEdit={() => setEditingExpense(null)}
          />
        </div>

        {/* Expense List */}
        <div className="xl:col-span-2 min-w-0">
          <ExpenseList
            expenses={expenses} onDeleteExpense={handleDeleteExpense}
            loading={loading}
            error={error}
            onEditExpense={handleEditExpense}
          />
        </div>
      </div>
    </div>
  );
};

export default Expenses;