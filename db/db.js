const { Sequelize } = require("sequelize");

const db = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      logging: false,
    })
  : new Sequelize({
      username: "postgres",
      password: "password",
      database: "cookieshop_db",
      dialect: "postgres",
      host: "localhost",
      logging: false,
    });

module.exports = db;
