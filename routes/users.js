const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/CatchAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');
const users = require('../controllers/users');


router.route('/register')
    .get(users.Renderregister)
    .post(catchAsync(users.Register))

router.route('/login')
    .get(users.Renderlogin)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.Login)

router.get('/logout', users.Logout)

module.exports = router;