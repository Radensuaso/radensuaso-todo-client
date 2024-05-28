import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import { TodoProvider } from "./context/TodoContext";
import { AuthProvider } from "./context/AuthContext";
import { LoadingProvider, useLoading } from "./context/LoadingContext";
import LoadingScreen from "./components/LoadingScreen";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));

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
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
        <Footer />
      </div>
    </>
  );
};

export default App;
