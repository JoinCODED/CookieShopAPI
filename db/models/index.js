const Bakery = require("./Bakery");
const Cookie = require("./Cookie");

// A bakery has many cookies
Bakery.hasMany(Cookie, {
  as: "cookies",
  foreignKey: "bakeryId",
  allowNull: false,
});

Cookie.belongsTo(Bakery, { as: "bakery" });

module.exports = { Bakery, Cookie };
