const { find } = require('lodash');
const { memberList } = require('../models/memberList');
const { Project } = require('../models/project');
const { User } = require('../models/user');

const getAllMember = async (req, res) => {
    const foundProject = await Project.findById(req.params.projectId);
    if (!foundProject) {
        return res.status(400).send('Project not exists');
    }
    const member = await memberList.find({
        project: foundProject._id
    });
    res.status(200).send(member);
};

const addMember = async (req, res) => {
    //kiem tra ton tai project
    const findProject = await Project.findById(req.params.projectId);
    if (!findProject) {
        return res.status(404).send('Project not found');
    }
    //kiem tra user co phai chu project
    if (findProject.owner.toString() !== req.user._id) {
        return res.status(403).send('Access denied');
    }
    //kiem tra user dc them co ton tai hay ko
    const user = await User.findById(req.body.userId);
    if (!user) {
        return res.status(404).send('User not found');
    }
    //kiem tra user da duoc them vao project chua
    const existingUser = await memberList.findOne({
        project: findProject._id,
        user: user._id
    });

    //luu
    if (existingUser) {
        return res.status(400).send('User already member');
    }

    const member = new memberList({
        project: findProject._id,
        user: user._id,
        role: req.body.role
    });

    await member.save();
    //respond
    res.status(201).send('Member added successfully');
};

const updateMemberRole = async (req, res) => {
    const findProject = await Project.findById(req.params.projectId);
    if (!findProject) {
        return res.status(404).send('Project not found');
    }
    if (findProject.owner.toString() !== req.user._id) {
        return res.status(403).send('Access denied');
    }
    const member = await memberList.findOne({
        project: findProject._id,
        user: req.params.userId
    });
    if (!member) {
        return res.status(404).send('Member not exists');
    }
    const validRole = [
        'none',
        'FE',
        'BE',
    ];
    if (!validRole.includes(req.body.role)) {
        return res.status(400).send('Invalid role');
    }

    member.role = req.body.role;
    await member.save();
    res.status(200).send('Role updated');

};

const deleteMember = async (req, res) => {
    //kiem tra ton tai project
    const findProject = await Project.findById(req.params.projectId);
    if (!findProject) {
        return res.status(404).send('Project not found');
    }
    //kiem tra user co phai chu project
    if (findProject.owner.toString() !== req.user._id) {
        return res.status(403).send('Access denied');
    }
    //.findoneanddelelte()
    const deletedMember = await memberList.findOneAndDelete({
        project: findProject._id,
        user: req.params.userId
    });
    //kiem tra xem user bi xoa co trong project hay ko
    if (!deletedMember) {
        return res.status(404).send('Member not exists');
    }
    //respond
    res.status(200).send('Member deleted successfully');
};

module.exports = {
    getAllMember,
    addMember,
    deleteMember,
    updateMemberRole
}