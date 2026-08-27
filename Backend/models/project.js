require('dotenv').config();
const { required } = require('joi');
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 1024
    },
    description: {
        type: String,
        trim: true,
        maxlength: 1024
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: [
            'recruiting',
            'working',
            'finished'
        ],
        default: 'recruiting',
        trim: true
    },

});

const Project = mongoose.model('Project', projectSchema);

module.exports = {
    Project
};