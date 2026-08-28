require('dotenv').config();
const { required } = require('joi');
const mongoose = require('mongoose');

const memberListSchema = mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    role: {
        type: String,
        enum: [
            'FE',
            'BE',
        ],
        default: 'none'
    },
    joinedAt: {
        type: Date,
        default: Date.now()
    }
});

memberListSchema.index(
    { project: 1, user: 1 },
    { unique: true }
);

const memberList = mongoose.model('memberList', memberListSchema);

module.exports = {
    memberList
};