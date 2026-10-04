# Student Full-Stack Project — React + Node.js + Express + MongoDB

A classroom-friendly project covering:

1. Node.js / Express recap
2. Server and Port
3. Middleware
4. Request and Response
5. Routes
6. Route Parameters
7. Query Parameters
8. REST API
9. MongoDB introduction
10. Mongoose
11. Schema and Model
12. CRUD APIs
13. React frontend connected to the backend

## Requirements

- Node.js installed
- MongoDB running locally on `mongodb://127.0.0.1:27017`
- A browser

## Project structure

```text
student-fullstack-node-express-mongodb/
├── backend/
│   ├── middleware/
│   │   └── logger.js
│   ├── models/
│   │   └── Student.js
│   ├── routes/
│   │   └── studentRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Backend setup

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` if desired.

Start:

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

## Frontend setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend normally runs at:

```text
http://localhost:5173
```

## API examples

### Get all students

```http
GET http://localhost:5000/api/students
```

### Query parameter

```http
GET http://localhost:5000/api/students?department=AIML
```

### Route parameter

```http
GET http://localhost:5000/api/students/<student_id>
```

### Add student

```http
POST http://localhost:5000/api/students
Content-Type: application/json

{
  "name": "Arun",
  "department": "AIML",
  "year": 3
}
```

### Update

```http
PUT http://localhost:5000/api/students/<student_id>
Content-Type: application/json

{
  "name": "Arun Kumar",
  "department": "CSE",
  "year": 4
}
```

### Delete

```http
DELETE http://localhost:5000/api/students/<student_id>
```

## Teaching flow

```text
React
  ↓ fetch()
Express Server :5000
  ↓
Middleware
  ↓
Routes
  ↓
Controller logic
  ↓
Mongoose Model
  ↓
MongoDB
```

## MongoDB terms

```text
Database   → studentDB
Collection → students
Document   → one student object
Field      → name, department, year
```

The application creates the `studentDB` database and `students` collection automatically when data is first inserted.
