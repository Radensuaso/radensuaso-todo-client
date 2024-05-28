import React, { useContext, useState, useCallback } from "react";
import { TodoContext } from "../context/TodoContext";
import { TodoItem } from "../types/TodoItem";
import { FaTrash } from "react-icons/fa";

interface TodoItemProps {
  todo: TodoItem;
}

const Todo: React.FC<TodoItemProps> = React.memo(({ todo }) => {
  const { toggleTodo, removeTodo } = useContext(TodoContext);
  const [isExiting, setIsExiting] = useState(false);

  const handleToggle = useCallback(() => {
    todo.id && toggleTodo(todo.id);
  }, [toggleTodo, todo.id]);

  const handleRemove = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => todo.id && removeTodo(todo.id), 500);
  }, [removeTodo, todo.id]);

  return (
    <li
      className={`w-full mb-2 bg-light-lighter dark:bg-dark-darker p-4 rounded shadow-md flex justify-between items-center ${
        isExiting ? "todo-item-exit" : "todo-item-enter"
      }`}
    >
      <span
        onClick={handleToggle}
        className={`flex items-center hover-animation text-xl dark:text-white cursor-pointer ${
          todo.isComplete ? "line-through" : ""
        }`}
      >
        <input
          type="checkbox"
          checked={todo.isComplete}
          className="hidden"
          onChange={handleToggle}
        />
        <span className="custom-checkbox mr-2"></span>
        {todo.name}
      </span>
      <button onClick={handleRemove} className="text-danger hover-animation">
        <FaTrash />
      </button>
    </li>
  );
});

export default Todo;
