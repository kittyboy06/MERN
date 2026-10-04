import React, { useState, useEffect } from "react";
import AssignmentCard from "../components/AssignmentCard.jsx";

const API_URL = "http://localhost:5000/api/assignments";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");

  const initialForm = {
    title: "",
    subject: "",
    dueDate: "",
    status: "Pending"
  };
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  async function fetchAssignments() {
    setLoading(true);
    setError(null);

    try {
      const query = statusFilter
        ? `?status=${encodeURIComponent(statusFilter)}`
        : "";

      const response = await fetch(`${API_URL}${query}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch assignments");
      }

      const data = await response.json();
      setAssignments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAssignments();
  }, [statusFilter]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
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
          data.message || `Failed to ${isEditing ? "update" : "create"} assignment`
        );
      }

      setForm(initialForm);
      setEditingId(null);
      fetchAssignments();
    } catch (err) {
      setError(err.message);
    }
  }

  function handleStartEdit(assignment) {
    setEditingId(assignment._id);

    const dateFormatted = assignment.dueDate
      ? new Date(assignment.dueDate).toISOString().split("T")[0]
      : "";

    setForm({
      title: assignment.title,
      subject: assignment.subject,
      dueDate: dateFormatted,
      status: assignment.status || "Pending"
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(initialForm);
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this assignment?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete assignment");
      }

      if (editingId === id) {
        handleCancelEdit();
      }

      fetchAssignments();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="container">
      <header className="page-header">
        <h1>📚 Assignment Tracker</h1>
        <p>Track coursework deadlines, subjects, and completion statuses.</p>
      </header>

      {error && <div className="error-banner">⚠️ {error}</div>}

      <section className="card">
        <h2>{editingId ? "✏️ Edit Assignment" : "➕ Add New Assignment"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Assignment Title:</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g. MERN Fullstack Milestone 1"
              value={form.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject / Course:</label>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="e.g. Web Development"
              value={form.subject}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date:</label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={form.dueDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleInputChange}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {editingId ? "Update Assignment" : "Add Assignment"}
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

      <section className="card">
        <h2>🔍 Filter by Status</h2>
        <div className="filter-bar">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Assignments</option>
            <option value="Pending">Pending Only</option>
            <option value="Completed">Completed Only</option>
          </select>
          {statusFilter && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setStatusFilter("")}
            >
              Clear Filter
            </button>
          )}
        </div>
      </section>

      <section className="card">
        <div className="section-heading">
          <h2>
            Assignments List{" "}
            <span className="item-count">({assignments.length} total)</span>
          </h2>
          <button
            type="button"
            className="btn-secondary"
            onClick={fetchAssignments}
          >
            🔄 Refresh
          </button>
        </div>

        {loading ? (
          <p className="loading-text">Loading assignments...</p>
        ) : assignments.length === 0 ? (
          <p className="empty-text">No assignments found.</p>
        ) : (
          <div className="items-grid">
            {assignments.map((assignment) => (
              <AssignmentCard
                key={assignment._id}
                assignment={assignment}
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

export default Assignments;
