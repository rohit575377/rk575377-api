const express = require("express");

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "API is running" });
});

// catch all other routes
app.use("**", (req, res) => {
  res.status(404).json({ message: "Route not found" });
})

app.listen(4000, () => {
  console.log("API is running on port 4000");
});