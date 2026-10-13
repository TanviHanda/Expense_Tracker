import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

const Expenses = () => {
  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Expenses
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage and track your daily spending.
        </p>
      </div>

      {/* Expense Form and List */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        {/* Form */}
        <div className="xl:col-span-1">
          <ExpenseForm />
        </div>

        {/* Expense List */}
        <div className="xl:col-span-2 min-w-0">
          <ExpenseList />
        </div>
      </div>
    </div>
  );
};

export default Expenses;