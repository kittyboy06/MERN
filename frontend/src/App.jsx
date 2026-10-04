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
      <Navbar />
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
