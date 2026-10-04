import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      <section className="dashboard-hero">
        <h1>Welcome to CampusHub 🎓</h1>
        <p>A simple, clean Student Campus Management System built with the MERN Stack.</p>
      </section>

      <section className="dashboard-grid">
        <Link to="/students" className="dash-card">
          <h3>👥 Students</h3>
          <p>Maintain the student directory with names, departments, and academic years.</p>
          <span>Manage Students →</span>
        </Link>

        <Link to="/assignments" className="dash-card">
          <h3>📚 Assignments</h3>
          <p>Track coursework deadlines, subjects, and completion statuses.</p>
          <span>Track Assignments →</span>
        </Link>

        <Link to="/events" className="dash-card">
          <h3>📅 Events</h3>
          <p>Organize campus seminars, club meets, and schedules with venue details.</p>
          <span>View Events →</span>
        </Link>

        <Link to="/notes" className="dash-card">
          <h3>📝 Notes</h3>
          <p>Keep quick study notes, project ideas, and campus reminders.</p>
          <span>Open Notes →</span>
        </Link>
      </section>

      <section className="concepts-box">
        <h2>💡 Core MERN Concepts Demonstrated</h2>
        <p>
          This project illustrates full-stack communication:
          <br />
          <strong>React Frontend ➔ Fetch API ➔ Express Backend ➔ Mongoose ➔ MongoDB</strong>
        </p>

        <ul className="concepts-list">
          <li>React Components & Props</li>
          <li>useState & Controlled Forms</li>
          <li>useEffect Data Fetching</li>
          <li>React Router Navigation</li>
          <li>Express.js REST APIs</li>
          <li>Middleware (JSON, CORS, Logger)</li>
          <li>CRUD Database Operations</li>
          <li>Mongoose Models & Schemas</li>
        </ul>
      </section>
    </div>
  );
}

export default Home;
