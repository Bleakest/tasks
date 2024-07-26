import Todos from "./components/Todos";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Todos />
      </BrowserRouter>
    </div>
  );
}
