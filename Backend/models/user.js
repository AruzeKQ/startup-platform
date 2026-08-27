require('dotenv').config();

const Joi = require('joi');
const pwdComplexity = require('joi-password-complexity');
const jwt = require('jsonwebtoken');
const { min, max, lowerCase, upperCase } = require('lodash');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true,
        trim: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 100,
        required: true,
        unique: true
    },
    password: pwdComplexity({
        min: 6,
        max: 1024,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 4
    }),
    portfolioLink: {
        type: String,
        minlength: 6,
        maxlength: 1024
    },
    role: {
        type: String
    },
    rating: {
        type: Number
    },
    skills: [{
        type: String,
        trim: true
    }]

});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        {
            _id: this._id,
        }, process.env.JWT_SECRET);
    return token;
}

function userRegisterValidate(userInfo) {
    const Schema = Joi.object({
        name: Joi.string().min(5).max(1024).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
        portfolioLink: Joi.string().min(5).max(1024),
        skills: Joi.string().min(5).max(1024),
    });
}

function userUpdateValidate(userInfo) {
    const Schema = Joi.object({
        name: Joi.string().min(5).max(1024).required(),
        email: Joi.string().min(5).max(255).required().email(),
        portfolioLink: Joi.string().min(5).max(1024),
        skills: Joi.string().min(5).max(1024),
    });
}

const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    userRegisterValidate,
    userUpdateValidate
}