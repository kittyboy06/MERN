import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/students";

function App() {
  const [students, setStudents] = useState([]);
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    department: "",
    year: 3
  });

  // ==========================================
  // GET students + QUERY PARAMETERS
  // ==========================================

  async function fetchStudents() {
    setLoading(true);

    try {
      const query = department
        ? `?department=${encodeURIComponent(department)}`
        : "";

      const response = await fetch(`${API_URL}${query}`);

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const data = await response.json();
      setStudents(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStudents();
  }, [department]);

  // ==========================================
  // POST student
  // ==========================================

  async function addStudent(event) {
    event.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          year: Number(form.year)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add student");
      }

      setForm({
        name: "",
        department: "",
        year: 3
      });

      fetchStudents();
    } catch (error) {
      alert(error.message);
    }
  }

  // ==========================================
  // DELETE student + ROUTE PARAMETER
  // ==========================================

  async function deleteStudent(id) {
    if (!window.confirm("Delete this student?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete student");
      }

      fetchStudents();
    } catch (error) {
      alert(error.message);
    }
  }

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  return (
    <div className="container">
      <header>
        <h1>Student Management System</h1>
        <p>React + Express + MongoDB</p>
      </header>

      <section className="card">
        <h2>Add Student</h2>

        <form onSubmit={addStudent}>
          <input
            name="name"
            placeholder="Student name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="department"
            placeholder="Department e.g. AIML"
            value={form.department}
            onChange={handleChange}
            required
          />

          <input
            name="year"
            type="number"
            min="1"
            max="6"
            placeholder="Year"
            value={form.year}
            onChange={handleChange}
            required
          />

          <button type="submit">Add Student</button>
        </form>
      </section>

      <section className="card">
        <h2>Search / Filter</h2>

        <input
          placeholder="Enter department: AIML"
          value={department}
          onChange={(event) => setDepartment(event.target.value)}
        />

        <button
          className="secondary"
          onClick={() => setDepartment("")}
        >
          Show All
        </button>
      </section>

      <section className="card">
        <div className="section-heading">
          <h2>Students</h2>
          <button className="secondary" onClick={fetchStudents}>
            Refresh
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : students.length === 0 ? (
          <p>No students found.</p>
        ) : (
          <div className="students">
            {students.map((student) => (
              <article className="student" key={student._id}>
                <div>
                  <h3>{student.name}</h3>
                  <p>Department: {student.department}</p>
                  <p>Year: {student.year}</p>
                  <small>ID: {student._id}</small>
                </div>

                <button
                  className="danger"
                  onClick={() => deleteStudent(student._id)}
                >
                  Delete
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
