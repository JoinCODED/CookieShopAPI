const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Cookie extends Model {}

Cookie.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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

module.exports = Cookie;
