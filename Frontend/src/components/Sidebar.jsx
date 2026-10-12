const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white p-4 w-64 h-screen flex flex-col fixed top-0 left-0">
      <h1 className="text-xl font-bold text-center">Expense Tracker</h1>
      <hr className="border-gray-600 mt-4" />
      <div className="mt-10">
        <ul className="space-y-2">
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Dashbaord</li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Expenses</li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Income</li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Budget</li>
        </ul>
      </div>
      <button className="mt-auto hover:bg-gray-700 bg-gray-500 p-2 rounded cursor-pointer text-[16px]">Logout</button>
    </div>
  )
}

export default Sidebar