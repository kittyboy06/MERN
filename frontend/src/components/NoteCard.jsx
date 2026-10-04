// ===============================================================
// Component: NoteCard
// Demonstrates: Rendering notes with title, text content,
// creation timestamps, and edit/delete callbacks.
// ===============================================================

import React from "react";

function NoteCard({ note, onEdit, onDelete }) {
  const createdTime = note.createdAt
    ? new Date(note.createdAt).toLocaleDateString()
    : "";

  return (
    <article className="item-card">
      <div className="item-content">
        <h3>{note.title}</h3>
        <p style={{ whiteSpace: "pre-wrap" }}>{note.content}</p>

        <div className="item-meta">
          {createdTime && <span>📝 Created: {createdTime}</span>}
        </div>

        <div className="item-id">ID: {note._id}</div>
      </div>

      <div className="card-actions">
        <button
          type="button"
          className="btn-edit"
          onClick={() => onEdit(note)}
        >
          ✏️ Edit
        </button>
        <button
          type="button"
          className="btn-danger"
          onClick={() => onDelete(note._id)}
        >
          🗑️ Delete
        </button>
      </div>
    </article>
  );
}

export default NoteCard;
