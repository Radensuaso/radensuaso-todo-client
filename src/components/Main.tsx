import React from "react";

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <main className="flex flex-col items-center flex-grow container mx-auto px-5 sm:px-6 lg:px-8 py-24">
      {children}
    </main>
  );
};

export default React.memo(Main);
