// Data
const { Bakery, Cookie } = require("../db/models");

exports.fetchBakery = async (bakeryId, next) => {
  try {
    const bakery = await Bakery.findByPk(bakeryId);
    return bakery;
  } catch (error) {
    next(error);
  }
};

exports.bakeryList = async (req, res, next) => {
  try {
    const bakeries = await Bakery.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Cookie,
        as: "cookies",
        attributes: ["id"],
      },
    });
    res.json(bakeries);
  } catch (error) {
    next(error);
  }
};

exports.bakeryCreate = async (req, res, next) => {
  try {
    const foundBakery = await Bakery.findOne({
      where: { userId: req.user.id },
    });
    if (foundBakery) {
      const err = new Error("You already have a bakery");
      err.status = 403;
      return next(err);
    }
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    req.body.userId = req.user.id;
    const newBakery = await Bakery.create(req.body);
    res.status(201).json(newBakery);
  } catch (error) {
    next(error);
  }
};

exports.bakeryUpdate = async (req, res, next) => {
  try {
    if (req.user.role === "admin" || req.user.id === req.bakery.userId) {
      if (req.file) {
        req.body.image = `${req.protocol}://${req.get("host")}/media/${
          req.file.filename
        }`;
        console.log("exports.bakeryUpdate -> req.body.image", req.body.image);
      }
      await req.bakery.update(req.body);
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

exports.bakeryDelete = async (req, res, next) => {
  try {
    if (req.user.role === "admin" || req.user.id === req.bakery.userId) {
      await req.bakery.destroy();
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

exports.cookieCreate = async (req, res, next) => {
  try {
    if (req.user.id === req.bakery.userId) {
      if (req.file) {
        req.body.image = `${req.protocol}://${req.get("host")}/media/${
          req.file.filename
        }`;
      }
      req.body.bakeryId = req.bakery.id;
      const newCookie = await Cookie.create(req.body);
      res.status(201).json(newCookie);
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};
