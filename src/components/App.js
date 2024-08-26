import React from "react";
import Field from "./Field";
import Information from "./Information";
import { Provider } from "react-redux";
import { store } from "../store/store";

function AppLayout({ children }) {
  return (
    <div className="app">
      <div className="container">{children}</div>
    </div>
  );
}

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
