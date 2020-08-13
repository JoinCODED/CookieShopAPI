const { Sequelize } = require("sequelize");

const db = new Sequelize({
  username: "postgres",
  password: "password",
  database: "cookieshop_db",
  dialect: "postgres",
  host: "localhost",
  logging: false,
});

module.exports = db;
