const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const auth = require('../middlewares/auth');

router.get('/projects/:projectId/documents', auth,);
router.post('/projects/:projectId/documents', auth,);
router.put('/projects/:projectId/documents/:documentId', auth,);
router.delete('/projects/:projectId/documents/:documentId', auth,);

module.exports = router;