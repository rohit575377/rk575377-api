require("dotenv").config();
const express = require("express");
const connection = require("./db");

const app = express();
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "API is running" });
});

// GET /api/users - Retrieve all users
app.get("/api/users", (req, res) => {
  connection.query("SELECT * FROM users", (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving users" });
    } else {
      res.json(results);
    }
  });
});

// GET /api/users/:id - Retrieve a user by ID
app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  connection.query("SELECT * FROM users WHERE id = ?", [id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving user" });
    } else if (results.length === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json(results[0]);
    }
  });
});

// POST /api/users - Add a new user
app.post("/api/users", (req, res) => {
  const { name, age, address, gender } = req.body;
  connection.query("INSERT INTO users (name, age, address, gender) VALUES (?, ?, ?, ?)", [name, age, address, gender], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "Error adding user" });
    } else {
      res.json({ message: "User added successfully" });
    }
  });
});

// PUT /api/users/:id - Update a user by ID
app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, address, gender } = req.body;
  connection.query("UPDATE users SET name = ?, age = ?, address = ?, gender = ? WHERE id = ?", [name, age, address, gender, id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating user" });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json({ message: "User updated successfully" });
    }
  });
});

// DELETE /api/users/:id - Delete a user by ID
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  connection.query("DELETE FROM users WHERE id = ?", [id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting user" });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json({ message: "User deleted successfully" });
    }
  });
});

app.use("**", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`);
});
