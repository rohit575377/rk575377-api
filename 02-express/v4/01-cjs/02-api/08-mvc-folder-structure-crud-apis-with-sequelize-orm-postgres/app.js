require("dotenv").config();
const express = require("express");
const sequelize = require("./config/db.config");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/user.routes"));

app.use("**", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const errorMessage = "Internal Server Error";
  const errorStatus = err.status || 500;

  let errorResponse = {};
  if (process.env.NODE_ENV === "development") {
    errorResponse = {
      message: errorMessage,
      err,
      stack: err.stack
    };
  }

  res.status(errorStatus).json(errorResponse);
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
  sequelize.sync({ force: false, alter: false, logging: false }).then(() => {
    console.log('All models were synchronized successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  })
}).catch(err => {
  console.error('Unable to connect to the database:', err);
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API is running on port ${PORT}`));