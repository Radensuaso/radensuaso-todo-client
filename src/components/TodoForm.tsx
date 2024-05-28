import React, { useState, useContext, useCallback } from "react";
import { TodoContext } from "../context/TodoContext";
import Button from "./Button";
import TextInput from "./TextInput";
import Spinner from "./Spinner";

const TodoForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { addTodo } = useContext(TodoContext);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (name && name.trim().length > 0) {
        setLoading(true);
        await addTodo(name.trim());
        setLoading(false);
        setName("");
      }
    },
    [name, addTodo]
  );

  return (
    <form onSubmit={handleSubmit} className="w-full mb-4">
      <TextInput
        value={name}
        onChange={handleChange}
        placeholder="Enter todo"
      />
      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? <Spinner size="w-4 h-4" color="border-white" /> : "Add Todo"}
      </Button>
    </form>
  );
};

export default React.memo(TodoForm);
