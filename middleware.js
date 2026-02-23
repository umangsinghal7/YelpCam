const expressError = require('./utils/ExpressError');
const { campgroundSchema, reviewSchema } = require('./schemas.js');
const Campground = require('./models/campground');
const Review = require('./models/review');


module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}


module.exports.IsLoggedin = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl; // store the url they are requesting so that we can redirect them to that url after they login
        req.flash('error','You must sign in first!!');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateCampground = (req,res,next) => {
    
    const { error } = campgroundSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new expressError(msg,400);
    }else{
        next(); 
    }
}

module.exports.verifyAuthor = async (req,res,next) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    if(!campground.author.equals(req.user._id)){
        req.flash('error','You do not have permission to edit this campground!');
        return res.redirect(`/campgrounds/${id}`);    
    }
    next();
}

module.exports.verifyReviewAuthor = async (req,res,next) => {
    const {id,reviewid} = req.params;
    const review = await Review.findById(reviewid);
    if(!review.author.equals(req.user._id)){
        req.flash('error','You do not have permission to edit this review!');
        return res.redirect(`/campgrounds/${id}`);
    
    }
    next();
}

module.exports.validateReview = (req,res,next) => {
    const { error } = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new expressError(msg,400);
    }else{
        next(); 
    }
}