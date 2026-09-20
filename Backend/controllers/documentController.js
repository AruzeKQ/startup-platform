const { Project } = require('../models/project');
const { User } = require('../models/user');
const { Document } = require('../models/document');
const { memberList } = require('../models/memberList');

const createDocument = async (req, res) => {
    const { project, uploadedBy, name, url, fileType, fileSize } = req.body;
    const existProject = await Project.findById(project);
    if (!existProject) {
        return res.status(404).send({ message: 'Project not found' });
    }

};


const updateDocument = async (req, req) => {

};

const deleteDocument = async (req, req) => {

};

const getDocumentsByProject = async (req, req) => {

};