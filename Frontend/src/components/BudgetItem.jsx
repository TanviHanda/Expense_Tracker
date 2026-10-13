const BudgetItem = () => {
  const budget = 10000;
  const spent = 6500;
  const remaining = budget - spent;
  const percentage = (spent / budget) * 100;

  return (
    <div className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="font-semibold text-gray-800">
            Monthly Food Budget
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Food · October 2026
          </p>
        </div>

        <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
          Active
        </span>
      </div>

      <div className="flex items-end justify-between gap-3 mb-2">
        <div>
          <p className="text-xs text-gray-500 mb-1">Spent</p>
          <p className="text-lg font-bold text-gray-800">
            ₹{spent.toLocaleString("en-IN")}
          </p>
        </div>

        <p className="text-sm text-gray-500">
          of ₹{budget.toLocaleString("en-IN")}
        </p>
      </div>

      <div
        className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Budget spent"
      >
        <div
          className="h-full bg-blue-600 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex items-center justify-between gap-3 mt-3">
        <p className="text-sm text-gray-500">
          {percentage}% used
        </p>
        <p className="text-sm font-semibold text-green-600">
          ₹{remaining.toLocaleString("en-IN")} left
        </p>
      </div>

      <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
        <button
          type="button"
          className="text-sm text-gray-500 hover:text-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BudgetItem;