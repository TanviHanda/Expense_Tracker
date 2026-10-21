
export const getPasswordStrength = (password) => {
  if (!password) {
    return {
      label: "",
      score: 0,
      color: "bg-slate-700",
    };
  }

  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (password.length < 8 || score <= 2) {
    return {
      label: "Weak",
      score: 1,
      color: "bg-red-500",
    };
  }

  if (score <= 3) {
    return {
      label: "Medium",
      score: 2,
      color: "bg-yellow-500",
    };
  }

  return {
    label: "Strong",
    score: 3,
    color: "bg-green-500",
  };
};
