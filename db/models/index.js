const Bakery = require("./Bakery");
const Cookie = require("./Cookie");
const User = require("./User");

// A bakery has many cookies
Bakery.hasMany(Cookie, {
  as: "cookies",
  foreignKey: "bakeryId",
  allowNull: false,
});

Cookie.belongsTo(Bakery, { as: "bakery" });

User.hasOne(Bakery, { foreignKey: "userId" });

Bakery.belongsTo(User, { as: "user", foreignKey: "userId" });

module.exports = { Bakery, Cookie, User };
