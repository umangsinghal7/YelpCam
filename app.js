const express = require('express');
const app = express();
const port = 5000;
const path = require('path');
const engine = require('ejs-mate');

const mongoose = require('mongoose');
const Campground = require('./models/campground');
const methodOverride = require('method-override');


mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",() => {
    console.log("Database connected")
}); 

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));


app.engine('ejs',engine);
app.set('view engine','ejs');
app.set('views',path.join( __dirname,'views'))

app.get('/',(req,res) => {
    res.render('home')
})

app.get('/campgrounds', async(req,res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index',{campgrounds})
})

app.get('/campgrounds/new', async(req,res) => {
    res.render('campgrounds/new')
});

app.post('/campgrounds/', async(req,res) => {
    const campground = new Campground(req.body.Campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
});



app.get('/campgrounds/:ID/edit', async(req,res) => {
    const {ID} = req.params;
    const campground = await Campground.findById(ID);
    res.render('campgrounds/edit',{campground})
});

app.put('/campgrounds/:ID', async(req,res) => {
    const {ID} = req.params;
    const campground = await Campground.findByIdAndUpdate(ID, {...req.body.Campground});
    res.redirect(`/campgrounds/${campground._id}`)
});

app.get('/campgrounds/:ID', async(req,res) => {
    const {ID} = req.params;
    const campground = await Campground.findById(ID);
    res.render('campgrounds/show',{campground})
});

app.delete('/campgrounds/:ID', async(req,res) => {
    const {ID} = req.params;
    await Campground.findByIdAndDelete(ID);
    res.redirect('/campgrounds');
});

app.listen(port, () => {
    console.log("hlo i am listeningon port 5000")

})