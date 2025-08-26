const Task = require('../models/task');
// creating task
async function createTask(data, userId) {
  return await Task.create({...data, userId});
}
// getting tasks
async function getTasks(userId, filters = {}, sortBy, order) {
  const where = {userId};
  if (filters.priority) where.priority = filters.priority;
  if (filters.status) where.status = filters.status;
  //  findatsks along with conditions
  return await Task.findAll({
    where: where,
    order: sortBy ? [[sortBy, order === 'desc' ? 'DESC' : 'ASC']] : undefined,
    paranoid: false,
  });
}
//  getting tasks of particular id
async function getTaskById(id, userId) {
  return await Task.findOne({where: {id, userId}});
}
//  updating task
async function updateTask(id, userId, data) {
  const task = await Task.findOne({where: {id, userId}});
  if (!task) return null;
  return await task.update(data);
}
// deleting task
async function deleteTask(id, userId) {
  const task = await Task.findOne({where: {id, userId}});
  if (!task) return null;
  await task.destroy();
  return task;
}

module.exports = {createTask, getTasks, getTaskById, updateTask, deleteTask};
