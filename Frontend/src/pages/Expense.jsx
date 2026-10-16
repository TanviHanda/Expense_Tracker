import {useState, useEffect} from "react";
import { getExpenses, addExpense, deleteExpense } from "../services/expenseService";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExpenses = async() => {
      try{
        const data = await getExpenses();
        console.log("Expenses API response:", data);
        setExpenses(data);
      }
      catch{
        setError("Failed to fetch expenses.");
      }
      finally{
        setLoading(false);
      }
    }
       fetchExpenses();
  },[]);
  const handleAddExpense = async(expense) => {
    try{
      const newExpense = await addExpense(expense);
      setExpenses(prevExpenses => [...prevExpenses, newExpense.data]);
    }
    catch{
      setError("Failed to add expense.");
    }
  }
  const handleDeleteExpense = async(id) => {
    try{
      await deleteExpense(id);
      setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
    }
    catch{
      setError("Failed to delete expense.");
    }
  }
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
          <ExpenseForm onAddExpense={handleAddExpense} />
        </div>

        {/* Expense List */}
        <div className="xl:col-span-2 min-w-0">
          <ExpenseList 
          expenses={expenses} onDeleteExpense={handleDeleteExpense} 
          loading={loading} 
          error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default Expenses;