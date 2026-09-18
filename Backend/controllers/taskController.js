const { Task } = require('../models/task');
const { Project } = require('../models/project');
const { memberList } = require('../models/memberList');

const createTask = async (req, res) => {
    const { taskId } = req.params;
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
};

const getTaskById = (req, res) => {

};

const updateTask = async (req, res) => {
    const { project, title, description, status, priority, asignee, createdBy } = req.body;
    const existProject = await Project.findById(project);
    if (!existProject) {
        return res.status(404).send('Project not found');
    };
    if (existProject.owner.toString() !== createdBy.user._id) {
        return res.status(403).send('Access Denied');
    };
    const existTask = await Task.findById(taskId);
    if (!existTask) {
        return res.status(404).send({ message: 'Task not found' });
    };
    const checkInGroup = await memberList.findOne(
        {
            project: existProject._id,
            user: asignee._id
        }
    );
    if (!checkInGroup) {
        return res.status(403).send({ message: 'Member is not in the group' });
    };
    const validStatus = [
        'In progress',
        'Finished'
    ];
    if (!validStatus.includes(status)) {
        return res.status(404).send({ message: 'Invalid status' });
    }
    const validPriority = [
        'Low',
        'Medium',
        'High'
    ];
    if (!validPriority.includes(priority)) {
        return res.status(404).send({ message: 'Invalid priority' });
    }
    //update
    existTask.title = title ?? existTask.title;
    existTask.description = description ?? existTask.description;
    existTask.status = status ?? existTask.status;
    existTask.priority = priority ?? existTask.priority;
    existTask.asignee = asignee ?? existTask.asignee;

    await existTask.save();
    res.status(200).send({ message: 'Task updated successfully', task: existTask });
};

const deleteTask = async (req, res) => {
    const existProject = await Project.findById(project);
    if (!existProject) {
        return res.status(404).send('Project not found');
    };
    if (existProject.owner.toString() !== createdBy.user._id) {
        return res.status(403).send('Access Denied');
    };
    const existTask = await Task.findById(taskId);
    if (!existTask) {
        return res.status(404).send({ message: 'Task not found' });
    };

    const delTask = await Task.findOneAndDelete(taskId);
    res.status(200).send({ message: 'Task deleted successfully', task: delTask });
};
