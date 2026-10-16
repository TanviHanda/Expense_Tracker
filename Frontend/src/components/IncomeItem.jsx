const IncomeItem = ({ income, onDeleteIncome }) => {
  const formattedDate = income.income_Date
    ? new Date(`${income.income_Date}`.slice(0, 10) + "T00:00:00")
      .toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 items-center border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 shrink-0 rounded-lg bg-green-50 text-green-600 flex items-center justify-center font-semibold">
          ₹
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-800 truncate">
            {income.title}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {income.source || "Other income"}
          </p>
        </div>
      </div>

      <div>
        <span className="inline-flex bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
          {income.source || "Other"}
        </span>
      </div>

      <p className="text-sm text-gray-500">
        {formattedDate}
      </p>

      <div className="flex items-center justify-between sm:justify-end gap-3 col-span-2 sm:col-span-1">
        <span className="text-sm font-semibold text-green-600">
          +₹{Number(income.amount).toFixed(2)}
        </span>

        <button
          type="button"
          aria-label="Delete income"
          className="text-gray-400 hover:text-red-600 text-sm transition-colors"
          onClick={() => onDeleteIncome(income.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default IncomeItem;