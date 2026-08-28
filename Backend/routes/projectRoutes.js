const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middlewares/auth');

router.get('/projects', auth, projectController.getProject);
router.post('/projects', auth, projectController.createProject);
router.put('/projects/:id', auth, projectController.updateProject);
router.delete('/projects/:id', auth, projectController.deleteProject);
router.put('/projects/:id', auth, projectController.updateProjectStatus);