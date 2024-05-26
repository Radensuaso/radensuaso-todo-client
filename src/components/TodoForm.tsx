import React, { useState, useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import Button from "./Button";
import TextInput from "./TextInput";

const TodoForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const { addTodo } = useContext(TodoContext);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (name.trim()) {
      await addTodo(name);
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mb-4">
      <TextInput
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter todo"
      />

      <Button type="submit" variant="primary">
        Add Todo
      </Button>
    </form>
  );
};

export default TodoForm;
