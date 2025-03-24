require("dotenv").config();
const express = require("express");
const connection = require("./db");

const app = express();
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "API is running" });
});

// GET /api/users - Retrieve all users
app.get("/api/users", async (req, res) => {
  try {
    const [results] = await connection.query("SELECT * FROM users");
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving users" });
  }
});

// GET /api/users/:id - Retrieve a user by ID
app.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection.query("SELECT * FROM users WHERE id = ?", [id]);
    if (results.length === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json(results[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user" });
  }
});

// POST /api/users - Add a new user
app.post("/api/users", async (req, res) => {
  const { name, age, address, gender } = req.body;
  try {
    await connection.query("INSERT INTO users (name, age, address, gender) VALUES (?, ?, ?, ?)", [name, age, address, gender]);
    res.json({ message: "User added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding user" });
  }
});

// PUT /api/users/:id - Update a user by ID
app.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, address, gender } = req.body;
  try {
    const [results] = await connection.query("UPDATE users SET name = ?, age = ?, address = ?, gender = ? WHERE id = ?", [name, age, address, gender, id]);
    if (results.affectedRows === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json({ message: "User updated successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
});

// DELETE /api/users/:id - Delete a user by ID
app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection.query("DELETE FROM users WHERE id = ?", [id]);
    if (results.affectedRows === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json({ message: "User deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" });
  }
});

app.use("**", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`);
});
