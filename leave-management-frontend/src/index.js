import React from "react";

import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";

import App from "./App";
import { store } from "./app/store";
import "./index.css";
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
