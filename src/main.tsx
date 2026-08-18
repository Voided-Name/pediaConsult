import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router";
import App from "./App";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Toaster />
      <App />
    </HashRouter>
  </React.StrictMode>,
);
