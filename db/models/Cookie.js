const { DataTypes, Model } = require("sequelize");
const SequelizeSlugify = require("sequelize-slugify");

const db = require("../db");

class Cookie extends Model {}

Cookie.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      //   allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
      validate: {
        min: {
          args: 5,
          msg: "Nope nope, you can't hack my system Hassan!",
        },
      },
    },
    image: {
      type: DataTypes.STRING,
      //   allowNull: false,
    },
  },
  {
    sequelize: db,
  }
);

SequelizeSlugify.slugifyModel(Cookie, {
  source: ["name"],
});

module.exports = Cookie;
