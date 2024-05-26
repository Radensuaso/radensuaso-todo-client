import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="flex items-center justify-center min-h-52 bg-dark-darker p-5">
      <div>
        <p>
          <a
            href="https://www.instagram.com/radensuasotodo"
            className="mx-2 text-xl md:text-2xl text-primary hover:text-secondary hover:font-bold"
          >
            Radensuaso Todo
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
