import { useState } from "react";
import { supabase } from '../lib/supabase';
import { Link, useNavigate } from "react-router-dom";
import MoneyCharacter from "../components/MoneyCharacter";
import "../components/MoneyCharacter.css";
import { Eye, EyeOff } from "lucide-react";
import { getPasswordStrength } from "../utils/passwordStrength";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const passwordStrength = getPasswordStrength(password);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (passwordStrength.score < 3) {
      alert("Please create a strong password before signing up.");
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
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        alert(error.message);
        return;
      }

      if (!data.session) {
        alert("Account created! Please check your email to verify your account.");
        return;
      }

      alert("Signup successful!");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again.");
    }
  };


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
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-200 mb-2"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="new-password"
                    autoComplete="new-password"
                    required
                    minLength={8}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 pr-12 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {password && (
                  <div className="mt-3">
                    <div className="flex gap-1.5">
                      {[1, 2, 3].map((level) => (
                        <div
                          key={level}
                          className={`h-1.5 flex-1 rounded-full ${passwordStrength.score >= level
                            ? passwordStrength.color
                            : "bg-slate-700"
                            }`}
                        />
                      ))}
                    </div>

                    <p className="mt-2 text-sm text-slate-400">
                      Password strength:{" "}
                      <span
                        className={
                          passwordStrength.score === 1
                            ? "text-red-400"
                            : passwordStrength.score === 2
                              ? "text-yellow-400"
                              : "text-green-400"
                        }
                      >
                        {passwordStrength.label}
                      </span>
                    </p>
                  </div>
                )}

                <p className="mt-2 text-xs text-slate-500">
                  Use 8+ characters with uppercase, lowercase, numbers and symbols.
                  Your browser may also suggest a strong password.
                </p>
              </div>



              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-slate-200 mb-2"
                >
                  Confirm password
                </label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirm-password"
                    autoComplete="new-password"
                    required
                    minLength={8}
                    placeholder="Enter password again"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 pr-12 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={
                      showConfirmPassword ? "Hide confirm password" : "Show confirm password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {confirmPassword && password !== confirmPassword && (
                  <p className="mt-2 text-sm text-red-400">
                    Passwords do not match.
                  </p>
                )}
              </div>


              <button
                type="submit"
                disabled={
                  passwordStrength.score < 3 ||
                  password !== confirmPassword
                }
                className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
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
              to="/signin"
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
