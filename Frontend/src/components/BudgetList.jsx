import BudgetItem from "./BudgetItem";

const BudgetList = ({
  budget = [],
  expenses = [],
  loading,
  onDeleteBudget,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Your Budgets
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Monitor your spending limits
          </p>
        </div>

        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg w-fit">
          Monthly overview
        </span>
      </div>
      {loading ? (
        <p className="text-sm text-gray-500">Loading budget...</p>
      ) : budget.length === 0 ? (
        <p className="text-sm text-gray-500">
          No budget yet. Create your first budget!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {budget.map((budget) => (
            <BudgetItem
              key={budget.id}
              budget={budget}
              expenses={expenses}
              onDeleteBudget={onDeleteBudget}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default BudgetList;