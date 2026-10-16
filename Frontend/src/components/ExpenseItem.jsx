const ExpenseItem = ({ expense, onDeleteExpense }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 items-center border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 shrink-0 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-semibold">
          ₹
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-800 truncate">
            {expense.title}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {expense.notes || "Daily expense"}
          </p>
        </div>
      </div>

      <div>
        <span className="inline-flex bg-orange-50 text-orange-700 text-xs font-medium px-2.5 py-1 rounded-full">
          {expense.category || "Other"}
        </span>
      </div>

      <p className="text-sm text-gray-500">
        {new Date(expense.expense_date).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>

      <div className="flex items-center justify-between sm:justify-end gap-3 col-span-2 sm:col-span-1">
        <span className="text-sm font-semibold text-gray-800">
          -₹{Number(expense.amount).toFixed(2)}
        </span>

        <button
          type="button"
          aria-label="Delete expense"
          className="text-gray-400 hover:text-red-600 text-sm transition-colors"
          onClick={() => onDeleteExpense(expense.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;