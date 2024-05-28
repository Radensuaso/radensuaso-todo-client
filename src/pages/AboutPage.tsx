import React from "react";
import Main from "../components/Main";

const AboutPage: React.FC = () => {
  return (
    <Main>
      <h1>Welcome to my Todo App</h1>
      <p>
        This is a simple app to practice with the tech stack React + .NET Core +
        Postgres.
      </p>
    </Main>
  );
};

export default React.memo(AboutPage);
