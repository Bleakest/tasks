import { TodosProvider } from "./contex";
import Todos from "./components/Todos";

export default function App() {
  return (
    <TodosProvider>
      <div>
        <Todos />
      </div>
    </TodosProvider>
  );
}
