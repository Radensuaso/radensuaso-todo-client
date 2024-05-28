import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import { useLoading } from "./LoadingContext";
import LoadingScreen from "../components/LoadingScreen";

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
  const [loading, setLoading] = useState<boolean>(true);
  const { setLoading: setGlobalLoading } = useLoading();
  const apiURL = process.env.REACT_APP_API_URL || "http://localhost:5008";

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
    setLoading(false);

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const login = useCallback(
    async (username: string, password: string) => {
      setGlobalLoading(true);
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
      } finally {
        setGlobalLoading(false);
      }
    },
    [apiURL, setGlobalLoading]
  );

  const register = useCallback(
    async (username: string, password: string) => {
      setGlobalLoading(true);
      try {
        await axios.post(`${apiURL}/api/auth/register`, {
          username,
          password,
        });
        await login(username, password);
      } catch (error: any) {
        console.error(
          "Registration failed",
          error.response?.data || error.message
        );
        throw error;
      } finally {
        setGlobalLoading(false);
      }
    },
    [apiURL, login, setGlobalLoading]
  );

  const logout = useCallback(() => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      token,
      login,
      register,
      logout,
    }),
    [isAuthenticated, token, login, register, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {loading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
};
