const express = require('express');
const app = express();
const port = 5000;
const path = require('path');
const engine = require('ejs-mate');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const expressError = require('./utils/ExpressError');
const flash = require('connect-flash');


const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/review');


mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",() => {
    console.log("Database connected")
}); 


app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));



const sessionConfig = {    
    secret : 'nope',
    resave : false,
    saveUninitialized : true,
    cookie : {
        httpOnly : true,    // so that the cookie cannot be accessed by client side script
        expires : Date.now() + 1000*60*60*24*7,
        maxAge : 1000*60*60*24*7
    }
}
app.use(session(sessionConfig));
app.use(flash());

app.use((req,res,next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/campgrounds',campgroundRoutes);
app.use('/campgrounds/:id/reviews',reviewRoutes);

app.engine('ejs',engine);
app.set('view engine','ejs');
app.set('views',path.join( __dirname,'views'))
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res) => {
    res.render('home')
})

app.all(/(.*)/, (req, res, next) => {
    next(new expressError('page not found', 404));
});

app.use((err,req,res,next,) => {
    const {statusCode = 500,} = err;
    if(!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error',{err});
});

app.listen(port, () => {
    console.log("hlo i am listeningon port 5000")

})