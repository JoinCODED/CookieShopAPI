const { Sequelize } = require("sequelize");

// const db = new Sequelize({
//   username: "postgres",
//   password: "password",
//   database: "cookieshop_db",
//   dialect: "postgres",
//   host: "localhost",
//   logging: false,
// });

const db = new Sequelize({
  username: "postgres",
  password: "password",
  database: "cookieshop_db",
  dialect: "postgres",
  host: "localhost",
  logging: false,
  use_env_variable:
    "postgres://oxpasnosmdvhwz:a2337be6ba44e6b91e7719a96dda9069ea2fb7e8cd4b5dbb4cb07de8a67c5d71@ec2-34-225-162-157.compute-1.amazonaws.com:5432/d83u9jl6htstvr",
});

module.exports = db;
