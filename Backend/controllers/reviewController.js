const { Review } = require('../models/review');
const { Project } = require('../models/project');
const { memberList } = require('../models/memberList');
const { User } = require('../models/user');
const { reduce } = require('lodash');
const { number } = require('joi');

const createReview = async (req, res) => {
    try {
        const { project, reviewee, rating, comment } = req.body;
        const reviewerId = req.user._id;

        if (!project || !reviewee || !rating) {
            return res.status(400).send({ message: 'Project, reviewee, rating is required' });
        }
        if (rating < 1 || rating > 5) {
            return res.status(400).send({ message: 'Rating must in 1 to 5' });
        }

        if (reviewerId.toString() === revieweeId.toString()) {
            return res.status(400).send({ message: 'You cannot review yourself' });
        }

        const existsReviewee = await User.findById(reviewee);
        if (!existsReviewee) {
            return res.status(404).send({ messgae: 'Person not found' });
        }
        const existsProject = await Project.findById(project);
        if (!existsProject) {
            return res.status(404).send({ messgae: 'Project not found' });
        }
        const isReviewerInGroup = await memberList.findOne({ project: project, user: reviewerId });
        const isRevieweeInGroup = await memberList.findOne({ project: project, user: reviewee });
        if (existsProject.owner.toString() !== reviewerId.toString() || !isReviewerInGroup) {
            return res.status(403).send({ message: 'Reviewer are not in group' });
        }
        if (existsProject.owner.toString() !== reviewerId.toString() || !!isRevieweeInGroup) {
            return res.status(403).send({ message: 'Reviewee are not in group' });
        }
        const existingReview = await Review.findOne({
            project: project,
            reviewer: reviewerId,
            reviewee: reviewee
        });
        if (existingReview) {
            return res.status(400).send({ message: 'You have already review this user' });
        }

        const newReview = new Review({
            project: project,
            reviewer: reviewerId,
            reviewee: reviewee,
            rating: rating,
            comment: comment
        });
        await newReview.save();
        return res.status(201).send({ message: 'Review successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getUserReview = async (req, res) => {
    try {
        const { userId } = req.params;
        const findReviews = await Review.find({ reviewee: userId })
            .populate('reviewer', 'name email')
            .populate('project', 'projectName')
            .sort({ id: -1 });

        let avgRating = 0;
        const totalReview = findReviews.length;
        if (totalReview > 0) {
            const totalRating = findReviews.reduce((sum, review) => {
                return sum + review.rating;
            });
            avgRating = totalRating / totalReview;
        }
        else {
            avgRating = 0;
        }
        return res.status(200).send({ totalReview, avgRating: Number(avgRating) })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { rating, comment } = req.body;

        const findReview = await Review.findById(reviewId);
        if (!findReview) {
            return res.status(404).send({ message: 'Review not exists' });
        }
        if (!findReview.reviewer.toString() !== req.user._id.toString()) {
            return res.status(403).send({ message: 'Access denied' });
        }
        if (rating < 1 || rating > 5) {
            return res.status(400).send({ message: 'Rating must in 1 to 5' });
        }
        else {
            findReview.rating = rating;
        }
        findReview.comment = comment;

        await findReview.save();
        return res.status(200).send({ message: 'Update successfully', Update_rating: rating, update_comment: comment });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const findReview = await Review.findById(reviewId);
        if (!findReview) {
            return res.status(404).send({ message: 'Review not exists' });
        }
        if (!findReview.reviewer.toString() !== req.user._id.toString()) {
            return res.status(403).send({ message: 'Access denied' });
        }
        const deleted = await Review.findByIdAndDelete(reviewId);
        return res.status(200).send({ message: 'Delete successfully', deleted_review: deleted });
    } catch (err) {
        res.status(500).send({ message: error.message });
    }
};