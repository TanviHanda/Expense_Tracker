import axios from "axios";
import { supabase } from "../lib/supabase";

const API_URL = `${import.meta.env.VITE_API_URL}/api/income`;

const getAuthConfig = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session?.access_token) {
    throw new Error("Please sign in to continue.");
  }

  return {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  };
};

export const getIncomes = async () => {
  const config = await getAuthConfig();
  const response = await axios.get(API_URL, config);
  return response.data;
};

export const addIncome = async (income) => {
  const config = await getAuthConfig();
  const response = await axios.post(API_URL, income, config);
  return response.data;
};

export const deleteIncome = async (id) => {
  const config = await getAuthConfig();
  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

export const updateIncome = async (id, income) => {
  const config = await getAuthConfig();
  const response = await axios.patch(
    `${API_URL}/${id}`,
    income,
    config
  );
  return response.data;
};
