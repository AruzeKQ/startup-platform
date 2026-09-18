const { Task } = require('../models/task');
const { Project } = require('../models/project');
const { memberList } = require('../models/memberList');

const createTask = async (req, res) => {
    try {
        const { project, title, description, status, priority, asignee, createdBy } = req.body;
        const existProject = await Project.findById(project);
        if (!existProject) {
            return res.status(404).send('Project not found');
        };
        if (existProject.owner.toString() !== req.user._id.toString()) {
            return res.status(403).send('Access Denied');
        };
        const checkInGroup = await memberList.findOne(
            {
                project: existProject._id,
                user: asignee
            }
        );
        if (!checkInGroup) {
            return res.status(403).send('Member is not in the group');
        };
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
        res.status(200).send('Task created successfully');
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

};

const getTaskById = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findById(taskId)
            .populate('project', 'projectName')
            .populate('asignee', 'name email')
            .populate('createdBy', 'name email');
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.status(200).send({ message: 'Task', task });
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
            return res.status(403).send('Access Denied');
        };

        const checkInGroup = await memberList.findOne(
            {
                project: existProject._id,
                user: asignee
            }
        );
        if (!checkInGroup) {
            return res.status(403).send({ message: 'Member is not in the group' });
        };
        const validStatus = [
            'In progress',
            'Finished'
        ];
        if (status !== undefined && !validStatus.includes(status)) {
            return res.status(404).send({ message: 'Invalid status' });
        }
        const validPriority = [
            'Low',
            'Medium',
            'High'
        ];
        if (priority !== undefined && !validPriority.includes(priority)) {
            return res.status(404).send({ message: 'Invalid priority' });
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
        const { taskId } = req.params

        const existTask = await Task.findById(taskId);
        if (!existTask) {
            return res.status(404).send({ message: 'Task not found' });
        };
        const existProject = await Project.findById(existTask.project);
        if (!existProject) {
            return res.status(404).send({ message: 'Project not found' });
        }
        if (existProject.owner.toString() !== req.user._id.toString()) {
            return res.status(403).send('Access Denied');
        };

        const delTask = await Task.findOneAndDelete(taskId);
        res.status(200).send({ message: 'Task deleted successfully', task: delTask });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

};

module.exports = {
    createTask,
    getTaskById,
    updateTask,
    deleteTask
};
