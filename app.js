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

// Routers
app.use("/cookies", cookieRoutes);

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
