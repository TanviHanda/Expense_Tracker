import axios from "axios";
import { supabase } from "../lib/supabase";

const API_URL = "http://localhost:5000/api/budget";

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

export const getbudget = async () => {
  const config = await getAuthConfig();
  const response = await axios.get(API_URL, config);
  return response.data;
};

export const addBudget = async (budget) => {
  const config = await getAuthConfig();
  const response = await axios.post(API_URL, budget, config);
  return response.data;
};

export const updateBudget = async (id, updates) => {
  const config = await getAuthConfig();
  const response = await axios.patch(
    `${API_URL}/${id}`,
    updates,
    config
  );
  return response.data;
};

export const deleteBudget = async (id) => {
  const config = await getAuthConfig();
  const response = await axios.delete(
    `${API_URL}/${id}`,
    config
  );
  return response.data;
};