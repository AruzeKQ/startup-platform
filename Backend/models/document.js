const { required } = require('joi');
const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        default: ""
    },
    fileSize: {
        type: Number,
        default: 0
    }

});

const Document = mongoose.model('Document', documentSchema);

function validateDocument(doc) {
    const schema = Joi.object({
        name: Joi.string().min(1).max(255).required(),
        url: Joi.string().uri().required(),
        fileType: Joi.string().allow('', null).optional(),
        fileSize: Joi.number().min(0).optional()
    });
    return schema.validate(doc);
}

module.exports = {
    Document,
    validateDocument
};