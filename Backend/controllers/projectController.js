const { Project, projectValidate } = require('../models/project');

const getProject = async (req, res) => {
    const project = await Project.findById(req.params.id);
    res.send(project);
};

const createProject = async (req, res) => {
    const project = new Project({
        projectName: req.body.projectName,
        description: req.body.description,
        owner: req.user._id,
    });
    await project.save();
    res.status(201).send('Create project successfully');
};
const updateProject = async (req, res) => {
    const result = projectValidate(req.body);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }
    const findProject = await Project.findById(req.params.id);
    if (!findProject) {
        return res.status(404).send('Project not exists');
    }
    else if (findProject.owner.toString() !== req.user._id) {
        return res.status(403).send('Access denied');
    }
    findProject.projectName = req.body.projectName;
    findProject.description = req.body.description;

    await findProject.save();
    res.status(200).send('Project updated');
};
const deleteProject = async (req, res) => {
    const findProject = await Project.findById(req.params.id);
    if (!findProject) {
        return res.status(404).send('Project not exists');
    }
    else if (findProject.owner.toString() !== req.user._id) {
        return res.status(403).send('Access denied');
    }
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    res.status(200).send('Project deleted successfully');
};

const updateProjectStatus = async (req, res) => {
    const { status } = req.body;
    if (status !== 'recruiting' && status !== 'working' && status !== 'finished') {
        return res.status(400).send('Invalid status');
    }
    const findProject = await Project.findById(req.params.id);
    if (!findProject) {
        return res.status(404).send('Project not exists');
    }
    else if (findProject.owner.toString() !== req.user._id) {
        return res.status(403).send('Access denied');
    }
    findProject.status = req.body.status;
    await findProject.save();
    res.status(200).send('Status updated');
};

module.exports = {
    getProject,
    updateProject,
    deleteProject,
    createProject,
    updateProjectStatus
};