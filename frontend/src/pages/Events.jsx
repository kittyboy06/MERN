// ===============================================================
// Page: Events.jsx
// Demonstrates:
// 1. Full CRUD for campus events (seminars, workshops, meets)
// 2. Multi-line textareas and Date pickers in controlled forms
// 3. Venue-based filtering via query parameters
// 4. Clean top-form edit interaction
// ===============================================================

import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard.jsx";

const API_URL = "http://localhost:5000/api/events";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [venueFilter, setVenueFilter] = useState("");

  const initialForm = {
    title: "",
    description: "",
    date: "",
    venue: ""
  };
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  // ===============================================================
  // READ: GET /api/events (with optional venue query)
  // ===============================================================
  async function fetchEvents() {
    setLoading(true);
    setError(null);

    try {
      const query = venueFilter.trim()
        ? `?venue=${encodeURIComponent(venueFilter.trim())}`
        : "";

      const response = await fetch(`${API_URL}${query}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch events");
      }

      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, [venueFilter]);

  // ===============================================================
  // FORM HANDLER
  // ===============================================================
  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  // ===============================================================
  // CREATE (POST) & UPDATE (PUT)
  // ===============================================================
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const isEditing = editingId !== null;
    const url = isEditing ? `${API_URL}/${editingId}` : API_URL;
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `Failed to ${isEditing ? "update" : "create"} event`
        );
      }

      setForm(initialForm);
      setEditingId(null);
      fetchEvents();
    } catch (err) {
      setError(err.message);
    }
  }

  // ===============================================================
  // EDIT TRIGGER
  // ===============================================================
  function handleStartEdit(event) {
    setEditingId(event._id);

    const dateFormatted = event.date
      ? new Date(event.date).toISOString().split("T")[0]
      : "";

    setForm({
      title: event.title,
      description: event.description,
      date: dateFormatted,
      venue: event.venue
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(initialForm);
  }

  // ===============================================================
  // DELETE
  // ===============================================================
  async function handleDelete(id) {
    const confirmed = window.confirm("Are you sure you want to delete this event?");
    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete event");
      }

      if (editingId === id) {
        handleCancelEdit();
      }

      fetchEvents();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="container">
      <header className="page-header">
        <h1>📅 Campus Events</h1>
        <p>Demonstrates event scheduling, text areas, and venue queries.</p>
      </header>

      {error && <div className="error-banner">⚠️ {error}</div>}

      {/* Controlled Form Card */}
      <section className="card">
        <h2>{editingId ? "✏️ Edit Event" : "➕ Schedule New Event"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Event Title:</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g. AI & Robotics Symposium"
              value={form.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Event Description:</label>
            <textarea
              id="description"
              name="description"
              placeholder="Provide a brief overview of the event..."
              value={form.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              id="date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="venue">Venue:</label>
            <input
              id="venue"
              name="venue"
              type="text"
              placeholder="e.g. Main Auditorium / Seminar Hall B"
              value={form.venue}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {editingId ? "Update Event" : "Schedule Event"}
            </button>

            {editingId && (
              <button
                type="button"
                className="btn-secondary"
                onClick={handleCancelEdit}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Venue Filter Card */}
      <section className="card">
        <h2>🔍 Filter by Venue</h2>
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Type venue (e.g. Auditorium) to filter..."
            value={venueFilter}
            onChange={(e) => setVenueFilter(e.target.value)}
          />
          {venueFilter && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setVenueFilter("")}
            >
              Clear Filter
            </button>
          )}
        </div>
      </section>

      {/* Events List Card */}
      <section className="card">
        <div className="section-heading">
          <h2>
            Upcoming Events{" "}
            <span className="item-count">({events.length} listed)</span>
          </h2>
          <button type="button" className="btn-secondary" onClick={fetchEvents}>
            🔄 Refresh
          </button>
        </div>

        {loading ? (
          <p className="loading-text">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="empty-text">No events scheduled.</p>
        ) : (
          <div className="items-grid">
            {events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onEdit={handleStartEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Events;
