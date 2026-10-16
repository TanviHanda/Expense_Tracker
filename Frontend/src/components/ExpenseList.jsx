import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ expenses = [], onDeleteExpense, loading, error }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Expense History
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Track and manage your spending
          </p>
        </div>

        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg w-fit">
          Recent expenses
        </span>
      </div>

      <div className="hidden sm:grid grid-cols-4 gap-4 px-4 py-3 bg-gray-50 rounded-lg text-xs font-semibold uppercase tracking-wide text-gray-500">
        <span>Expense</span>
        <span>Category</span>
        <span>Date</span>
        <span className="text-right">Amount</span>
      </div>

      <div className="mt-3 space-y-3">
        {loading && <p className="text-gray-500 text-center">Loading expenses...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {!loading && !error && expenses.length === 0 && (
          <p className="text-gray-500 text-center">No expenses found.</p>
        )}
        {!loading && !error && expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onDeleteExpense={onDeleteExpense}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;