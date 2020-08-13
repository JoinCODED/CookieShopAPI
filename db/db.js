const { Sequelize } = require("sequelize");

// const db = new Sequelize({
//   username: "postgres",
//   password: "password",
//   database: "cookieshop_db",
//   dialect: "postgres",
//   host: "localhost",
//   logging: false,
// });

const db = new Sequelize(process.env.DATABASE_URL, {
  // username: "postgres",
  // password: "password",
  // database: "cookieshop_db",
  dialect: "postgres",
  logging: false,
});

module.exports = db;
