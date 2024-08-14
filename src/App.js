import Todos from "./components/Todos";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <div>
        <Todos />
      </div>
    </Provider>
  );
}
