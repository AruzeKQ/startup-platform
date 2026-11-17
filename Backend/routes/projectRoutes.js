const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middlewares/auth');
const apiLimiter = require('../middlewares/apiLimiter');
const { upload } = require('../config/cloudinary');

router.get('/', apiLimiter, projectController.getAllProjects);
router.get('/my-projects', auth, apiLimiter, projectController.getMyProjects);
router.get('/:id', apiLimiter, projectController.getProject);
router.post('/', auth, upload.single('logoFile'), apiLimiter, projectController.createProject);
router.put('/:id', auth, apiLimiter, projectController.updateProject);
router.delete('/:id', auth, apiLimiter, projectController.deleteProject);
// router.put('/:id/status', auth, projectController.updateProjectStatus);

module.exports = router;
