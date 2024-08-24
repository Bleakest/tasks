import { Provider } from "react-redux";
import { store } from "./redux/store";
import TodoForm from "./components/TodoForm";

export default function App() {
  return (
    <Provider store={store}>
      <TodoForm />
    </Provider>
  );
}
