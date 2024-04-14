// const express = require("express");
// const cors = require("cors");
// const sqlite3 = require("sqlite3").verbose();
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Use CORS
// app.use(cors());

// // Remaining middleware
// app.use(express.json());

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// // Middleware
// app.use(express.json());

// // Database setup
// const db = new sqlite3.Database("./tasks.db", (err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log("Connected to the tasks database.");
// });

// db.serialize(() => {
//   db.run(`CREATE TABLE IF NOT EXISTS tasks (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     description TEXT NOT NULL
//   )`);
// });

// // Root endpoint
// app.get("/", (req, res) => {
//   res.send("Task Manager API is running...");
// });

// // API Endpoints
// // Fetch all tasks
// app.get("/tasks", (req, res) => {
//   db.all("SELECT * FROM tasks", [], (err, rows) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: rows,
//     });
//   });
// });

// // Add a new task
// app.post("/tasks", (req, res) => {
//   const { description } = req.body;
//   db.run(
//     `INSERT INTO tasks (description) VALUES (?)`,
//     [description],
//     function (err) {
//       if (err) {
//         res.status(400).json({ error: err.message });
//         return;
//       }
//       res.json({ message: "success", id: this.lastID });
//     }
//   );
// });

// // Delete a task
// app.delete("/tasks/:id", (req, res) => {
//   db.run(`DELETE FROM tasks WHERE id = ?`, req.params.id, function (err) {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({ message: "deleted", rows: this.changes });
//   });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // For parsing application/json

// Database setup
const db = new sqlite3.Database(
  "./tasks.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error("Error when creating the database", err);
    } else {
      console.log("Database connected!");
      // Create table if it does not exist
      db.run(`CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL
    )`);
    }
  }
);

// API Routes
// Get all tasks
app.get("/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Add a new task
app.post("/tasks", (req, res) => {
  const { description } = req.body;
  db.run(
    `INSERT INTO tasks (description) VALUES (?)`,
    [description],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ message: "success", id: this.lastID });
    }
  );
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  db.run(`DELETE FROM tasks WHERE id = ?`, req.params.id, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "deleted", rows: this.changes });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
