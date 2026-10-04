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
        <button
          type="button"
          className="btn-edit"
          onClick={() => onEdit(student)}
        >
          ✏️ Edit
        </button>

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
