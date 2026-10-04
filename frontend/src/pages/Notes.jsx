// ===============================================================
// Page: Notes.jsx
// Demonstrates:
// 1. Full CRUD for student notes and study materials
// 2. Multi-line content input and search filtering across text
// 3. Simple, readable state management and top-form editing
// ===============================================================

import React, { useState, useEffect } from "react";
import NoteCard from "../components/NoteCard.jsx";

const API_URL = "http://localhost:5000/api/notes";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");

  const initialForm = { title: "", content: "" };
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  // ===============================================================
  // READ: GET /api/notes (with optional search query)
  // ===============================================================
  async function fetchNotes() {
    setLoading(true);
    setError(null);

    try {
      const query = searchFilter.trim()
        ? `?search=${encodeURIComponent(searchFilter.trim())}`
        : "";

      const response = await fetch(`${API_URL}${query}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch notes");
      }

      const data = await response.json();
      setNotes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, [searchFilter]);

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
          data.message || `Failed to ${isEditing ? "update" : "save"} note`
        );
      }

      setForm(initialForm);
      setEditingId(null);
      fetchNotes();
    } catch (err) {
      setError(err.message);
    }
  }

  // ===============================================================
  // EDIT TRIGGER
  // ===============================================================
  function handleStartEdit(note) {
    setEditingId(note._id);
    setForm({
      title: note.title,
      content: note.content
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
    const confirmed = window.confirm("Are you sure you want to delete this note?");
    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete note");
      }

      if (editingId === id) {
        handleCancelEdit();
      }

      fetchNotes();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="container">
      <header className="page-header">
        <h1>📝 Study Notes & Reminders</h1>
        <p>Demonstrates text storage, multi-field search, and instant editing.</p>
      </header>

      {error && <div className="error-banner">⚠️ {error}</div>}

      {/* Controlled Form Card */}
      <section className="card">
        <h2>{editingId ? "✏️ Edit Note" : "➕ Write New Note"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Note Title:</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g. MERN Stack Exam Key Points"
              value={form.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              name="content"
              placeholder="Write your study notes, reminders, or code snippets here..."
              value={form.content}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {editingId ? "Update Note" : "Save Note"}
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

      {/* Search Filter Card */}
      <section className="card">
        <h2>🔍 Search Notes</h2>
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search keywords in title or content..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
          {searchFilter && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setSearchFilter("")}
            >
              Clear Search
            </button>
          )}
        </div>
      </section>

      {/* Notes List Card */}
      <section className="card">
        <div className="section-heading">
          <h2>
            Saved Notes <span className="item-count">({notes.length} total)</span>
          </h2>
          <button type="button" className="btn-secondary" onClick={fetchNotes}>
            🔄 Refresh
          </button>
        </div>

        {loading ? (
          <p className="loading-text">Loading notes...</p>
        ) : notes.length === 0 ? (
          <p className="empty-text">No notes found. Create your first note above!</p>
        ) : (
          <div className="items-grid">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
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

export default Notes;
