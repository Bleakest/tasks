import React, { useEffect, useState } from "react";
import Field from "./Field";
import Information from "./Information";
import styles from "./app.module.css";
import { Provider } from "react-redux";
import { store } from "../store/store";

function AppLayout({ children }) {
  return (
    <div className={styles["app"]}>
      <div className={styles["container"]}>{children}</div>
    </div>
  );
}

// export default function App() {
//   const [refresh, setRefresh] = useState(Date.now());

//   useEffect(() => {
//     const unsubscribe = store.subscribe(() => {
//       setRefresh(Date.now());
//     });

//     return () => unsubscribe();
//   }, []);
//   return (
//     <AppLayout>
//       <Information />
//       <Field />
//     </AppLayout>
//   );
// }

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppLayout>
          <Information />
          <Field />
        </AppLayout>
      </Provider>
    );
  }
}
