const express = require('express');
const router = express.Router();
const CatchAsync = require('../utils/CatchAsync');
const Campground = require('../models/campground');
const Reviewroutes = require('./review');
const { campgroundSchema } = require('../schemas.js');
const { IsLoggedin , validateCampground , verifyAuthor } = require('../middleware');




router.get('/', CatchAsync(async(req,res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index',{campgrounds})
}))

router.get('/new', IsLoggedin, CatchAsync(async(req,res) => {
    res.render('campgrounds/new')
}));

router.post('/', validateCampground, IsLoggedin, CatchAsync(async(req,res,next) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;  // set the author of the campground to the current logged in user
    await campground.save();
    req.flash('success','Successfully made a new campground!');
    res.redirect(`/campgrounds/${campground._id}`)
    
}));



router.get('/:id/edit', IsLoggedin,verifyAuthor ,CatchAsync(async(req,res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    if(!campground){
        req.flash('error','Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });

}));

router.put('/:id', IsLoggedin, verifyAuthor, validateCampground, CatchAsync(async(req,res) => {
    const {id} = req.params;
    const camp = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    req.flash('success','Successfully updated campground!');
    res.redirect(`/campgrounds/${camp._id}`)
}));

router.get('/:id', CatchAsync(async(req,res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id)
    .populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    })
    .populate('author');
    console.log(campground);
    if(!campground){
        req.flash('error','Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show',{campground})
}));

router.delete('/:id',IsLoggedin, CatchAsync(async(req,res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success','Successfully deleted campground!');
    res.redirect('/campgrounds');
}));


module.exports = router;