require('dotenv').config();
const bcrypt = require('bcrypt');
const { User, userRegisterValidate } = require('../models/user.js');

const register = async (req, res) => {
    const result = userRegisterValidate(req.body);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('User already registered');
    }
    if (req.body.role !== 'candidate' || req.body.role !== 'startup') {
        return res.status(400).send('Role not valid');
    }
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save()

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).status(201).send({ message: 'Registered successfully' });
};

const login = async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Invalid email');
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Invalid password');
    }
    //jwt
    const token = user.generateAuthToken();
    res.send(token);
};

module.exports = {
    register,
    login
};
