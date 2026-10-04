// ===============================================================
// Component: StudentCard
// Demonstrates:
// 1. Reusable React component receiving data via props.
// 2. Prop immutability: Props are read-only and never modified here.
// 3. Callback props (onEdit, onDelete) to notify parent component of actions.
// ===============================================================

import React from "react";

function StudentCard({ student, onEdit, onDelete }) {
  return (
    <article className="item-card">
      <div className="item-content">
        <h3>{student.name}</h3>
        <p>Department: <strong>{student.department}</strong></p>
        <p>Year of Study: <strong>{student.year}</strong></p>
        <div className="item-id">ID: {student._id}</div>
      </div>

      <div className="card-actions">
        {/* Trigger edit callback in parent component with student object */}
        <button
          type="button"
          className="btn-edit"
          onClick={() => onEdit(student)}
        >
          ✏️ Edit
        </button>

        {/* Trigger delete callback in parent component with student ID */}
        <button
          type="button"
          className="btn-danger"
          onClick={() => onDelete(student._id)}
        >
          🗑️ Delete
        </button>
      </div>
    </article>
  );
}

export default StudentCard;
