if(process.env.NODE_ENV !== "production"){       // so that we can use .env file in development environment
    require('dotenv').config();                     
}

console.log(process.env.SECRET)
console.log(process.env.API_key)

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
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');


const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/review');
const userRoutes = require('./routes/users');


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

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
    res.locals.currentUser = req.user;   // so that we can access the current user in all the templates
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/campgrounds',campgroundRoutes);
//app.use('/campgrounds/:id/reviews',reviewRoutes);
app.use('/',userRoutes);

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