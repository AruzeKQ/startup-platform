const mongoose = require('mongoose');

const chatRoomSchema = mongoose.Schema({
    type: {
        type: String,
        enum: [
            "private",
            "group",
            "project"
        ],
        required: true
    },

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        default: null
    },

    name: {
        type: String,
        default: null
    },

    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: null
    }
});

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

module.exports = {
    chatRoom
}