import { useEffect, useState } from "react";
import IncomeForm from "../components/IncomeForm";
import IncomeList from "../components/IncomeList";
import {
  getIncomes,
  addIncome,
  deleteIncome,
  updateIncome
} from "../services/incomeService";

const Income = () => {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingIncome, setEditingIncome] = useState(null);

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const data = await getIncomes();
        setIncomes(data);
      } catch {
        setError("Failed to fetch income.");
      } finally {
        setLoading(false);
      }
    };

    fetchIncomes();
  }, []);

  const handleAddIncome = async (income) => {
    setError("");

    try {
      const result = await addIncome(income);
      setIncomes((prev) => [...prev, result]);
      return true;
    } catch {
      setError("Failed to add income.");
      return false;
    }
  };

  const handleDeleteIncome = async (id) => {
    setError("");

    try {
      await deleteIncome(id);
      setIncomes((prev) => prev.filter((income) => income.id !== id));
    } catch {
      setError("Failed to delete income.");
    }
  };
  const handleEditIncome = (income) => {
    setEditingIncome(income);
  };

  const handleUpdateIncome = async (id, updatedData) => {
    setError("");

    try {
      const updatedIncome = await updateIncome(id, updatedData);

      setIncomes((prev) =>
        prev.map((income) =>
          income.id === id ? updatedIncome : income
        )
      );

      setEditingIncome(null);
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to update income."
      );
    }
  };
  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Income
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage and track your daily income.
        </p>
      </div>

      {error && (
        <p className="mb-4 text-sm text-red-600">{error}</p>
      )}

      {/* Expense Form and List */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        {/* Form */}
        <div className="xl:col-span-1">
          <IncomeForm
            onAddIncome={handleAddIncome}
            editingIncome={editingIncome}
            onUpdateIncome={handleUpdateIncome}
            onCancelEdit={() => setEditingIncome(null)}
          />
        </div>

        {/* Expense List */}
        <div className="xl:col-span-2 min-w-0">
          <IncomeList
            incomes={incomes}
            onDeleteIncome={handleDeleteIncome}
            onEditIncome={handleEditIncome}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default Income;