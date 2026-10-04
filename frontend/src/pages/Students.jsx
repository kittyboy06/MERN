import React, { useState, useEffect } from "react";
import StudentCard from "../components/StudentCard.jsx";

const API_URL = "http://localhost:5000/api/students";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [departmentFilter, setDepartmentFilter] = useState("");

  const initialForm = { name: "", department: "", year: 1 };
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  async function fetchStudents() {
    setLoading(true);
    setError(null);

    try {
      const query = departmentFilter.trim()
        ? `?department=${encodeURIComponent(departmentFilter.trim())}`
        : "";

      const response = await fetch(`${API_URL}${query}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch students");
      }

      const data = await response.json();
      setStudents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStudents();
  }, [departmentFilter]);

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
        body: JSON.stringify({
          name: form.name.trim(),
          department: form.department.trim(),
          year: Number(form.year)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Failed to ${isEditing ? "update" : "add"} student`);
      }

      setForm(initialForm);
      setEditingId(null);
      fetchStudents();
    } catch (err) {
      setError(err.message);
    }
  }

  function handleStartEdit(student) {
    setEditingId(student._id);
    setForm({
      name: student.name,
      department: student.department,
      year: student.year
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(initialForm);
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("Are you sure you want to delete this student?");
    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete student");
      }

      if (editingId === id) {
        handleCancelEdit();
      }

      fetchStudents();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="container">
      <header className="page-header">
        <h1>👥 Student Management</h1>
        <p>Manage student records, departments, and academic years.</p>
      </header>

      {error && <div className="error-banner">⚠️ {error}</div>}

      <section className="card">
        <h2>{editingId ? "✏️ Edit Student" : "➕ Add New Student"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Student Name:</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Arun Kumar"
              value={form.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department:</label>
            <input
              id="department"
              name="department"
              type="text"
              placeholder="e.g. Computer Science / AIML"
              value={form.department}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="year">Year of Study (1 - 6):</label>
            <input
              id="year"
              name="year"
              type="number"
              min="1"
              max="6"
              value={form.year}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {editingId ? "Update Student" : "Add Student"}
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
        <h2>🔍 Filter by Department</h2>
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Type department (e.g. AIML) to filter..."
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          />
          {departmentFilter && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setDepartmentFilter("")}
            >
              Clear Filter
            </button>
          )}
        </div>
      </section>

      <section className="card">
        <div className="section-heading">
          <h2>
            Enrolled Students{" "}
            <span className="item-count">({students.length} found)</span>
          </h2>
          <button
            type="button"
            className="btn-secondary"
            onClick={fetchStudents}
          >
            🔄 Refresh
          </button>
        </div>

        {loading ? (
          <p className="loading-text">Loading student records...</p>
        ) : students.length === 0 ? (
          <p className="empty-text">No students found. Add one using the form above!</p>
        ) : (
          <div className="items-grid">
            {students.map((student) => (
              <StudentCard
                key={student._id}
                student={student}
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

export default Students;
