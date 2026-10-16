
const BudgetItem = ({ budget, onDeleteBudget }) => {
  const monthName = Number(budget.month)
    ? new Date(2000, Number(budget.month) - 1).toLocaleString(
      "en-IN",
      { month: "long" }
    )
    : budget.month;

  const categoryName = String(budget.category || "Other")
    .replace(/^\w/, (letter) => letter.toUpperCase());

  return (
    <div className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="font-semibold text-gray-800">
            {categoryName} Budget
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {monthName} {budget.month}
          </p>
        </div>

        <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
          Active
        </span>
      </div>

      <div className="mb-2">
        <p className="text-xs text-gray-500 mb-1">
          Budget Limit
        </p>
        <p className="text-lg font-bold text-gray-800">
          ₹{Number(budget.amount).toLocaleString("en-IN")}
        </p>
      </div>

      <div className="w-full h-2.5 bg-gray-100 rounded-full" />

      <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={() => onDeleteBudget(budget.id)}
          className="text-sm text-gray-500 hover:text-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BudgetItem;
