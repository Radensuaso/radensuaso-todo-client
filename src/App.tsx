// src/App.tsx
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
import { LoadingProvider, useLoading } from "./context/LoadingContext";
import LoadingScreen from "./components/LoadingScreen";

const App: React.FC = () => {
  return (
    <LoadingProvider>
      <AuthProvider>
        <TodoProvider>
          <Router>
            <AppContent />
          </Router>
        </TodoProvider>
      </AuthProvider>
    </LoadingProvider>
  );
};

const AppContent: React.FC = () => {
  const { loading } = useLoading();
  const { toggleTheme } = useTheme();

  return (
    <>
      {loading && <LoadingScreen />}
      <div
        className={`flex flex-col min-h-screen bg-light dark:bg-dark ${
          loading ? "hidden" : ""
        }`}
      >
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
    </>
  );
};

export default App;
