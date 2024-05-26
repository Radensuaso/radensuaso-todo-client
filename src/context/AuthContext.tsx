import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

interface AuthContextProps {
  isAuthenticated: boolean;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  token: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const apiURL = process.env.REACT_APP_API_URL || "http://localhost:5008";

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
    setLoading(false); // Set loading to false after checking token

    // Axios response interceptor
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor on unmount
    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${apiURL}/api/auth/login`, {
        username,
        password,
      });
      setToken(response.data.token);
      setIsAuthenticated(true);
      localStorage.setItem("token", response.data.token);
    } catch (error: any) {
      console.error("Login failed", error.response?.data || error.message);
      throw error;
    }
  };

  const register = async (username: string, password: string) => {
    try {
      await axios.post(`${apiURL}/api/auth/register`, {
        username,
        password,
      });
      // Automatically login after successful registration
      await login(username, password);
    } catch (error: any) {
      console.error(
        "Registration failed",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, login, register, logout }}
    >
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
