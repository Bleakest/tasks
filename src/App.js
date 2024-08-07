import { useEffect, useState } from "react";
import Todos from "./components/Todos";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { TodoList } from "./components/TodoList";
import TodoModal from "./components/TodoModal";

const NotFound = () => <div>Такая страница не существует</div>;

export default function App() {
  const [todos, setTodos] = useState([]);
  const [refreshTodos, setRefreshTodos] = useState(false);
  useEffect(() => {
    fetch("http://localhost:8000/todos")
      .then((result) => result.json())
      .then((data) => setTodos(data));
  }, [refreshTodos]);

  return (
    <div>
      <BrowserRouter>
        <Todos>
          <Routes>
            <Route
              path="/"
              element={
                <TodoList
                  todos={todos}
                  setTodos={setTodos}
                  setRefreshTodos={setRefreshTodos}
                  refreshTodos={refreshTodos}
                />
              }
            />
            <Route
              path="/task/:id"
              element={<TodoModal setRefreshTodos={setRefreshTodos} />}
            />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace={true} />} />
          </Routes>
        </Todos>
      </BrowserRouter>
    </div>
  );
}
