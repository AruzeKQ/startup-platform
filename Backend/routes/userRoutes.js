const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.get('/me', auth, userController.getMe);
router.put('/me', auth, userController.updateProfile);
router.put('/me/password', auth, userController.changePassword);
router.delete('/me', auth, userController.deleteAccount);

module.exports = router;