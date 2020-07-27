const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// DB
const db = require("./db");

// Routes
const cookieRoutes = require("./routes/cookies");

// Create Express App instance
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log("I'm a middleware method");
  next();
});

// Routers
app.use("/cookies", cookieRoutes);

// Not Found Paths
app.use((req, res, next) => {
  const error = new Error("Path Not Found");
  error.status = 404;
  next(error);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err.message || "Internal Server Error");
});

const run = async () => {
  try {
    await db.sync();
  } catch (error) {
    console.log("run -> error", error);
  }
};

run();

app.listen(8000, () =>
  console.log("The application is running on localhost:8000")
);
