require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db.config");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/user.routes"));
app.use("/api/blogs", require("./routes/blog.routes"));

sequelize.authenticate().then(() => {
  console.log("Connection has been established successfully.");

  sequelize.sync({
    force: false,
    alter: false,
    logging: false
  }).then(() => {
    console.log("All models were synchronized successfully.");

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
      console.log(`API is running on port ${PORT}`);
    });
  }).catch(err => {
    console.error("Unable to connect to the database:", err);
    process.exit(1);
  });
}).catch(err => {
  console.error("Unable to connect to the database:", err);
  process.exit(1);
});

// ---------------------------------------- Extra

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`API is running on port ${PORT}`);
// });


// ---- method 1
// sequelize
//   .authenticate()
//   .then(() => console.log('Connection has been established successfully.'))
//   .then(async () => {
//     await sequelize.sync({ force: true });
//     console.log('All models were synchronized successfully.');
//   })
//   .catch(err => console.error('Unable to connect to the database:', err));

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`API is running on port ${PORT}`);
// });

// ---- method 2
// sequelize
//   .authenticate()
//   .then(() => console.log('Connection has been established successfully.'))
//   .then(() => sequelize.sync({ force: true }))
//   .then(() => console.log('All models were synchronized successfully.'))
//   .catch(err => console.error('Unable to connect to the database:', err));