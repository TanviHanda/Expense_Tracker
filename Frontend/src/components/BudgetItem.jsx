
const getMonthKey = (value) => {
  const stringValue = String(value || "");
  return /^\d{4}-\d{2}/.test(stringValue)
    ? stringValue.slice(0, 7)
    : null;
};

const BudgetItem = ({ budget, expenses = [], onDeleteBudget }) => {
  const budgetMonthKey = getMonthKey(budget.month);
  const monthName = budgetMonthKey
    ? new Date(`${budgetMonthKey}-01T00:00:00`).toLocaleString(
      "en-IN",
      { month: "long", year: "numeric" }
    )
    : Number(budget.month)
      ? new Date(2000, Number(budget.month) - 1).toLocaleString(
        "en-IN",
        { month: "long" }
      )
      : budget.month;

  const categoryName = String(budget.category || "Other")
    .replace(/^\w/, (letter) => letter.toUpperCase());

  const budgetAmount = Number(budget.amount) || 0;

  const spentAmount = expenses
    .filter((expense) => {
      const sameCategory =
        String(expense.category || "").toLowerCase() ===
        String(budget.category || "").toLowerCase();

      const sameMonth = budgetMonthKey
        ? getMonthKey(expense.expense_date) === budgetMonthKey
        : new Date(expense.expense_date).getMonth() + 1 === Number(budget.month);

      return sameCategory && sameMonth;
    })
    .reduce(
      (total, expense) => total + Number(expense.amount || 0),
      0
    );


  const remainingAmount = budgetAmount - spentAmount;

  const usedPercentage =
    budgetAmount > 0 ? (spentAmount / budgetAmount) * 100 : 0;

  const progressWidth = Math.min(usedPercentage, 100);

  const progressColor =
    usedPercentage >= 100
      ? "bg-red-500"
      : usedPercentage >= 75
        ? "bg-orange-400"
        : "bg-green-500";

  return (
    <div className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="font-semibold text-gray-800">
            {categoryName} Budget
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {monthName}
          </p>
        </div>

        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full ${usedPercentage >= 100
              ? "bg-red-50 text-red-700"
              : usedPercentage >= 75
                ? "bg-orange-50 text-orange-700"
                : "bg-green-50 text-green-700"
            }`}
        >
          {usedPercentage >= 100
            ? "Budget Exhausted"
            : usedPercentage >= 75
              ? "Limit Near"
              : "On Track"}
        </span>
      </div>

      <div className="flex justify-between items-end gap-3 mb-2">
        <div>
          <p className="text-xs text-gray-500 mb-1">Spent</p>
          <p className="text-lg font-bold text-gray-800">
            ₹{spentAmount.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-500 mb-1">Budget Limit</p>
          <p className="font-semibold text-gray-700">
            ₹{budgetAmount.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
          style={{ width: `${progressWidth}%` }}
        />
      </div>

      <div className="flex justify-between gap-3 mt-2 text-xs">
        <span className={usedPercentage >= 75 ? "text-orange-600" : "text-gray-500"}>
          {usedPercentage.toFixed(1)}% used
        </span>

        <span className={remainingAmount < 0 ? "text-red-600 font-medium" : "text-gray-500"}>
          {remainingAmount < 0
            ? `₹${Math.abs(remainingAmount).toLocaleString("en-IN")} over budget`
            : `₹${remainingAmount.toLocaleString("en-IN")} remaining`}
        </span>
      </div>

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
