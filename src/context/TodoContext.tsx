import React, {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import { TodoItem } from "../types/TodoItem";
import { AuthContext } from "./AuthContext";
import { useLoading } from "./LoadingContext";

type TodoState = TodoItem[];

type Action =
  | { type: "SET_TODOS"; payload: TodoItem[] }
  | { type: "ADD_TODO"; payload: TodoItem }
  | { type: "TOGGLE_TODO"; payload: string }
  | { type: "REMOVE_TODO"; payload: string };

interface TodoContextProps {
  state: TodoState;
  dispatch: Dispatch<Action>;
  addTodo: (name: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  removeTodo: (id: string) => Promise<void>;
}

const initialState: TodoState = [];

const TodoContext = createContext<TodoContextProps>({
  state: initialState,
  dispatch: () => null,
  addTodo: async () => {},
  toggleTodo: async () => {},
  removeTodo: async () => {},
});

const todoReducer = (state: TodoState, action: Action): TodoState => {
  switch (action.type) {
    case "SET_TODOS":
      return action.payload;
    case "ADD_TODO":
      return [...state, action.payload];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, isComplete: !todo.isComplete }
          : todo
      );
    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
};

const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { token } = useContext(AuthContext);
  const { setLoading } = useLoading();
  const apiURL = process.env.REACT_APP_API_URL || "http://localhost:5008";

  useEffect(() => {
    if (!token) return;

    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await axios.get<TodoItem[]>(
          `${apiURL}/api/TodoItems`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        dispatch({ type: "SET_TODOS", payload: response.data });
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [token, apiURL, setLoading]);

  const addTodo = useCallback(
    async (name: string) => {
      try {
        const newTodo = { name, isComplete: false };
        const response = await axios.post<TodoItem>(
          `${apiURL}/api/TodoItems`,
          newTodo,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        dispatch({ type: "ADD_TODO", payload: response.data });
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    },
    [apiURL, token]
  );

  const toggleTodo = useCallback(
    async (id: string) => {
      try {
        const todo = state.find((t) => t.id === id);
        if (todo) {
          const updatedTodo = { ...todo, isComplete: !todo.isComplete };
          await axios.put(`${apiURL}/api/TodoItems/${id}`, updatedTodo, {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch({ type: "TOGGLE_TODO", payload: id });
        }
      } catch (error) {
        console.error("Error toggling todo:", error);
      }
    },
    [apiURL, state, token]
  );

  const removeTodo = useCallback(
    async (id: string) => {
      try {
        await axios.delete(`${apiURL}/api/TodoItems/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({ type: "REMOVE_TODO", payload: id });
      } catch (error) {
        console.error("Error removing todo:", error);
      }
    },
    [apiURL, token]
  );

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
      addTodo,
      toggleTodo,
      removeTodo,
    }),
    [state, addTodo, toggleTodo, removeTodo]
  );

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
