const express= require('express');
const router = express.Router({mergeParams: true});

const CatchAsync = require('../utils/CatchAsync');
const expressError = require('../utils/ExpressError');

const Campground = require('../models/campground');
const Review = require('../models/review');

const { reviewSchema } = require('../schemas.js');



const validateReview = (req,res,next) => {
    const { error } = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg,400);
    }else{
        next(); 
    }
}



router.post('/', validateReview, CatchAsync(async(req,res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success','Successfully added a new review!');
    res.redirect(`/campgrounds/${campground._id}`);
}));
router.delete('/:reviewid', CatchAsync(async(req,res) => {
    const {id, reviewid} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull : {reviews : reviewid}});   //pull operator is used to remove the reviewID from the reviews array of the campground
    await Review.findByIdAndDelete(reviewid);
    req.flash('success','Successfully deleted review!');
    res.redirect(`/campgrounds/${id}`);
}));


module.exports = router;