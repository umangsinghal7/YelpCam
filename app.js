const express = require('express');
const app = express();
const port = 5000;
const path = require('path');
const engine = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const {campgroundSchema} = require('./schemas.js');
const CatchAsync = require('./utils/CatchAsync');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const methodOverride = require('method-override');
const campground = require('./models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",() => {
    console.log("Database connected")
}); 

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

const validateCampground = (req,res,next) => {
    
    const { error } = campgroundSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg,400);
    }else{
        next(); 
    }
}

app.engine('ejs',engine);
app.set('view engine','ejs');
app.set('views',path.join( __dirname,'views'))

app.get('/',(req,res) => {
    res.render('home')
})

app.get('/campgrounds', CatchAsync(async(req,res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index',{campgrounds})
}))

app.get('/campgrounds/new', CatchAsync(async(req,res) => {
    res.render('campgrounds/new')
}));

app.post('/campgrounds', validateCampground, CatchAsync(async(req,res,next) => {
    // if(!req.body.Campground) {
    //     throw new ExpressError('Invalid Campground Data',400);
    // }
    const campground = new Campground(req.body.Campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
    
}));



app.get('/campgrounds/:ID/edit', CatchAsync(async(req,res) => {
    const {ID} = req.params;
    const campground = await Campground.findById(ID);
    res.render('campgrounds/edit',{campground})
}));

app.put('/campgrounds/:ID',validateCampground, CatchAsync(async(req,res) => {
    const {ID} = req.params;
    const campground = await Campground.findByIdAndUpdate(ID, {...req.body.Campground});
    res.redirect(`/campgrounds/${campground._id}`)
}));

app.get('/campgrounds/:ID', CatchAsync(async(req,res) => {
    const {ID} = req.params;
    const campground = await Campground.findById(ID);
    res.render('campgrounds/show',{campground})
}));

app.delete('/campgrounds/:ID', CatchAsync(async(req,res) => {
    const {ID} = req.params;
    await Campground.findByIdAndDelete(ID);
    res.redirect('/campgrounds');
}));

app.all(/(.*)/, (req, res, next) => {
    next(new ExpressError('page not found', 404));
});

app.use((err,req,res,next,) => {
    const {statusCode = 500,} = err;
    if(!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error',{err});
});

app.listen(port, () => {
    console.log("hlo i am listeningon port 5000")

})