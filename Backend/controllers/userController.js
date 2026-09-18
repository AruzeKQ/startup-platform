const { User, userUpdateValidate } = require('../models/user.js');
const bcrypt = require('bcrypt');

const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const result = userUpdateValidate(req.body);
        if (result.error) {
            return res.status(400).send({ message: result.error.details[0].message });
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
        ).select('-password');

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        
        res.status(200).send({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).send({ message: 'Old password and new password are required' });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const validPassword = await bcrypt.compare(oldPassword, user.password);
        if (!validPassword) {
            return res.status(400).send({ message: 'Old password is incorrect' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();
        res.status(200).send({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const deleteAccount = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user._id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = {
    getMe,
    updateProfile,
    changePassword,
    deleteAccount
};