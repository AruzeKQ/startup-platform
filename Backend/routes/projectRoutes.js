const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middlewares/auth');

router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProject);
router.post('/', auth, projectController.createProject);
router.put('/:id', auth, projectController.updateProject);
router.delete('/:id', auth, projectController.deleteProject);
router.put('/:id/status', auth, projectController.updateProjectStatus);

module.exports = router;