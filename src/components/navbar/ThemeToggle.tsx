import React from "react";

interface ThemeToggleProps {
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ toggleTheme }) => {
  const theme = document.documentElement.dataset.theme || "light";

  return (
    <button onClick={toggleTheme} className="hover-animation">
      {theme === "light" ? "🌙" : theme === "dark" ? "🌞" : "🌅"}
    </button>
  );
};

export default ThemeToggle;
