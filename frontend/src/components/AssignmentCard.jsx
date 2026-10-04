import React from "react";

function AssignmentCard({ assignment, onEdit, onDelete }) {
  const formattedDate = assignment.dueDate
    ? new Date(assignment.dueDate).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric"
      })
    : "No date";

  const isCompleted = assignment.status === "Completed";

  return (
    <article className="item-card">
      <div className="item-content">
        <h3>{assignment.title}</h3>
        <p>Subject: <strong>{assignment.subject}</strong></p>

        <div className="item-meta">
          <span>📅 Due: {formattedDate}</span>
          <span
            className={`badge ${
              isCompleted ? "badge-completed" : "badge-pending"
            }`}
          >
            {assignment.status || "Pending"}
          </span>
        </div>

        <div className="item-id">ID: {assignment._id}</div>
      </div>

      <div className="card-actions">
        <button
          type="button"
          className="btn-edit"
          onClick={() => onEdit(assignment)}
        >
          ✏️ Edit
        </button>
        <button
          type="button"
          className="btn-danger"
          onClick={() => onDelete(assignment._id)}
        >
          🗑️ Delete
        </button>
      </div>
    </article>
  );
}

export default AssignmentCard;
