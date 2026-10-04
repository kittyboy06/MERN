# CampusHub — System Design & Architecture Specification

## 1. Executive Summary & Purpose
**CampusHub** is a clean, educational Student Campus Management System built using the MERN stack (MongoDB, Express.js, React, Node.js). It is designed specifically to demonstrate the fundamental full-stack concepts taught in college web development courses without commercial abstractions or external framework bloat.

The application allows students to manage four core campus resources:
1. **Students** (Campus directory)
2. **Assignments** (Coursework tracker)
3. **Events** (Campus events calendar)
4. **Notes** (Quick study and meeting notes)

---

## 2. Core Constraints & Curriculum Alignment
* **Source Alignment:** Strictly limited to concepts in `Reactjs-MERN-Stack-Teaching-Guide.pptx`, `Full-Stack-Web-Development-Workshop.pptx`, and the classroom sample reference projects (`student-app` and `student-fullstack-node-express-mongodb`).
* **Technology Restrictions:**
  - **Allowed:** React 19, Vite, plain JavaScript (ES6+), JSX, `useState`, `useEffect`, React Router (`react-router-dom`), Fetch API, Express.js, Mongoose, MongoDB, `cors`, `dotenv`.
  - **Disallowed:** TypeScript, Redux, Zustand, React Query, Axios, Next.js, Tailwind CSS, Bootstrap, Material UI, JWT/Auth, Docker, Redis, controllers/services/repositories patterns.
* **Workspace Placement:** Generated directly at workspace root (`d:\Projects\Clg\MERN\backend` and `d:\Projects\Clg\MERN\frontend`).

---

## 3. Assumptions & Non-Functional Requirements
1. **Scale & Performance:** Designed for single-student local demonstration (< 1,000 documents per collection) with instant local network latency.
2. **Database:** Local MongoDB instance running on `mongodb://127.0.0.1:27017/campushub` with environment variable fallback via `dotenv`.
3. **Reliability & Errors:** Descriptive HTTP response codes (200, 201, 400, 404, 500) and graceful UI error/loading state rendering without crashing.
4. **Pedagogical Clarity:** Small, readable files with beginner-friendly inline comments explaining key MERN concepts.

---

## 4. Architectural Decision Log

| Decision | Selected Option | Alternatives Considered | Rationale |
| :--- | :--- | :--- | :--- |
| **Architectural Pattern** | Direct Parallel Pattern | Generic CRUD Helper / Monolith | Keeps each module self-contained and identical in structure, enabling easy code comparison and zero confusion for learners. |
| **Frontend CRUD Edit Flow** | Top Form Edit + Cancel | Inline Card Edit / Modal Dialog | Clicking "Edit" populates the top form, converts "Add" to "Update", and displays a "Cancel" button. Avoids modal libraries or complex component state. |
| **Workspace Placement** | Root `backend/` and `frontend/` | Nested `campushub/` subfolder | Direct access to both directories from workspace root. |
| **Database Config** | `dotenv` with fallback | Hardcoded connection string | Mirrors classroom standard (`process.env.MONGO_URI \|\| "mongodb://127.0.0.1:27017/campushub"`). |
| **Routing & Navigation** | `react-router-dom` with `NavLink` | Tab state in `App.jsx` | Teaches real client-side single page application routing and URL navigation. |

---

## 5. System Directory Layout

```text
MERN/
├── backend/
│   ├── package.json           # Dependencies: express, mongoose, cors, dotenv
│   ├── .env.example           # PORT=5000, MONGO_URI=mongodb://127.0.0.1:27017/campushub
│   ├── server.js              # Server entry point, middleware, DB connection & route mounts
│   ├── middleware/
│   │   └── logger.js          # Custom request logging middleware (method, URL, timestamp)
│   ├── models/
│   │   ├── Student.js         # Mongoose schema for Student
│   │   ├── Assignment.js      # Mongoose schema for Assignment
│   │   ├── Event.js           # Mongoose schema for Event
│   │   └── Note.js            # Mongoose schema for Note
│   └── routes/
│       ├── studentRoutes.js   # CRUD endpoints for students + query filtering
│       ├── assignmentRoutes.js# CRUD endpoints for assignments + status filter
│       ├── eventRoutes.js     # CRUD endpoints for events + venue filter
│       └── noteRoutes.js      # CRUD endpoints for notes + title search filter
├── frontend/
│   ├── index.html             # Vite HTML root
│   ├── vite.config.js         # React Vite plugin config
│   ├── package.json           # Dependencies: react, react-dom, react-router-dom
│   └── src/
│       ├── main.jsx           # React DOM root wrapping App with BrowserRouter
│       ├── App.jsx            # Layout shell rendering Navbar and Routes
│       ├── App.css            # Vanilla CSS styling (cards, forms, responsive grid)
│       ├── components/
│       │   ├── Navbar.jsx     # Navigation bar with NavLink active states
│       │   ├── StudentCard.jsx
│       │   ├── AssignmentCard.jsx
│       │   ├── EventCard.jsx
│       │   └── NoteCard.jsx
│       └── pages/
│           ├── Home.jsx       # Overview dashboard with campus summary cards
│           ├── Students.jsx   # Form, filter, and student list
│           ├── Assignments.jsx# Form, filter, and assignment list
│           ├── Events.jsx     # Form, filter, and event list
│           └── Notes.jsx      # Form, filter, and note list
├── CAMPUSHUB_DESIGN.md        # This validated architecture document
└── README.md                  # Comprehensive setup guide and curriculum explanations
```

