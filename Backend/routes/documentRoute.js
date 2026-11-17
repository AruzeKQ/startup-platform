const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const auth = require('../middlewares/auth');
const { upload } = require('../config/cloudinary');

const handleDocumentUpload = (req, res, next) => {
    upload.single('file')(req, res, (error) => {
        if (!error) return next();
        const status = error.code === 'LIMIT_FILE_SIZE' ? 413 : 400;
        return res.status(status).send({
            message: error.code === 'LIMIT_FILE_SIZE'
                ? 'File size must not exceed 15 MB'
                : error.message,
        });
    });
};

router.get('/projects/:projectId/documents', auth, documentController.getDocumentsByProject);
router.post('/projects/:projectId/documents', auth, handleDocumentUpload, documentController.createDocument);
router.put('/projects/:projectId/documents/:documentId', auth, handleDocumentUpload, documentController.updateDocument);
router.delete('/projects/:projectId/documents/:documentId', auth, documentController.deleteDocument);

module.exports = router;
