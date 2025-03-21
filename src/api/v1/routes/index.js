const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const { validateTodo } = require('../middleware/todoValidation');

router.post('/todos', validateTodo, todoController.createTodo);
router.get('/todos', todoController.getAllTodos);
router.get('/todos/:id', todoController.getTodoById);
router.put('/todos/:id', validateTodo, todoController.updateTodo);
router.delete('/todos/:id', todoController.deleteTodo);

module.exports = router; 