const express = require('express');
const router = express.Router({ mergeParams: true });

const CatchAsync = require('../utils/CatchAsync');
const expressError = require('../utils/ExpressError');

const Campground = require('../models/campground');
const Review = require('../models/review');

const { reviewSchema } = require('../schemas.js');
const { IsLoggedin, validateReview, verifyReviewAuthor } = require('../middleware');




router.post('/', validateReview, IsLoggedin, CatchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const review = new Review(req.body.review);
    review.author = req.user._id; // set the author of the review to the current logged in user
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Successfully added a new review!');
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.delete('/:reviewid', IsLoggedin, verifyReviewAuthor, CatchAsync(async (req, res) => {
    const { id, reviewid } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });   //pull operator is used to remove the reviewID from the reviews array of the campground
    await Review.findByIdAndDelete(reviewid);
    req.flash('success', 'Successfully deleted review!');
    res.redirect(`/campgrounds/${id}`);
}));


module.exports = router;