const express = require('express');
const router = express.Router();
const memberListController = require('../controllers/memberListController');
const auth = require('../middlewares/auth');

router.get('/projects/:projectId/members', auth, memberListController.getAllMember);
router.post('/projects/:projectId/members', auth, memberListController.addMember);
router.delete('/projects/:projectId/members/:userId', auth, memberListController.deleteMember);
router.put('/projects/:projectId/members/:userId', auth, memberListController.updateMemberRole);