---

## 6. Backend Specification

### 6.1 Server & Middleware Pipeline (`server.js`)
1. `cors()`: Cross-Origin Resource Sharing for Vite origin.
2. `express.json()`: Parses incoming JSON payloads into `req.body`.
3. `logger` (`middleware/logger.js`): Timestamped request logger.
4. Health endpoint: `GET /` returns API metadata and available endpoints.
5. Resource route mounts: `/api/students`, `/api/assignments`, `/api/events`, `/api/notes`.
6. 404 handler for unknown routes.
7. Database connection: `mongoose.connect()` starts `app.listen(PORT, ...)`.

### 6.2 Data Models (`models/`)
* **Student (`models/Student.js`):**
  - `name`: String, required, trim
  - `department`: String, required, trim
  - `year`: Number, required, min: 1, max: 6
  - `timestamps`: true
* **Assignment (`models/Assignment.js`):**
  - `title`: String, required, trim
  - `subject`: String, required, trim
  - `dueDate`: Date, required
  - `status`: String, enum: `["Pending", "Completed"]`, default: `"Pending"`
  - `timestamps`: true
* **Event (`models/Event.js`):**
  - `title`: String, required, trim
  - `description`: String, required, trim
  - `date`: Date, required
  - `venue`: String, required, trim
  - `timestamps`: true
* **Note (`models/Note.js`):**
  - `title`: String, required, trim
  - `content`: String, required, trim
  - `timestamps`: true

### 6.3 REST API Endpoints (`routes/`)
Each route file implements full CRUD using async/await and Mongoose queries:
* `GET /api/<resource>`: Reads collection with `.find(filter).sort({ createdAt: -1 })`. Reads optional filters from `req.query`.
* `GET /api/<resource>/:id`: Validates ID via `mongoose.isValidObjectId(id)`, returns 404 if not found.
* `POST /api/<resource>`: Validates body fields, invokes `Model.create(req.body)`, returns 201.
* `PUT /api/<resource>/:id`: Invokes `Model.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })`.
* `DELETE /api/<resource>/:id`: Invokes `Model.findByIdAndDelete(id)`.

---

## 7. Frontend Specification

### 7.1 Component Hierarchy
```text
App
├── Navbar (NavLinks to /, /students, /assignments, /events, /notes)
└── Routes
    ├── Home (Dashboard overview & quick links)
    ├── Students ──> StudentCard
    ├── Assignments ──> AssignmentCard
    ├── Events ──> EventCard
    └── Notes ──> NoteCard
```

### 7.2 UI State Lifecycle & CRUD Handling
* **Controlled Form:** One state object per page (e.g., `form: { name: "", department: "", year: 1 }`).
* **Editing State (`editingId`):**
  - Defaults to `null` (Create mode). Submit button text: `"Add <Resource>"`.
  - When "Edit" is clicked on a card, `editingId` is set to `item._id` and form fields are populated.
  - Submit button text changes to `"Update <Resource>"` and a `"Cancel"` button appears.
  - Submitting sends a `PUT` request; cancelling resets `editingId` to `null` and empties form fields.
* **Deletion:** Prompts `window.confirm()`, issues `DELETE /api/<resource>/:id`, and refreshes items.
* **Search / Filter:** Controlled input bound to `filter` state. `useEffect(() => { fetchItems(); }, [filter])` queries `?query=value`.
* **State Feedback:** Explicit conditional renders for `loading`, `error`, empty lists (`items.length === 0`), and populated card lists with stable MongoDB `_id` keys.

---

## 8. Step-by-Step Verification Checklist
- [ ] MongoDB connection succeeds on `mongodb://127.0.0.1:27017/campushub`.
- [ ] Express server starts on port 5000 and logs incoming requests.
- [ ] Vite frontend starts on port 5173.
- [ ] Navigation works seamlessly across all 5 routes.
- [ ] Full CRUD (Create, Read with query, Update via top form, Delete) verified for Students.
- [ ] Full CRUD verified for Assignments.
- [ ] Full CRUD verified for Events.
- [ ] Full CRUD verified for Notes.
- [ ] Educational comments present across all files explaining core concepts.
- [ ] Beginner-friendly `README.md` documents setup and MERN concepts.
