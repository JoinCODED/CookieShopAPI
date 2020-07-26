// Data
const { Cookie } = require("../db/models");

exports.cookieList = async (req, res) => {
  try {
    const _cookies = await Cookie.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(_cookies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cookieCreate = async (req, res) => {
  try {
    const newCookie = await Cookie.create(req.body);
    res.status(201).json(newCookie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cookieUpdate = async (req, res) => {
  try {
    const { cookieId } = req.params;
    const foundCookie = await Cookie.findByPk(cookieId);
    if (foundCookie) {
      await foundCookie.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Cookie not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cookieDelete = async (req, res) => {
  try {
    const { cookieId } = req.params;
    const foundCookie = await Cookie.findByPk(cookieId);
    if (foundCookie) {
      await foundCookie.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Cookie not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
