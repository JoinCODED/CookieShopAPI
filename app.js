const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");

// Strategies
const { localStrategy, jwtStrategy } = require("./middleware/passport");

// DB
const db = require("./db");

// Routes
const bakeryRoutes = require("./routes/bakeries");
const cookieRoutes = require("./routes/cookies");
const userRoutes = require("./routes/users");

// Create Express App instance
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// Routers
app.use("/bakeries", bakeryRoutes);
app.use("/cookies", cookieRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));
app.use(userRoutes);

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
  console.log(`The application is running on localhost:8000`)
);
