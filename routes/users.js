const express = require("express");
const router = express.Router();
const passport = require("passport");

const { signup, signin } = require("../controllers/userControllers");

router.post("/signup", signup);

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
// TODO: explain what is session

module.exports = router;
