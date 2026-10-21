import { useEffect, useState } from "react";
import BudgetForm from "../components/BudgetForm";
import BudgetList from "../components/BudgetList";
import { getExpenses } from "../services/expenseService";
import {
  getbudget,
  addBudget,
  updateBudget,
  deleteBudget,
} from "../services/budgetService";
const Budget = () => {
  const [expenses, setExpenses] = useState([]);
  const [budget, setbudget] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingBudget, setEditingBudget] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [budgetData, expenseData] = await Promise.all([
          getbudget(),
          getExpenses(),
        ]);

        setbudget(budgetData);
        setExpenses(expenseData);
      } catch (err) {
        setError(
          err.response?.data?.error || "Failed to fetch budget data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddBudget = async (budget) => {
    setError("");

    try {
      const newBudget = await addBudget(budget);
      setbudget((prev) => [newBudget, ...prev]);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add budget.");
      return false;
    }
  };
  const handleEditBudget = (budget) => {
    setEditingBudget(budget);
  };
  const handleUpdateBudget = async (id, updatedData) => {
    setError("");

    try {
      const updatedBudget = await updateBudget(id, updatedData);

      setbudget((prev) =>
        prev.map((item) =>
          item.id === id ? updatedBudget : item
        )
      );

      setEditingBudget(null);
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to update budget."
      );
      throw err;
    }
  };
  const handleDeleteBudget = async (id) => {
    setError("");

    try {
      await deleteBudget(id);
      setbudget((prev) =>
        prev.filter((budget) => budget.id !== id)
      );
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete budget.");
    }
  };
  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          budget
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Set limits and stay in control of your spending.
        </p>
      </div>
      {error && (
        <p className="mb-4 text-sm text-red-600">{error}</p>
      )}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        <div className="xl:col-span-1">
          <BudgetForm
            onAddBudget={handleAddBudget}
            editingBudget={editingBudget}
            onUpdateBudget={handleUpdateBudget}
            onCancelEdit={() => setEditingBudget(null)}
          />
        </div>

        <div className="xl:col-span-2 min-w-0">
          <BudgetList
            budget={budget}
            expenses={expenses}
            loading={loading}
            onDeleteBudget={handleDeleteBudget}
            onEditBudget={handleEditBudget}
          />
        </div>
      </div>
    </div>
  );
};

export default Budget;