import axios from "axios";

const API_URL = "http://localhost:5000/api/budget";

export const getbudget = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addBudget = async (budget) => {
  const response = await axios.post(API_URL, budget);
  return response.data;
};

export const updateBudget = async (id, updates) => {
  const response = await axios.patch(`${API_URL}/${id}`, updates);
  return response.data;
};

export const deleteBudget = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
