const express = require('express');
const router = express.Router();
const CatchAsync = require('../utils/CatchAsync');
const expressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const { campgroundSchema } = require('../schemas.js');

const validateCampground = (req,res,next) => {
    
    const { error } = campgroundSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new expressError(msg,400);
    }else{
        next(); 
    }
}

router.get('/', CatchAsync(async(req,res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index',{campgrounds})
}))

router.get('/new', CatchAsync(async(req,res) => {
    res.render('campgrounds/new')
}));

router.post('/', validateCampground, CatchAsync(async(req,res,next) => {
    
    // if(!req.body.Campground) {
    //     throw new ExpressError('Invalid Campground Data',400);
    // }
    const campground = new Campground(req.body.Campground);
    await campground.save();
    req.flash('success','Successfully made a new campground!');
    res.redirect(`/campgrounds/${campground._id}`)
    
}));



router.get('/:id/edit', CatchAsync(async(req,res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    if(!campground){
        req.flash('error','Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit',{campground})
}));

router.put('/:id',validateCampground, CatchAsync(async(req,res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.Campground});    
    req.flash('success','Successfully updated campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}));

router.get('/:id', CatchAsync(async(req,res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id).populate('reviews');
    if(!campground){
        req.flash('error','Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show',{campground})
}));

router.delete('/:id', CatchAsync(async(req,res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success','Successfully deleted campground!');
    res.redirect('/campgrounds');
}));


module.exports = router;