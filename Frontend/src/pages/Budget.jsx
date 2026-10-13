import BudgetForm from "../components/BudgetForm";
import BudgetList from "../components/BudgetList";

const Budget = () => {
  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Budgets
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Set limits and stay in control of your spending.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        <div className="xl:col-span-1">
          <BudgetForm />
        </div>

        <div className="xl:col-span-2 min-w-0">
          <BudgetList />
        </div>
      </div>
    </div>
  );
};

export default Budget;