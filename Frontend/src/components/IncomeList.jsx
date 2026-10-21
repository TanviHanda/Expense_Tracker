import IncomeItem from "./IncomeItem";

const IncomeList = ({
   incomes = [],
  onDeleteIncome,
  onEditIncome,
  loading,
  error,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Income History
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Track and manage your earnings
          </p>
        </div>

        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg w-fit">
          Recent income
        </span>
      </div>

      <div className="hidden sm:grid grid-cols-4 gap-4 px-4 py-3 bg-gray-50 rounded-lg text-xs font-semibold uppercase tracking-wide text-gray-500">
        <span>Income</span>
        <span>Source</span>
        <span>Date</span>
        <span className="text-right">Amount</span>
      </div>

      <div className="mt-3 space-y-3">
       {loading && (
          <p className="text-gray-500 text-center">
            Loading income...
          </p>
        )}

        {error && (
          <p className="text-red-500 text-center">{error}</p>
        )}

        {!loading && !error && incomes.length === 0 && (
          <p className="text-gray-500 text-center">
            No income found.
          </p>
        )}
        {!loading &&
          !error &&
          incomes.map((income) => (
            <IncomeItem
              key={income.id}
              income={income}
              onDeleteIncome={onDeleteIncome}
              onEditIncome={onEditIncome}
            />
          ))}
      </div>
    </div>
  );
};

export default IncomeList;