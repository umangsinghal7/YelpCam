const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/CatchAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');



router.get('/register', (req, res) => {
    res.render('user/register');
})

router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to YelpCamp!');
            res.redirect('/campgrounds');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}))

router.get('/login', (req, res) => {
    res.render('user/login');
})

router.post('/login',storeReturnTo ,passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/campgrounds'; // if there is a returnTo url in the session, redirect to that url, otherwise redirect to /campgrounds
    delete req.session.returnTo; // delete the returnTo url from the session
    res.redirect(redirectUrl);
})

router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', 'Logged you out!');
        res.redirect('/campgrounds');
    });
})

module.exports = router;