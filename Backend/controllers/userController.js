const { User, userUpdateValidate } = require('../models/user.js');
const bcrypt = require('bcrypt');

const getMe = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
};

const updateProfile = async (req, res) => {
    const result = userUpdateValidate(req.body);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            name: req.body.name,
            email: req.body.email,
            portfolioLink: req.body.portfolioLink,
            skills: req.body.skills
        },
        { new: true }
    );
    if (!user) {
        return res.send('User not exists');
    }
    else {
        return res.send('updated successfully');
    }
};

const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        return res.status(400).send('Old password and new password are required');
    }

    const user = await User.findById(req.user._id);
    if (!user) {
        return res.status(400).send('User not exists');
    }

    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) {
        return res.status(400).send('Old password not correct');
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    res.send('Password changed successfully');

};

const deleteAccount = async (req, res) => {
    const user = await User.findByIdAndDelete(req.user._id);
    if (!user) {
        return res.send('User not exists');
    }
    else {
        return res.send('Account deleted successfully');
    }
};

module.exports = {
    getMe,
    updateProfile,
    changePassword,
    deleteAccount
}