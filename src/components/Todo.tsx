import React, { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import { TodoItem as TodoItemType } from "../types/TodoItem";
import { FaTrash } from "react-icons/fa";

interface TodoItemProps {
  todo: TodoItemType;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodo, removeTodo } = useContext(TodoContext);
  const [isExiting, setIsExiting] = useState(false);

  const handleRemove = (id: number) => {
    setIsExiting(true);
    setTimeout(() => removeTodo(id), 500); 
  };

  return (
    <li
      className={`w-full mb-2 bg-light-lighter dark:bg-dark-darker p-4 rounded shadow-md flex justify-between items-center ${
        isExiting ? "todo-item-exit" : "todo-item-enter"
      }`}
    >
      <span
        onClick={() => toggleTodo(todo.id)}
        className={`flex items-center hover-animation text-xl dark:text-white cursor-pointer ${
          todo.isComplete ? "line-through" : ""
        }`}
      >
        <input
          type="checkbox"
          checked={todo.isComplete}
          className="hidden"
          onChange={() => toggleTodo(todo.id)}
        />
        <span className="custom-checkbox mr-2"></span>
        {todo.name}
      </span>
      <button
        onClick={() => handleRemove(todo.id)}
        className="text-danger hover-animation"
      >
        <FaTrash />
      </button>
    </li>
  );
};

export default TodoItem;
