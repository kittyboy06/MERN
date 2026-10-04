// ===============================================================
// App.jsx
// Root application layout component.
// Demonstrates:
// 1. React Router v6+ <Routes> and <Route> component matching.
// 2. Combining layout components (Navbar) with dynamic route views.
// ===============================================================

import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Students from "./pages/Students.jsx";
import Assignments from "./pages/Assignments.jsx";
import Events from "./pages/Events.jsx";
import Notes from "./pages/Notes.jsx";

function App() {
  return (
    <div className="app">
      {/* Navbar stays visible across all pages */}
      <Navbar />

      {/* Main content switches views based on the current URL path */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/events" element={<Events />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
