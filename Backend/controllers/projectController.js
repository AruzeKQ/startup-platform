const { Project, projectValidate } = require('../models/project');

const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('owner', 'name email').sort({ _id: -1 });
        res.status(200).send(projects);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('owner', 'name email');
        if (!project) {
            return res.status(404).send({ message: 'Project not found' });
        }
        res.status(200).send(project);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const createProject = async (req, res) => {
    try {
        const result = projectValidate(req.body);
        if (result.error) {
            return res.status(400).send({ message: result.error.details[0].message });
        }
        const project = new Project({
            projectName: req.body.projectName,
            description: req.body.description,
            owner: req.user._id,
        });
        await project.save();
        res.status(201).send({ message: 'Create project successfully', project });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const updateProject = async (req, res) => {
    try {
        const result = projectValidate(req.body);
        if (result.error) {
            return res.status(400).send({ message: result.error.details[0].message });
        }
        const findProject = await Project.findById(req.params.id);
        if (!findProject) {
            return res.status(404).send({ message: 'Project not found' });
        }
        if (findProject.owner.toString() !== req.user._id.toString()) {
            return res.status(403).send({ message: 'Access denied' });
        }
        findProject.projectName = req.body.projectName;
        findProject.description = req.body.description;

        await findProject.save();
        res.status(200).send({ message: 'Project updated successfully', project: findProject });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const deleteProject = async (req, res) => {
    try {
        const findProject = await Project.findById(req.params.id);
        if (!findProject) {
            return res.status(404).send({ message: 'Project not found' });
        }
        if (findProject.owner.toString() !== req.user._id.toString()) {
            return res.status(403).send({ message: 'Access denied' });
        }
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'Project deleted successfully', project: deletedProject });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const updateProjectStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (status !== 'recruiting' && status !== 'working' && status !== 'finished') {
            return res.status(400).send({ message: 'Invalid status' });
        }
        const findProject = await Project.findById(req.params.id);
        if (!findProject) {
            return res.status(404).send({ message: 'Project not found' });
        }
        if (findProject.owner.toString() !== req.user._id.toString()) {
            return res.status(403).send({ message: 'Access denied' });
        }
        findProject.status = status;
        await findProject.save();
        res.status(200).send({ message: 'Status updated successfully', project: findProject });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = {
    getAllProjects,
    getProject,
    updateProject,
    deleteProject,
    createProject,
    updateProjectStatus
};
