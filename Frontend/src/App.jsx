import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Expenses from './pages/Expense'
import Income from './pages/Income'
import Budget from './pages/Budget'
import Signup from './pages/Signup';
import Signin from "./pages/Signin";
export default function App() {
  return (
    <Routes>
  <Route path="/signup" element={<Signup />} />
  <Route path="/signin" element={<Signin />} />
  <Route element={<DashboardLayout />}>
    <Route path="/" element={<Dashboard />} />
    <Route path="/expenses" element={<Expenses />} />
    <Route path="/income" element={<Income />} />
    <Route path="/budget" element={<Budget />} />
  </Route>

  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
  )
}