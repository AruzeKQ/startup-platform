require('dotenv').config();
const Joi = require('joi');
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 1024,
        required: true
    },
    companyName: {
        type: String,
        trim: true,
        maxlength: 1024,
        required: true
    },
    logoUrl: {
        type: String,
        trim: true,
        maxlength: 1024
    },
    location: {
        type: String,
        trim: true,
        maxlength: 1024
    },
    description: {
        type: String,
        trim: true,
        maxlength: 1024
    },
    salary: {
        type: String,
        trim: true,
        maxlength: 1024
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // status: {
    //     type: String,
    //     enum: [
    //         'recruiting',
    //         'working',
    //         'finished'
    //     ],
    //     default: 'recruiting',
    //     trim: true
    // },
    tags: [{
        type: String,
        enum: [
            'Frontend',
            'Backend',
            'Fullstack',
            'React',
            'Node.js',
            'Express.js',
            'MongoDB',
            'MySQL',
            'Flutter',
            'Java',
            'Python',
            'AI',
            'Machine Learning',
            'DevOps',
            'None'
        ],
        default: 'None',

    }],
    postedAt: {
        type: Date
    },

});

function projectValidate(userInfo) {
    const Schema = Joi.object({
        projectName: Joi.string().min(5).max(1024).required(),
        companyName: Joi.string().max(1024).required(),
        logoUrl: Joi.string().max(1024).allow('', null),
        location: Joi.string().max(1024).allow('', null),
        salary: Joi.string().max(1024).allow('', null),
        description: Joi.string().max(1024).allow('', null),
        tags: Joi.string().allow('', null),
        postedAt: Joi.date().allow('', null)
    });
    return Schema.validate(userInfo);
}

const Project = mongoose.model('Project', projectSchema);

module.exports = {
    Project,
    projectValidate
};