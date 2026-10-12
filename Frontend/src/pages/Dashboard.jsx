const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Dashboard Heading */}
      <div>
        <h1 className="text-2xl font-bold">
          Welcome to the Expense Tracker
        </h1>
        <p className="text-gray-500 mt-1">
          Here's your financial overview.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white shadow p-4 rounded-xl">
          <h2 className="font-semibold text-gray-500">Total Balance</h2>
          <p className="text-2xl font-bold mt-2">₹7,500</p>
        </div>

        <div className="bg-white shadow p-4 rounded-xl">
          <h2 className="font-semibold text-gray-500">Total Income</h2>
          <p className="text-2xl font-bold mt-2">₹12,000</p>
        </div>

        <div className="bg-white shadow p-4 rounded-xl">
          <h2 className="font-semibold text-gray-500">Total Expenses</h2>
          <p className="text-2xl font-bold mt-2">₹4,500</p>
        </div>

        <div className="bg-white shadow p-4 rounded-xl">
          <h2 className="font-semibold text-gray-500">Monthly Budget</h2>
          <p className="text-2xl font-bold mt-2">₹20,000</p>
        </div>
      </div>

      {/* Main Dashboard Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Transactions */}
        <div className="bg-white shadow p-5 rounded-xl">
          <h2 className="text-lg font-bold">Recent Transactions</h2>

          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Groceries</p>
                <p className="text-sm text-gray-500">Food</p>
              </div>
              <p className="font-semibold text-red-500">-₹1,500</p>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Freelance Payment</p>
                <p className="text-sm text-gray-500">Income</p>
              </div>
              <p className="font-semibold text-green-600">+₹5,000</p>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Transport</p>
                <p className="text-sm text-gray-500">Travel</p>
              </div>
              <p className="font-semibold text-red-500">-₹500</p>
            </div>
          </div>
        </div>

        {/* Budget Overview */}
        <div className="bg-white shadow p-5 rounded-xl">
          <h2 className="text-lg font-bold">Budget Overview</h2>

          <div className="flex justify-between mt-4">
            <p className="text-gray-500">Monthly Budget</p>
            <p className="font-semibold">₹20,000</p>
          </div>

          <div className="flex justify-between mt-4">
            <div>
              <p className="text-sm text-gray-500">Spent</p>
              <p className="font-semibold">₹4,500</p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">Remaining</p>
              <p className="font-semibold">₹15,500</p>
            </div>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
            <div className="w-[22.5%] bg-green-500 h-2 rounded-full"></div>
          </div>

          <div className="flex justify-between mt-2 text-sm">
            <p className="text-green-600">22.5% used</p>
            <p className="text-gray-500">77.5% remaining</p>
          </div>
        </div>

        {/* Expense Breakdown */}
        <div className="bg-white shadow p-5 rounded-xl">
          <h2 className="text-lg font-bold">Expense Breakdown</h2>

          <div className="mt-5 space-y-5">
            <div>
              <div className="flex justify-between mb-2">
                <p>Food</p>
                <p className="font-semibold">₹1,500</p>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="w-1/3 bg-blue-500 h-2 rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <p>Transport</p>
                <p className="font-semibold">₹1,000</p>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="w-[22.2%] bg-blue-500 h-2 rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <p>Shopping</p>
                <p className="font-semibold">₹500</p>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="w-[11.1%] bg-blue-500 h-2 rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <p>Bills</p>
                <p className="font-semibold">₹1,500</p>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="w-1/3 bg-blue-500 h-2 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="bg-white shadow p-5 rounded-xl">
          <h2 className="text-lg font-bold">Quick Summary</h2>

          <div className="mt-5 space-y-4">
            <div className="flex justify-between">
              <p className="text-gray-500">Income this month</p>
              <p className="font-semibold text-green-600">₹12,000</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-500">Expenses this month</p>
              <p className="font-semibold text-red-500">₹4,500</p>
            </div>

            <div className="flex justify-between border-t pt-4">
              <p className="font-medium">Savings</p>
              <p className="font-bold">₹7,500</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;