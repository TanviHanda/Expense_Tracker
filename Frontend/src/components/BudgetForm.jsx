import { useState, useEffect } from "react";
const BudgetForm = ({
  onAddBudget,
  editingBudget,
  onUpdateBudget,
  onCancelEdit,
}) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [monthValue, setMonthValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (editingBudget) {
      setAmount(String(editingBudget.amount ?? ""));
      setCategory(editingBudget.category || "");
      setMonthValue(editingBudget.month?.slice(0, 10) || "");
    } else {
      setAmount("");
      setCategory("");
      setMonthValue("");
    }
  }, [editingBudget]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!category || !monthValue || !amount || Number(amount) <= 0) {
      setError("Please enter valid budget details.");
      return;
    }

    const newBudget = {
      category,
      amount: Number(amount),
      month: monthValue,
    };

    setSubmitting(true);
    setError("");

    try {
      if (editingBudget) {
        await onUpdateBudget(editingBudget.id, newBudget);
      } else {
        const success = await onAddBudget(newBudget);

        if (!success) return;
      }

      setAmount("");
      setCategory("");
      setMonthValue("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save budget.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          {editingBudget ? "Edit Budget" : "Set New Budget"}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Plan your spending limits
        </p>
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Budget Amount (₹)
          </label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Enter budget amount"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Category
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>Select category</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="entertainment">Entertainment</option>
            <option value="utilities">Utilities</option>
            <option value="shopping">Shopping</option>
            <option value="health">Health</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Month
          </label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            value={monthValue}
            onChange={(e) => setMonthValue(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2.5 px-4 rounded-lg transition-colors"
        >
          {submitting
            ? editingBudget
              ? "Updating..."
              : "Saving..."
            : editingBudget
              ? "Update Budget"
              : "+ Set Budget"}
        </button>
        {editingBudget && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default BudgetForm;