const express = require("express");

// Controllers
const {
  bakeryCreate,
  bakeryList,
  bakeryUpdate,
  bakeryDelete,
  fetchBakery,
  cookieCreate,
} = require("../controllers/bakeryControllers");

// Middleware
const upload = require("../middleware/multer");
const passport = require("passport");

const router = express.Router();

router.param("bakeryId", async (req, res, next, bakeryId) => {
  const bakery = await fetchBakery(bakeryId, next);
  if (bakery) {
    req.bakery = bakery;
    next();
  } else {
    const err = new Error("Bakery not found");
    err.status = 404;
    next(err);
  }
});

// Bakery List
router.get("/", bakeryList);

// Bakery Create
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  bakeryCreate
);

// Bakery Update
router.put("/:bakeryId", upload.single("image"), bakeryUpdate);

// Bakery Delete
router.delete("/:bakeryId", bakeryDelete);

// Cookie Create
router.post("/:bakeryId/cookies", upload.single("image"), cookieCreate);

module.exports = router;
