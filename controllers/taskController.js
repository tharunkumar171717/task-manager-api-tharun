const taskService = require('../services/taskService');

exports.createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body, req.user.id);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

exports.getTasks = async (req, res) => {
  try {
    const {priority, status, sortBy, order} = req.query;
    const tasks = await taskService.getTasks(req.user.id, {priority, status}, sortBy, order);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id, req.user.id);
    if (!task) return res.status(404).json({message: 'Task not found'});
    res.json(task);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.user.id, req.body);
    if (!task) return res.status(404).json({message: 'Task not found'});
    res.json(task);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await taskService.deleteTask(req.params.id, req.user.id);
    if (!task) return res.status(404).json({message: 'Task not found'});
    res.json({message: 'Task deleted successfully'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};
