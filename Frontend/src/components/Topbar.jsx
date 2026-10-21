import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Search,
  LayoutDashboard,
  Wallet,
  TrendingUp,
  Target,
} from "lucide-react";

const pageContent = {
  "/dashboard": {
    title: "Hey, welcome back!",
    subtitle: "Your money's behaving... for now.",
    icon: LayoutDashboard,
  },
  "/expenses": {
    title: "The Damage Report",
    subtitle: "Let's see where your money disappeared.",
    icon: Wallet,
  },
  "/income": {
    title: "Money Coming In",
    subtitle: "Look at you, making money!",
    icon: TrendingUp,
  },
  "/budget": {
    title: "Budget Boss",
    subtitle: "Let's pretend we're financially responsible.",
    icon: Target,
  },
};

const TopBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const currentPage = pageContent[location.pathname] || pageContent["/dashboard"];
  const PageIcon = currentPage.icon;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(searchTerm.trim());
  };

  return (
    <header className="w-full border-b border-gray-200 bg-white px-4 py-4 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
            <PageIcon size={22} />
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight text-gray-800">
              {currentPage.title}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {currentPage.subtitle}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-md items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100"
        >
          <Search size={18} className="shrink-0 text-gray-400" />

          <input
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default TopBar;