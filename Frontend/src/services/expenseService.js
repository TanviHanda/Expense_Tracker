
import axios from "axios";

const API_URL = "http://localhost:5000/api/expenses";

export const getExpenses = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addExpense = async (expense) => {
  const response = await axios.post(API_URL, expense);
  return response.data;
};

export const updateExpense = async (id, updates) => {
  const response = await axios.patch(`${API_URL}/${id}`, updates);
  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
