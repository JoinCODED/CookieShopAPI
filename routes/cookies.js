const express = require("express");

// Controllers
const {
  cookieCreate,
  cookieList,
  cookieUpdate,
  cookieDelete,
} = require("../controllers/cookieControllers");

const router = express.Router();

// Cookie List
router.get("/", cookieList);

// Cookie Create
router.post("/", cookieCreate);

// Cookie Update
router.put("/:cookieId", cookieUpdate);

// Cookie Delete
router.delete("/:cookieId", cookieDelete);

module.exports = router;
