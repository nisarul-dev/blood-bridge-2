"use client"; // Ensure it's a client component

import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router"; // ✅ Correct for Pages Router
import { Snackbar, Alert } from "@mui/material";

// Create AuthContext
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const login = () => {
    localStorage.setItem("token", "fake-jwt-token");
    setIsLoggedIn(true);
    setSnackbar({ open: true, message: "Login Successful!", severity: "success" });

    setTimeout(() => {
      router.push("/"); // ✅ Redirect after login
    }, 1500);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setSnackbar({ open: true, message: "Logout Successful!", severity: "info" });

    setTimeout(() => {
      router.push("/"); // ✅ Redirect after logout
    }, 1500);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}

      {/* ✅ Success/Error Snackbar Alert */}
      <Snackbar open={snackbar.open} autoHideDuration={2000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} variant="filled" onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
