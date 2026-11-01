const { Project } = require('../models/project');
const { User } = require('../models/user');
const { Document } = require('../models/document');
const { memberList } = require('../models/memberList');
const { uploadToCloudinary } = require('../config/cloudinary');

const createDocument = async (req, res) => {
    const projectId = req.params;
    const userId = req.user._id;

    const findProject = await Project.findById(projectId);
    if (!findProject) {
        return res.status(404).send({ message: 'Project not found!' });
    }
    const isOwner = project.owner.toString() === userId.toString();
    const isMember = memberList.findOne({ project: projectId, userId: userId });
    if (!isOwner && !isMember) {
        return res.status(401).send({ message: 'Access denied: You are not a member of the project!' });
    }
    if (!req.file) {
        return res.status(400).send({ message: 'Please choose file to upload' });
    }

    const uploadResult = await uploadToCloudinary(
        req.file.buffer,
        req.file.originalname,
        `projects/${projectId}/documents`
    );

    const newDocs = new Document({

    });
};


const updateDocument = async (req, res) => {


};

const deleteDocument = async (req, req) => {

};

const getDocumentsByProject = async (req, req) => {

};