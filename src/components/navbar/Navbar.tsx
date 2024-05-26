import React, { useContext, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import NavLink from "./NavLink";
import { AuthContext } from "../../context/AuthContext";

interface NavbarProps {
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme }) => {
  const { isAuthenticated } = useContext(AuthContext); // Use AuthContext
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = window.location.pathname;

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-dark-darker fixed right-0 left-0 top-0 z-50 flex flex-wrap items-center justify-between px-5 py-3">
      <div className="flex justify-center md:justify-start">
        <a
          href="/"
          className="flex gap-2 items-center no-underline hover:no-underline"
        >
          <img src="/images/logo.png" alt="Logo" className="h-12 mr-2" />
          <span className="text-white text-xl hidden md:inline-block">
            Radensuaso Todo
          </span>
        </a>
      </div>
      <div className="flex gap-2 items-center">
        <div id="toggles" className="flex align-middle gap-4">
          <ThemeToggle toggleTheme={toggleTheme} />
        </div>
        <button
          className="md:hidden p-2 focus:outline-none"
          id="menu-toggle"
          onClick={handleMenuToggle}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:flex md:items-center md:w-auto`}
          id="menu"
        >
          <ul className="flex flex-col md:flex-row list-reset">
            <li className="mr-3">
              <NavLink href={"/"} pathName={pathName} label={"Home"} />
            </li>
            <li className="mr-3">
              <NavLink href={"/about"} pathName={pathName} label={"About"} />
            </li>
            <li className="mr-3">
              {isAuthenticated ? (
                <NavLink
                  href={"/auth"}
                  pathName={pathName}
                  label={"Logout"}
                />
              ) : (
                <NavLink
                  href={"/auth"}
                  pathName={pathName}
                  label={"Login/Register"}
                />
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
