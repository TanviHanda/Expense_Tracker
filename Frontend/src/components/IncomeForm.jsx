const IncomeForm = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Add New Income
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Record your earnings
        </p>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Income Title
          </label>
          <input
            type="text"
            placeholder="e.g. Monthly salary"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Amount (₹)
          </label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Enter amount"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Income Source
          </label>
          <select
            defaultValue=""
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="" disabled>Select source</option>
            <option value="salary">Salary</option>
            <option value="freelance">Freelance</option>
            <option value="business">Business</option>
            <option value="investment">Investment</option>
            <option value="gift">Gift</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Date
          </label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2.5 px-4 rounded-lg transition-colors"
        >
          + Add Income
        </button>
      </form>
    </div>
  );
};

export default IncomeForm;