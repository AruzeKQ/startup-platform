const { memberList } = require('../models/memberList');
const { Project } = require('../models/project');
const { User } = require('../models/user');

const getAllMember = async (req, res) => {
    try {
        const foundProject = await Project.findById(req.params.projectId);
        if (!foundProject) {
            return res.status(404).send({ message: 'Project not found' });
        }
        const members = await memberList.find({
            project: foundProject._id
        }).populate('user', 'name email portfolioLink skills role');

        res.status(200).send({ message: 'Members fetched successfully', members });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const addMember = async (req, res) => {
    try {
        const findProject = await Project.findById(req.params.projectId);
        if (!findProject) {
            return res.status(404).send({ message: 'Project not found' });
        }
        if (findProject.owner.toString() !== req.user._id.toString()) {
            return res.status(403).send({ message: 'Access denied' });
        }
        const user = await User.findById(req.body.userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        const existingUser = await memberList.findOne({
            project: findProject._id,
            user: user._id
        });

        if (existingUser) {
            return res.status(400).send({ message: 'User is already a member' });
        }

        const member = new memberList({
            project: findProject._id,
            user: user._id,
            role: req.body.role || 'none'
        });

        await member.save();
        await member.populate('user', 'name email portfolioLink skills role');

        res.status(201).send({ message: 'Member added successfully', member });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const updateMemberRole = async (req, res) => {
    try {
        const findProject = await Project.findById(req.params.projectId);
        if (!findProject) {
            return res.status(404).send({ message: 'Project not found' });
        }
        if (findProject.owner.toString() !== req.user._id.toString()) {
            return res.status(403).send({ message: 'Access denied' });
        }
        const member = await memberList.findOne({
            project: findProject._id,
            user: req.params.userId
        });
        if (!member) {
            return res.status(404).send({ message: 'Member not found' });
        }
        const validRole = ['none', 'FE', 'BE'];
        if (!validRole.includes(req.body.role)) {
            return res.status(400).send({ message: 'Invalid role' });
        }

        member.role = req.body.role;
        await member.save();
        await member.populate('user', 'name email portfolioLink skills role');

        res.status(200).send({ message: 'Role updated successfully', member });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const deleteMember = async (req, res) => {
    try {
        const findProject = await Project.findById(req.params.projectId);
        if (!findProject) {
            return res.status(404).send({ message: 'Project not found' });
        }
        if (findProject.owner.toString() !== req.user._id.toString()) {
            return res.status(403).send({ message: 'Access denied' });
        }
        const deletedMember = await memberList.findOneAndDelete({
            project: findProject._id,
            user: req.params.userId
        });
        if (!deletedMember) {
            return res.status(404).send({ message: 'Member not found' });
        }

        res.status(200).send({ message: 'Member deleted successfully', member: deletedMember });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = {
    getAllMember,
    addMember,
    deleteMember,
    updateMemberRole
};