import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import { TodoProvider } from "./context/TodoContext";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthPage from "./pages/AuthPage";

const App: React.FC = () => {
  const { toggleTheme } = useTheme();

  return (
    <AuthProvider>
      <TodoProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-light dark:bg-dark">
            <Navbar toggleTheme={toggleTheme} />
            <Routes>
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
        </Router>
      </TodoProvider>
    </AuthProvider>
  );
};

export default App;
