import React from "react";
import Field from "./Field";
import Information from "./Information";
import styles from "./app.module.css";
import store from "../store/store";
import { Provider } from "react-redux";

function AppLayout({ children }) {
  return (
    <div className={styles["app"]}>
      <div className={styles["container"]}>{children}</div>
    </div>
  );
}

export default function App() {
  return (
    <AppLayout>
      <Provider store={store}>
        <Information />
        <Field />
      </Provider>
    </AppLayout>
  );
}
