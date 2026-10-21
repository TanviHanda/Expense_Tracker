
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifySession = async () => {
      const code = new URLSearchParams(window.location.search).get("code");

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
          console.error("Verification callback error:", error.message);
          setMessage("Verification failed. Please try again.");
          return;
        }
      }

      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        setMessage("Session not found. Please sign in.");
        setTimeout(() => navigate("/signin", { replace: true }), 1500);
        return;
      }

      navigate("/dashboard", { replace: true });
    };

    verifySession();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      {message}
    </div>
  );
};

export default AuthCallback;
