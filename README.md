# 🎓 CampusHub — Student Campus Management System

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-4.21-lightgrey.svg)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-purple.svg)](https://vitejs.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%208-brightgreen.svg)](https://mongoosejs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**CampusHub** is a clean, modern, educational Student Campus Management application built on the **MERN** stack (**M**ongoDB, **E**xpress.js, **R**eact, **N**ode.js). 

It is designed to demonstrate full-stack web development principles: component architectures, state lifecycles, RESTful API conventions, custom middleware, and schema-driven database modeling.

---

## 📌 Table of Contents

- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Getting Started (Local Development)](#-getting-started-local-development)
  - [1. Clone Repository](#1-clone-the-repository)
  - [2. Start Local MongoDB](#2-start-local-mongodb)
  - [3. Setup Backend](#3-setup-backend)
  - [4. Setup Frontend](#4-setup-frontend)
- [System Architecture](#-system-architecture)
  - [Data Flow Diagram](#data-flow-diagram)
  - [Directory Structure](#directory-structure)
- [Database Schemas](#-database-schemas)
- [REST API Reference](#-rest-api-reference)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Troubleshooting](#-troubleshooting)
- [Educational Guide (MERN Concepts)](#-educational-guide-mern-concepts)
- [License](#-license)

---

## ✨ Key Features

* **👥 Student Directory:** Track student names, academic departments (e.g., CSE, AIML, ECE), and years of study (1–6). Includes instant search filtering by department.
* **📚 Assignment Tracker:** Keep track of coursework titles, subjects, submission deadlines (HTML5 date picker), and statuses (`Pending` vs `Completed`).
* **📅 Campus Events:** Schedule seminars, symposiums, and club meetings with full descriptions, dates, and venues.
* **📝 Study Notes & Reminders:** Create, search, and manage revision notes and code snippets with multi-field search across titles and content.
* **⚡ Full CRUD Operations:** Every module supports Create, Read (with query parameters), Update (using an intuitive top-form edit pattern with cancel option), and Delete.
* **🎯 Pure Vanilla CSS:** High-performance responsive layouts, card grids, badges, and modals styled in pure CSS without bulky framework overhead.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend UI** | [React 19](https://react.dev/) | Component-based view rendering with Hooks (`useState`, `useEffect`) |
| **Bundler & Dev Server** | [Vite 6](https://vitejs.dev/) | Lightning-fast HMR (Hot Module Replacement) and ES module bundling |
| **Client Routing** | [React Router 7](https://reactrouter.com/) | Client-side Single Page Application (SPA) routing without full page reloads |
| **HTTP Client** | Native Browser Fetch API | Standards-based HTTP requests (`GET`, `POST`, `PUT`, `DELETE`) with JSON payloads |
| **Styling** | Vanilla CSS (`App.css`) | Responsive design, modern CSS variables, Flexbox & CSS Grid |
| **Backend Runtime** | [Node.js](https://nodejs.org/) | Asynchronous JavaScript runtime environment |
| **Server Framework** | [Express.js 4](https://expressjs.com/) | REST API routing, request handling, and middleware pipeline |
| **CORS Middleware** | `cors` | Cross-Origin Resource Sharing handling between client (:5173) and server (:5000) |
| **Database ODM** | [Mongoose 8](https://mongoosejs.com/) | Schema validation, type casting, query building, and document lifecycle hooks |
| **Database** | [MongoDB](https://www.mongodb.com/) | Flexible NoSQL document database |

---

## 📋 Prerequisites

Before running the application, make sure you have the following installed on your system:

- **Node.js** (v18.0.0 or higher recommended) — [Download Node.js](https://nodejs.org/)
- **npm** (v9.0.0 or higher, bundled with Node.js)
- **MongoDB Community Server** (v6.0 or higher) — [Download MongoDB](https://www.mongodb.com/try/download/community)

Verify installation in your terminal:
```bash
node -v
npm -v
mongod --version
```

---

## 🚀 Getting Started (Local Development)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/campushub.git
cd campushub
```

---

### 2. Start Local MongoDB

Make sure your MongoDB server is active on port `27017`:

**Windows (PowerShell as Administrator or Service):**
```powershell
net start MongoDB
# Or verify with:
Get-Service -Name MongoDB
```

**macOS (Homebrew):**
```bash
brew services start mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
sudo systemctl start mongod
sudo systemctl status mongod
```

---

### 3. Setup Backend

Open a terminal and navigate to `backend`:

```bash
cd backend

# Install dependencies
npm install

# (Optional) Review environment variables
cp .env.example .env

# Start the backend server
node server.js
# Or start with auto-reload (Node.js 18+):
npm run dev
```

The server will connect to MongoDB and output:
```text
==========================================
MongoDB connected successfully to: mongodb://127.0.0.1:27017/campushub
==========================================
CampusHub Server running at http://localhost:5000
```

---

### 4. Setup Frontend

Open a **second terminal** and navigate to `frontend`:

```bash
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Open your browser and navigate to:
👉 **[http://localhost:5173](http://localhost:5173)**

---

## 🏛️ System Architecture

### Data Flow Diagram

```text
┌─────────────────────────────────────────────────────────────┐
│                      Browser (Client)                       │
│                                                             │
│   React UI Components (Navbar, StudentCard, Form Inputs)    │
│        ▲                                       │            │
│        │ State Update (useState)               │ fetch()    │
│        │                                       ▼            │
│   React Hooks (useEffect)  ◄────────  JSON Response         │
└───────────────────────────────────────────────┬─────────────┘
                                                │ HTTP / REST
                                                ▼
┌─────────────────────────────────────────────────────────────┐
│                    Express Backend (:5000)                  │
│                                                             │
│  Incoming Request                                           │
│        │                                                    │
│        ▼                                                    │
│  Middleware Pipeline: cors() ➔ express.json() ➔ logger      │
│        │                                                    │
│        ▼                                                    │
│  Router Switch:                                             │
│    /api/students    ➔ studentRoutes.js                      │
│    /api/assignments ➔ assignmentRoutes.js                   │
│    /api/events      ➔ eventRoutes.js                        │
│    /api/notes       ➔ noteRoutes.js                         │
│        │                                                    │
│        ▼                                                    │
│  Mongoose Models: Schema Validation (String, Number, Date)  │
└───────────────────────────────────────────────┬─────────────┘
                                                │ MongoDB Protocol
                                                ▼
┌─────────────────────────────────────────────────────────────┐
│                   MongoDB Database (:27017)                 │
│                                                             │
│       Database: campushub                                   │
│       Collections: students, assignments, events, notes     │
└─────────────────────────────────────────────────────────────┘
```

> **Fundamental Principle:** The React frontend **never** connects directly to MongoDB. All data retrieval and persistence is mediated strictly by the Express REST API.

---

### Directory Structure

```text
campushub/
├── backend/
│   ├── package.json           # Dependencies: express, mongoose, cors, dotenv
│   ├── .env.example           # PORT=5000, MONGO_URI=mongodb://127.0.0.1:27017/campushub
│   ├── server.js              # Server entry point, middleware, DB connection & route mounts
│   ├── middleware/
│   │   └── logger.js          # Custom request logging middleware (timestamp, method, URL)
│   ├── models/
│   │   ├── Student.js         # Mongoose schema for Student
│   │   ├── Assignment.js      # Mongoose schema for Assignment
│   │   ├── Event.js           # Mongoose schema for Event
│   │   └── Note.js            # Mongoose schema for Note
│   └── routes/
│       ├── studentRoutes.js   # CRUD routes for students + department filter
│       ├── assignmentRoutes.js# CRUD routes for assignments + status filter
│       ├── eventRoutes.js     # CRUD routes for events + venue filter
│       └── noteRoutes.js      # CRUD routes for notes + keyword search filter
│
├── frontend/
│   ├── index.html             # Vite entry HTML
│   ├── package.json           # Dependencies: react, react-dom, react-router-dom
│   ├── vite.config.js         # Vite configuration
│   └── src/
│       ├── main.jsx           # Mounts React DOM with BrowserRouter
│       ├── App.jsx            # Application shell with Navbar & Route switch
│       ├── App.css            # Vanilla CSS styling
│       ├── components/
│       │   ├── Navbar.jsx     # Navigation bar with NavLink active states
│       │   ├── StudentCard.jsx# Card component for student items
│       │   ├── AssignmentCard.jsx # Card component with status badge
│       │   ├── EventCard.jsx  # Card component with formatted dates
│       │   └── NoteCard.jsx   # Card component for notes
│       └── pages/
│           ├── Home.jsx       # Welcome dashboard & quick navigation
│           ├── Students.jsx   # Students management page
│           ├── Assignments.jsx# Assignment management page
│           ├── Events.jsx     # Events calendar page
│           └── Notes.jsx      # Notes & reminders page
│
├── .gitignore                 # Comprehensive Git ignore rules
├── CAMPUSHUB_DESIGN.md        # Validated architectural design document
└── README.md                  # Complete project documentation
```

---

## 🗄️ Database Schemas

All models enforce `{ timestamps: true }`, creating automatic `createdAt` and `updatedAt` fields.

### 1. Student (`backend/models/Student.js`)
| Field | Type | Required | Constraints |
| :--- | :--- | :--- | :--- |
| `name` | String | Yes | Trimmed |
| `department` | String | Yes | Trimmed |
| `year` | Number | Yes | Min: `1`, Max: `6` |

### 2. Assignment (`backend/models/Assignment.js`)
| Field | Type | Required | Constraints |
| :--- | :--- | :--- | :--- |
| `title` | String | Yes | Trimmed |
| `subject` | String | Yes | Trimmed |
| `dueDate` | Date | Yes | Valid Date |
| `status` | String | Yes | Enum: `["Pending", "Completed"]` (Default: `"Pending"`) |

### 3. Event (`backend/models/Event.js`)
| Field | Type | Required | Constraints |
| :--- | :--- | :--- | :--- |
| `title` | String | Yes | Trimmed |
| `description` | String | Yes | Trimmed |
| `date` | Date | Yes | Valid Date |
| `venue` | String | Yes | Trimmed |

### 4. Note (`backend/models/Note.js`)
| Field | Type | Required | Constraints |
| :--- | :--- | :--- | :--- |
| `title` | String | Yes | Trimmed |
| `content` | String | Yes | Trimmed |

---

## 🔌 REST API Reference

### Health & Information
- `GET /` — Returns API status, port, and directory of available endpoints.

---

### Student Endpoints (`/api/students`)

| Method | Endpoint | Query / Body Parameters | Success Status | Description |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/students` | `?department=AIML` (Optional) | `200 OK` | Fetch all students (filtered if query supplied) |
| `GET` | `/api/students/:id` | Route Param `:id` | `200 OK` | Fetch single student by MongoDB ID |
| `POST` | `/api/students` | Body: `{ name, department, year }` | `201 Created` | Create new student |
| `PUT` | `/api/students/:id` | Body: `{ name, department, year }` | `200 OK` | Update student details |
| `DELETE` | `/api/students/:id` | Route Param `:id` | `200 OK` | Delete student by ID |

---

### Assignment Endpoints (`/api/assignments`)

| Method | Endpoint | Query / Body Parameters | Success Status | Description |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/assignments` | `?status=Pending` (Optional) | `200 OK` | Fetch all assignments (ordered by due date) |
| `GET` | `/api/assignments/:id`| Route Param `:id` | `200 OK` | Fetch single assignment |
| `POST` | `/api/assignments` | Body: `{ title, subject, dueDate, status }` | `201 Created` | Create new assignment |
| `PUT` | `/api/assignments/:id`| Body: `{ title, subject, dueDate, status }` | `200 OK` | Update assignment |
| `DELETE` | `/api/assignments/:id`| Route Param `:id` | `200 OK` | Delete assignment |

---

### Event Endpoints (`/api/events`)

| Method | Endpoint | Query / Body Parameters | Success Status | Description |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/events` | `?venue=Auditorium` (Optional) | `200 OK` | Fetch all scheduled events |
| `GET` | `/api/events/:id` | Route Param `:id` | `200 OK` | Fetch single event |
| `POST` | `/api/events` | Body: `{ title, description, date, venue }` | `201 Created` | Create new campus event |
| `PUT` | `/api/events/:id` | Body: `{ title, description, date, venue }` | `200 OK` | Update event details |
| `DELETE` | `/api/events/:id` | Route Param `:id` | `200 OK` | Delete event |

---

### Note Endpoints (`/api/notes`)

| Method | Endpoint | Query / Body Parameters | Success Status | Description |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/notes` | `?search=keyword` (Optional) | `200 OK` | Search notes by title or content |
| `GET` | `/api/notes/:id` | Route Param `:id` | `200 OK` | Fetch single note |
| `POST` | `/api/notes` | Body: `{ title, content }` | `201 Created` | Create note |
| `PUT` | `/api/notes/:id` | Body: `{ title, content }` | `200 OK` | Update note |
| `DELETE` | `/api/notes/:id` | Route Param `:id` | `200 OK` | Delete note |

---

## ⚙️ Environment Variables

The backend supports configuration via `backend/.env`. A template is provided at `backend/.env.example`:

| Variable | Description | Default Value |
| :--- | :--- | :--- |
| `PORT` | Port number on which Express listens | `5000` |
| `MONGO_URI` | MongoDB connection URI | `mongodb://127.0.0.1:27017/campushub` |

---

## 📜 Available Scripts

### Backend (`cd backend`)
| Command | Description |
| :--- | :--- |
| `npm start` | Runs server with standard Node: `node server.js` |
| `npm run dev` | Runs server with automatic file watching: `node --watch server.js` |

### Frontend (`cd frontend`)
| Command | Description |
| :--- | :--- |
| `npm run dev` | Launches Vite local development server on `http://localhost:5173` |
| `npm run build` | Builds optimized production static assets into `frontend/dist/` |
| `npm run preview` | Locally previews production build output |

---

## 🔍 Troubleshooting

### 1. MongoDB Connection Refused (`ECONNREFUSED 127.0.0.1:27017`)
* **Cause:** The MongoDB database service is not running on your machine.
* **Solution:**
  - On Windows: Run `net start MongoDB` in PowerShell (or open Services and start "MongoDB Server").
  - On macOS: Run `brew services start mongodb-community`.
  - On Linux: Run `sudo systemctl start mongod`.

### 2. Port Conflict (`EADDRINUSE: address already in use :::5000`)
* **Cause:** Another process is running on port 5000.
* **Solution:**
  - Find and terminate the process on port 5000:
    ```powershell
    # Windows:
    Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force
    ```
  - Alternatively, change `PORT=5001` in `backend/.env`.

### 3. CORS Error in Browser Console (`Access-Control-Allow-Origin`)
* **Cause:** The frontend is attempting to call a backend where CORS is disabled.
* **Solution:** CampusHub already includes `app.use(cors())` in `backend/server.js`. Ensure your backend server is running and accessible at `http://localhost:5000`.

---

## 💡 Educational Guide (MERN Concepts)

This project was built to clearly illustrate the exact MERN concepts taught in computer science curricula:

1. **`useState` Hook:**  
   Stores mutable data (such as list of items, active filter, or form fields) that triggers a re-render when changed.
   ```jsx
   const [students, setStudents] = useState([]);
   ```

2. **`useEffect` Hook:**  
   Executes side effects (like fetching data from an external REST API) when a component mounts or when dependencies change.
   ```jsx
   useEffect(() => {
     fetchStudents();
   }, [departmentFilter]);
   ```

3. **Controlled Form Inputs:**  
   Form input values are driven directly by React state; every keystroke invokes `onChange` to synchronize state.
   ```jsx
   <input value={form.name} onChange={handleInputChange} />
   ```

4. **Express Middleware:**  
   Functions that intercept the HTTP request pipeline before route handlers are invoked:
   ```javascript
   app.use(cors());          // Handles cross-origin requests
   app.use(express.json());   // Parses JSON bodies into req.body
   app.use(logger);          // Custom logger
   ```

5. **Route Parameters vs Query Parameters:**
   * **Route Parameter (`req.params`):** Used to identify a specific document (e.g., `GET /api/students/:id`).
   * **Query Parameter (`req.query`):** Used for filtering and searching (e.g., `GET /api/students?department=AIML`).

6. **Mongoose Schema & Models:**  
   Enforces structural validation at the application layer before documents are saved to MongoDB.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
