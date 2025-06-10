import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ContextProvivider } from "./context/ContextAPI";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextProvivider>
      <App />
    </ContextProvivider>
  </React.StrictMode>
);
