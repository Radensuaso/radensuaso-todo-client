import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import Todo from "./Todo";

const TodoList: React.FC = () => {
  const { state: todos } = useContext(TodoContext);

  return (
    <div className="h-full mx-auto">
      <ul>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default React.memo(TodoList);
