const express = require("express");

// Controllers
const {
  cookieCreate,
  cookieList,
  cookieUpdate,
  cookieDelete,
  fetchCookie,
} = require("../controllers/cookieControllers");

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

// Cookie Create
router.post("/", cookieCreate);

// Cookie Update
router.put("/:cookieId", cookieUpdate);

// Cookie Delete
router.delete("/:cookieId", cookieDelete);

module.exports = router;
