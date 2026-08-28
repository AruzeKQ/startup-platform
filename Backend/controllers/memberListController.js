const { memberList } = require('../models/memberList');
const { Project } = require('../models/project');
const { User } = require('../models/user');

const getAllMember = async (req, res) => {
    const foundProject = Project.findById(req.params.id);
    if (!foundProject) {
        return res.status(400).send('Project not exists');
    }
    const member = await memberList.find({});
    res.status(200).send(member);
};

const addMember = async (req, res) => {

};

const updateMemberRole = async (req, res) => {

};

const deleteMember = async (req, res) => {

};