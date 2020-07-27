// Data
const { Cookie } = require("../db/models");

exports.fetchCookie = async (cookieId, next) => {
  try {
    const cookie = await Cookie.findByPk(cookieId);
    return cookie;
  } catch (error) {
    next(error);
  }
};

exports.cookieList = async (req, res, next) => {
  try {
    const _cookies = await Cookie.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(_cookies);
  } catch (error) {
    next(error);
  }
};

exports.cookieCreate = async (req, res, next) => {
  try {
    const newCookie = await Cookie.create(req.body);
    res.status(201).json(newCookie);
  } catch (error) {
    next(error);
  }
};

exports.cookieUpdate = async (req, res, next) => {
  console.log("exports.cookieUpdate -> req", req.cookie);
  try {
    await req.cookie.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.cookieDelete = async (req, res, next) => {
  try {
    await req.cookie.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
