import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import AuthContextState from "./ContextApi/AuthContextState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextState>
    <App />
  </AuthContextState>
);
