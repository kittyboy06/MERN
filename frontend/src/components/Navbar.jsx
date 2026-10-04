// ===============================================================
// Component: Navbar
// Demonstrates: React Router's <NavLink> component for client-side
// single-page navigation without reloading the browser page.
// ===============================================================

import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Brand logo/title navigating to Home */}
        <NavLink to="/" className="nav-brand">
          🎓 Campus<span>Hub</span>
        </NavLink>

        {/* Navigation links - NavLink adds an 'active' class when matching the current URL */}
        <ul className="nav-links">
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/students">Students</NavLink>
          </li>
          <li>
            <NavLink to="/assignments">Assignments</NavLink>
          </li>
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
          <li>
            <NavLink to="/notes">Notes</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
