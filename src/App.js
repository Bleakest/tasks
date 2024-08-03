import { TodosProvider } from "./contex";
import Todos from "./components/Todos";
import { AppContext } from "./context";

export default function App() {
  return (
    <TodosProvider>
      <div>
        <Todos />
      </div>
    </TodosProvider>
  );
}
