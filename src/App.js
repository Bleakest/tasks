import { useEffect, useState } from "react";
import Todos from "./components/Todos";
import { AppContext } from "./context";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [refreshTodos, setRefreshTodos] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/todos")
      .then((result) => result.json())
      .then((data) => setTodos(data));
  }, [refreshTodos]);

  useEffect(() => {
    setRefreshTodos(!refreshTodos);
  }, [searchInput]);

  return (
    <AppContext.Provider
      value={{
        todos,
        setTodos,
        refreshTodos,
        setRefreshTodos,
        inputValue,
        setInputValue,
        isSorted,
        setIsSorted,
        searchInput,
        setSearchInput,
      }}
    >
      <div>
        <Todos />
      </div>
    </AppContext.Provider>
  );
}
