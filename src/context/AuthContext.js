import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  // Function to check authentication status
  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get("http://localhost:4000/api/auth/me");

      console.log("Authenticated User:", response.data); // Debugging
      setUser(response.data.user); // Ensure it's only the user object
    } catch (err) {
      console.error("Auth check error:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        setUser(null);
      }
      setError("Session expired. Please login again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Run authentication check when the app starts
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Login function
  const login = async (username, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post("http://localhost:4000/api/auth/login", { username, password });
      console.log("API Response:", response.data); // Debugging

      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

      setUser(response.data.user); // Ensure only user object is set
      navigate("/dashboard");
      return true;
    } catch (err) {
      console.error("Login Error:", err.response ? err.response.data : err);
      setError(err.response?.data?.message || "Invalid credentials");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (username, password, role, name, phone) => {
    try {
      setLoading(true);
      setError(null);

      await axios.post("http://localhost:4000/api/auth/register", { username, password, role, name, phone });
      navigate("/login");
      return true;
    } catch (err) {
      setError("Registration failed. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    setError(null);
    navigate("/");
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
