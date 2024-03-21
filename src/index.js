import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./css/main.css";
import { AuthProvider } from "./providers/AuthProvider";
import { PageProvider } from "./providers/PageProvider";

ReactDOM.render(
  <PageProvider>
    <App />
  </PageProvider>,
  document.getElementById("root")
);
