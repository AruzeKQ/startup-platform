const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middlewares/auth');

router.post('/', auth, taskController.createTask);
router.get('/my-tasks', auth, taskController.getMyTasks);
router.get('/:taskId', auth, taskController.getTaskById);
router.put('/:taskId', auth, taskController.updateTask);
router.delete('/:taskId', auth, taskController.deleteTask);

module.exports = router;

