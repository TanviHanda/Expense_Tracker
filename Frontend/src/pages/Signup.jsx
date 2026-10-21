import { useState } from "react";
import { supabase } from '../lib/supabase';
import { Link, useNavigate } from "react-router-dom";
import MoneyCharacter from "../components/MoneyCharacter";
import "../components/MoneyCharacter.css";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            username: username.trim(),
          },
        },
      });

      if (error) {
        alert(error.message);
        return;
      }

      console.log(data);
      alert("Signup successful!");
      navigate("/");

    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row items-stretch">

      {/* Left side: Product introduction */}
      <div className="w-full md:w-1/2 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-center p-6 sm:p-8 lg:p-12">
       <div className="mx-auto w-full max-w-lg">
        <div className="mb-8 max-w-md">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
            ExpenseTracker
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Make every rupee count.
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-400">
            Get a clear view of your income, expenses, and budgets in one
            focused workspace.
          </p>
        </div>
        <MoneyCharacter />
       </div>
      </div>

      {/* Right side: Signup form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 py-12 md:py-16">
        <div className="w-full max-w-md">

          {/* Logo and heading */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 text-white text-2xl font-bold shadow-lg shadow-blue-600/20 mb-4">
              ₹
            </div>

            <h1 className="text-3xl font-bold text-white tracking-tight">
              Create your account
            </h1>

            <p className="text-slate-400 mt-2">
              Set up your personal finance workspace in minutes.
            </p>
          </div>

          {/* Signup form */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-slate-200 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  required
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-200 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-200 mb-2">
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  placeholder="Enter password again"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Create account
              </button>

            </form>

            <p className="text-center text-xs text-slate-500 mt-6">
              Your financial data, organised in one secure place.
            </p>
          </div>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 font-medium hover:text-blue-300 transition"
            >
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Signup;
