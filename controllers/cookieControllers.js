// Data
const { Cookie, Bakery } = require("../db/models");

exports.fetchCookie = async (cookieId, next) => {
  try {
    const cookie = await Cookie.findByPk(cookieId, {
      include: {
        model: Bakery,
        as: "bakery",
        attributes: ["userId"],
      },
    });
    return cookie;
  } catch (error) {
    next(error);
  }
};

exports.cookieList = async (req, res, next) => {
  try {
    const _cookies = await Cookie.findAll({
      attributes: { exclude: ["bakeryId", "createdAt", "updatedAt"] },
      include: {
        model: Bakery,
        as: "bakery",
        attributes: ["name"],
      },
    });
    res.json(_cookies);
  } catch (error) {
    next(error);
  }
};

exports.cookieUpdate = async (req, res, next) => {
  // console.log("exports.cookieUpdate -> req", req.cookie);
  try {
    if (req.user.id === req.cookie.bakery.userId) {
      if (req.file) {
        req.body.image = `${process.env.PORT ? "https" : "http"}://${req.get(
          "host"
        )}/media/${req.file.filename}`;
      }
      await req.cookie.update(req.body);
      res.status(204).end();
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.cookieDelete = async (req, res, next) => {
  try {
    if (req.user.id === req.cookie.bakery.userId) {
      await req.cookie.destroy();
      res.status(204).end();
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};
