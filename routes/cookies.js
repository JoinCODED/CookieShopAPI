const express = require("express");

// Controllers
const {
  cookieList,
  cookieUpdate,
  cookieDelete,
  fetchCookie,
} = require("../controllers/cookieControllers");

// Middleware
const upload = require("../middleware/multer");

const router = express.Router();

router.param("cookieId", async (req, res, next, cookieId) => {
  const cookie = await fetchCookie(cookieId, next);
  if (cookie) {
    req.cookie = cookie;
    next();
  } else {
    const err = new Error("Cookie not found");
    err.status = 404;
    next(err);
  }
});

// Cookie List
router.get("/", cookieList);

// Cookie Update
router.put("/:cookieId", upload.single("image"), cookieUpdate);

// Cookie Delete
router.delete("/:cookieId", cookieDelete);

module.exports = router;
