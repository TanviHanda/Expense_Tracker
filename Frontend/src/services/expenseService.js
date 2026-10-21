
import axios from "axios";
import { supabase } from "../lib/supabase";

const API_URL = `${import.meta.env.VITE_API_URL}/api/expenses`;

const getAuthConfig = async () => {
  const { data: { session }, error } =
    await supabase.auth.getSession();

  if (error || !session?.access_token) {
    throw new Error("Please sign in to continue.");
  }

  return {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  };
};

export const getExpenses = async () => {
  const config = await getAuthConfig();
  const response = await axios.get(API_URL, config);
  return response.data;
};

export const addExpense = async (expense) => {
  const config = await getAuthConfig();
  const response = await axios.post(API_URL, expense, config);
  return response.data;
};

export const updateExpense = async (id, updates) => {
  const config = await getAuthConfig();
  const response = await axios.patch(
    `${API_URL}/${id}`,
    updates,
    config
  );
  return response.data;
};

export const deleteExpense = async (id) => {
  const config = await getAuthConfig();
  const response = await axios.delete(
    `${API_URL}/${id}`,
    config
  );
  return response.data;
};
