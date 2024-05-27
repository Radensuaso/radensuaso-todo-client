import React, { useState, useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import Button from "./Button";
import TextInput from "./TextInput";
import Spinner from "./Spinner";

const TodoForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { addTodo } = useContext(TodoContext);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (name && name.length > 0) {
      setLoading(true);
      await addTodo(name.trim());
      setLoading(false);
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

      {!loading && (
        <Button type="submit" variant="primary">
          Add Todo
        </Button>
      )}

      {loading && (
        <Button variant="primary">
          <Spinner size="w-4 h-4" color="white" />
        </Button>
      )}
    </form>
  );
};

export default TodoForm;
