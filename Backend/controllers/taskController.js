const { Task } = require('../models/task');
const { Project } = require('../models/project');
const { memberList } = require('../models/memberList');
const { find } = require('lodash');

const getMyTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            $or: [
                { asignee: req.user._id },
                { createdBy: req.user._id }
            ]
        })
            .populate('project', 'projectName')
            .populate('asignee', 'name email')
            .populate('createdBy', 'name email');
        res.status(200).send({ message: 'My tasks', tasks });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const createTask = async (req, res) => {
    try {
        const { project, title, description, status, priority, asignee } = req.body;
        const existProject = await Project.findById(project);
        if (!existProject) {
            return res.status(404).send({ message: 'Project not found' });
        }
        if (existProject.owner.toString() !== req.user._id.toString()) {
            return res.status(403).send({ message: 'Access denied' });
        }
        const checkInGroup = await memberList.findOne(
            {
                project: existProject._id,
                user: asignee
            }
        );
        if (!checkInGroup) {
            return res.status(403).send({ message: 'Member is not in the group' });
        }
        const tasks = new Task({
            project,
            title,
            description,
            status,
            priority,
            asignee,
            createdBy: req.user._id
        });
        await tasks.save();
        res.status(201).send({ message: 'Task created successfully', task: tasks });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getTaskById = async (req, res) => {
    try {
        const { taskId } = req.params;
        const findTask = await Task.findById(taskId)
            .populate('project', 'projectName')
            .populate('asignee', 'name email')
            .populate('createdBy', 'name email');

        if (!findTask) {
            return res.status(404).send({ message: 'Task not found' });
        }

        const existProject = findTask.project;
        if (!existProject) {
            return res.status(404).send({ message: 'Project not found' });
        }

        const isOwner = existProject.owner.toString() === req.user._id.toString();
        const isMember = await memberList.exists({
            project: existProject._id,
            user: req.user._id
        })
        if (!isOwner && !isMember) {
            return res.status(403).send({ message: 'Access denied' });
        }
        res.status(200).send({ message: 'Task', findTask });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params
        const { project, title, description, status, priority, asignee, createdBy } = req.body;

        const existTask = await Task.findById(taskId);
        if (!existTask) {
            return res.status(404).send({ message: 'Task not found' });
        };

        const existProject = await Project.findById(existTask.project);
        if (!existProject) {
            return res.status(404).send({ message: 'Project not found' });
        }

        if (existProject.owner.toString() !== req.user._id.toString()) {
            return res.status(403).send({ message: 'Access denied' });
        }

        if (asignee !== undefined) {
            const checkInGroup = await memberList.findOne({
                project: existProject._id,
                user: asignee
            });
            if (!checkInGroup) {
                return res.status(403).send({ message: 'Member is not in the group' });
            }
        }
        const validStatus = [
            'In progress',
            'Finished'
        ];
        if (status !== undefined && !validStatus.includes(status)) {
            return res.status(400).send({ message: 'Invalid status' });
        }
        const validPriority = [
            'Low',
            'Medium',
            'High'
        ];
        if (priority !== undefined && !validPriority.includes(priority)) {
            return res.status(400).send({ message: 'Invalid priority' });
        }
        //update
        if (title !== undefined) existTask.title = title;
        if (description !== undefined) existTask.description = description;
        if (status !== undefined) existTask.status = status;
        if (priority !== undefined) existTask.priority = priority;
        if (asignee !== undefined) existTask.asignee = asignee;
        await existTask.save();
        res.status(200).send({ message: 'Task updated successfully', task: existTask });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        const existTask = await Task.findById(taskId);
        if (!existTask) {
            return res.status(404).send({ message: 'Task not found' });
        }
        const existProject = await Project.findById(existTask.project);
        if (!existProject) {
            return res.status(404).send({ message: 'Project not found' });
        }
        if (existProject.owner.toString() !== req.user._id.toString()) {
            return res.status(403).send({ message: 'Access denied' });
        }

        const delTask = await Task.findByIdAndDelete(taskId);
        res.status(200).send({ message: 'Task deleted successfully', task: delTask });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = {
    createTask,
    getTaskById,
    getMyTasks,
    updateTask,
    deleteTask
};
