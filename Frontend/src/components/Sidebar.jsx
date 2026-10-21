import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/signin", { replace: true });
  };
  return (
    <div className="bg-gray-800 text-white p-4 w-64 h-screen flex flex-col fixed top-0 left-0">
      <h1 className="text-xl font-bold text-center">Expense Tracker</h1>
      <hr className="border-gray-600 mt-4" />
      <div className="mt-10">
        <ul className="space-y-2">
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
            <NavLink to="/dashboard" className="block">
              Dashboard
            </NavLink>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
            <NavLink to="/expenses" className="block">
              Expenses
            </NavLink>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
            <NavLink to="/income" className="block">
              Income
            </NavLink>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
            <NavLink to="/budget" className="block">
              Budget
            </NavLink>
          </li>
        </ul>
      </div>
      <button
        onClick={handleLogout}
        className="mt-auto hover:bg-gray-700 bg-gray-500 p-2 rounded cursor-pointer text-[16px]"
      >
        Logout
      </button>
    </div>
  )
}

export default Sidebar