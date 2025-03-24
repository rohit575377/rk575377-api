const express = require("express");
const { usersList } = require("./data");

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "API is running" });
});

// GET /api/users - Retrieve all users
app.get("/api/users", (req, res) => {
  res.json(usersList);
});

// GET /api/users/:id - Retrieve a user by ID
app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const user = usersList.find(user => user.id === parseInt(id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// POST /api/users - Add a new user
app.post("/api/users", (req, res) => {
  const { name, age, address, gender } = req.body;
  const newUser = {
    id: usersList.length + 1, // Assign a new ID
    name,
    age,
    address,
    gender
  };
  usersList.push(newUser);
  res.json(newUser);
});

// PUT /api/users/:id - Update an existing user by ID
app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, address, gender } = req.body;
  const user = usersList.find(user => user.id === parseInt(id));
  if (user) {
    user.name = name;
    user.age = age;
    user.address = address;
    user.gender = gender;
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// DELETE /api/users/:id - Delete a user by ID
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const user = usersList.find(user => user.id === parseInt(id));
  if (user) {
    usersList.splice(usersList.indexOf(user), 1);  
    res.json({ message: "User deleted" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// catch all other routes
app.use("**", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(4000, () => {
  console.log("API is running on port 4000");
});
