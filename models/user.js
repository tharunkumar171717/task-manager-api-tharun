const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: false },
    password: { type: DataTypes.STRING, allowNull: false },
  }
);
module.exports = User;
