const { required } = require('joi');
const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatRoom',
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },

    type: {
        type: String,
        enum: [
            "text",
            "image",
            "file"
        ],
        default: "text"
    },

    fileUrl: {
        type: String,
        default: null
    },

    isRead: {
        type: Boolean,
        default: false
    }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = {
    Message
};