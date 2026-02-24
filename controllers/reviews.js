const Review = require('../models/review');
const Campground = require('../models/campground');

module.exports.newreview = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const review = new Review(req.body.review);
    review.author = req.user._id; // set the author of the review to the current logged in user
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Successfully added a new review!');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deletereview = async (req, res) => {
    const { id, reviewid } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });   //pull operator is used to remove the reviewID from the reviews array of the campground
    await Review.findByIdAndDelete(reviewid);
    req.flash('success', 'Successfully deleted review!');
    res.redirect(`/campgrounds/${id}`);
}