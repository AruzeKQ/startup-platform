const mongoose = require('mongoose');
const { Project } = require('../models/project');
const { Document } = require('../models/document');
const { memberList } = require('../models/memberList');
const { uploadToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');

const getProjectAccess = async (projectId, userId) => {
    if (!mongoose.isValidObjectId(projectId)) {
        return { error: { status: 400, message: 'Invalid project ID' } };
    }

    const project = await Project.findById(projectId);
    if (!project) return { error: { status: 404, message: 'Project not found' } };

    const isOwner = project.owner.toString() === userId.toString();
    const isMember = isOwner || await memberList.exists({ project: project._id, user: userId });
    if (!isMember) {
        return { error: { status: 403, message: 'You must be a project member to access its documents' } };
    }

    return { project };
};

const uploadFile = (file, projectId) => uploadToCloudinary(
    file.buffer,
    file.originalname,
    `projects/${projectId}/documents`
);

const removeStoredFile = async (publicId, resourceType) => {
    if (!publicId) return;
    try {
        await deleteFromCloudinary(publicId, resourceType || 'raw');
    } catch (error) {
        console.error('Unable to remove document from Cloudinary:', error.message);
    }
};

const getSafeFileName = (originalName) => originalName.split(/[\\/]/).pop().trim();

const createDocument = async (req, res) => {
    let uploadedAsset;
    let documentSaved = false;
    try {
        const access = await getProjectAccess(req.params.projectId, req.user._id);
        if (access.error) return res.status(access.error.status).send({ message: access.error.message });
        if (!req.file) return res.status(400).send({ message: 'Please choose a file to upload' });
        const name = getSafeFileName(req.file.originalname);
        if (!name || name.length > 255) {
            return res.status(400).send({ message: 'File name must contain 1 to 255 characters' });
        }

        uploadedAsset = await uploadFile(req.file, access.project._id);
        const document = await Document.create({
            project: access.project._id,
            uploadedBy: req.user._id,
            name,
            url: uploadedAsset.secure_url || uploadedAsset.url,
            fileType: req.file.mimetype || uploadedAsset.format || '',
            fileSize: uploadedAsset.bytes || req.file.size,
            publicId: uploadedAsset.public_id,
            resourceType: uploadedAsset.resource_type || 'raw',
        });
        documentSaved = true;
        await document.populate('uploadedBy', 'name email');
        return res.status(201).send({ message: 'Document uploaded successfully', document });
    } catch (error) {
        if (!documentSaved && uploadedAsset?.public_id) {
            await removeStoredFile(uploadedAsset.public_id, uploadedAsset.resource_type);
        }
        return res.status(500).send({ message: error.message });
    }
};

const updateDocument = async (req, res) => {
    let uploadedAsset;
    let documentSaved = false;
    try {
        const access = await getProjectAccess(req.params.projectId, req.user._id);
        if (access.error) return res.status(access.error.status).send({ message: access.error.message });
        if (!mongoose.isValidObjectId(req.params.documentId)) {
            return res.status(400).send({ message: 'Invalid document ID' });
        }

        const document = await Document.findOne({ _id: req.params.documentId, project: access.project._id });
        if (!document) return res.status(404).send({ message: 'Document not found' });

        const { name } = req.body;
        if (name !== undefined && (typeof name !== 'string' || !name.trim() || name.trim().length > 255)) {
            return res.status(400).send({ message: 'Document name must contain 1 to 255 characters' });
        }
        if (name === undefined && !req.file) {
            return res.status(400).send({ message: 'Provide a new name or a replacement file' });
        }

        const previousAsset = { publicId: document.publicId, resourceType: document.resourceType };
        if (req.file) {
            const fileName = getSafeFileName(req.file.originalname);
            if (!fileName || fileName.length > 255) {
                return res.status(400).send({ message: 'File name must contain 1 to 255 characters' });
            }
            uploadedAsset = await uploadFile(req.file, access.project._id);
            document.name = fileName;
            document.url = uploadedAsset.secure_url || uploadedAsset.url;
            document.fileType = req.file.mimetype || uploadedAsset.format || '';
            document.fileSize = uploadedAsset.bytes || req.file.size;
            document.publicId = uploadedAsset.public_id;
            document.resourceType = uploadedAsset.resource_type || 'raw';
        }
        if (name !== undefined) document.name = name.trim();

        await document.save();
        documentSaved = true;
        await document.populate('uploadedBy', 'name email');
        if (req.file) await removeStoredFile(previousAsset.publicId, previousAsset.resourceType);
        return res.status(200).send({ message: 'Document updated successfully', document });
    } catch (error) {
        if (!documentSaved && uploadedAsset?.public_id) {
            await removeStoredFile(uploadedAsset.public_id, uploadedAsset.resource_type);
        }
        return res.status(500).send({ message: error.message });
    }
};

const deleteDocument = async (req, res) => {
    try {
        const access = await getProjectAccess(req.params.projectId, req.user._id);
        if (access.error) return res.status(access.error.status).send({ message: access.error.message });
        if (!mongoose.isValidObjectId(req.params.documentId)) {
            return res.status(400).send({ message: 'Invalid document ID' });
        }

        const document = await Document.findOne({ _id: req.params.documentId, project: access.project._id });
        if (!document) return res.status(404).send({ message: 'Document not found' });

        await document.deleteOne();
        await removeStoredFile(document.publicId, document.resourceType);
        return res.status(200).send({ message: 'Document deleted successfully', document });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

const getDocumentsByProject = async (req, res) => {
    try {
        const access = await getProjectAccess(req.params.projectId, req.user._id);
        if (access.error) return res.status(access.error.status).send({ message: access.error.message });

        const documents = await Document.find({ project: access.project._id })
            .sort({ createdAt: -1 })
            .populate('uploadedBy', 'name email');
        return res.status(200).send({ message: 'Documents fetched successfully', documents });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

module.exports = {
    createDocument,
    updateDocument,
    deleteDocument,
    getDocumentsByProject,
};
