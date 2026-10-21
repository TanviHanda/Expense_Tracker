
import { supabase } from "../lib/supabase.js";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Authentication token is required",
    });
  }

  const token = authHeader.slice(7).trim();

  if (!token) {
    return res.status(401).json({
      error: "Authentication token is required",
    });
  }

  try {
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({
        error: "Invalid or expired token",
      });
    }

    req.user = data.user;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);

    return res.status(500).json({
      error: "Unable to verify authentication",
    });
  }
};
