const Task = require("../models/task");

async function createTask(data, userId) {
  return await Task.create({ ...data, userId });
}

async function getTasks(userId, filters = {}, sortBy, order) {
  const where = { userId };
  if (filters.priority) where.priority = filters.priority;
  if (filters.status) where.status = filters.status;

  return await Task.findAll({
    where,
    order: sortBy ? [[sortBy, order === "desc" ? "DESC" : "ASC"]] : undefined,
  });
}

async function getTaskById(id, userId) {
  return await Task.findOne({ where: { id, userId } });
}

async function updateTask(id, userId, data) {
  const task = await Task.findOne({ where: { id, userId } });
  if (!task) return null;
  return await task.update(data);
}

async function deleteTask(id, userId) {
  const task = await Task.findOne({ where: { id, userId } });
  if (!task) return null;
  await task.destroy();
  return task;
}

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
