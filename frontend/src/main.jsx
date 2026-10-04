// ===============================================================
// main.jsx
// React application entry point.
// Renders the root App component wrapped in BrowserRouter
// to enable client-side multi-page routing.
// ===============================================================

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./App.css";

// ReactDOM.createRoot mounts React into the HTML DOM root element
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* BrowserRouter provides routing context to the entire component tree */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
