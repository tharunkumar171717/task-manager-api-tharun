const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Task = sequelize.define('Task', {
  id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
  title: {type: DataTypes.STRING, allowNull: false},
  description: {type: DataTypes.TEXT},
  priority: {type: DataTypes.ENUM('low', 'medium', 'high'), allowNull: false},
  dueDate: {type: DataTypes.DATE, allowNull: false},
  status: {type: DataTypes.ENUM('pending', 'completed'), allowNull: false},
}
, {paranoid: true, deletedAt: 'deletedAt'});

User.hasMany(Task, {foreignKey: 'userId', onDelete: 'CASCADE'});
Task.belongsTo(User, {foreignKey: 'userId'});

module.exports = Task;
