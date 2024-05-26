import React from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import Main from "../components/Main";

const Home: React.FC = () => {
  return (
    <Main>
      <div className="m:w-80 md:w-96">
        <h1>Radensuaso Todo</h1>
        <TodoForm />
        <TodoList />
      </div>
    </Main>
  );
};

export default Home;
