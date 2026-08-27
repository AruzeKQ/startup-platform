const { required, string } = require('joi');
const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    title: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true
    },
    description: {
        type: String,
        maxlength: 1024,
        default: ""
    },
    status: {
        type: String,
        enum: [
            'In progress',
            'Finished'
        ],
        default: 'In progress'
    },
    priority: {
        type: String,
        enum: [
            'Low',
            'Medium',
            'High'
        ],
        default: ""
    },
    asignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },


});

const Task = mongoose.model('Task', taskSchema);

module.exports = {
    Task
};