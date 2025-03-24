const express = require("express");

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "API is running" });
});

app.listen(4000, () => {
  console.log("API is running on port 4000");
});