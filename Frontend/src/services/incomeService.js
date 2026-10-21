
import axios from "axios";

const API_URL = "http://localhost:5000/api/income";

export const getIncomes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addIncome = async (income) => {
  const response = await axios.post(API_URL, income);
  return response.data;
};

export const deleteIncome = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const updateIncome = async (id, income) => {
  const response = await axios.put(`${API_URL}/${id}`, income);
  return response.data;
};