require('dotenv').config();
const bcrypt = require('bcrypt');
const { User, userRegisterValidate } = require('../models/user.js');

const register = async (req, res) => {
    try {
        const result = userRegisterValidate(req.body);
        if (result.error) {
            return res.status(400).send({ message: result.error.details[0].message });
        }
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send({ message: 'User already registered' });
        }
        if (req.body.role !== 'candidate' && req.body.role !== 'startup') {
            return res.status(400).send({ message: 'Role not valid' });
        }
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        const token = user.generateAuthToken();
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };
        res.header('x-auth-token', token).status(201).send({
            message: 'Registered successfully',
            token,
            user: userResponse
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }

        const token = user.generateAuthToken();
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };
        res.status(200).send({
            message: 'Login successful',
            token,
            user: userResponse
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = {
    register,
    login
};

