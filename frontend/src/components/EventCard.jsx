import React from "react";

function EventCard({ event, onEdit, onDelete }) {
  const formattedDate = event.date
    ? new Date(event.date).toLocaleDateString(undefined, {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric"
      })
    : "TBD";

  return (
    <article className="item-card">
      <div className="item-content">
        <h3>{event.title}</h3>
        <p>{event.description}</p>

        <div className="item-meta">
          <span>📅 {formattedDate}</span>
          <span>📍 Venue: <strong>{event.venue}</strong></span>
        </div>

        <div className="item-id">ID: {event._id}</div>
      </div>

      <div className="card-actions">
        <button
          type="button"
          className="btn-edit"
          onClick={() => onEdit(event)}
        >
          ✏️ Edit
        </button>
        <button
          type="button"
          className="btn-danger"
          onClick={() => onDelete(event._id)}
        >
          🗑️ Delete
        </button>
      </div>
    </article>
  );
}

export default EventCard;
