const User = require('../models/user');

module.exports.Renderregister = (req, res) => {
    res.render('user/register');
}

module.exports.Register = async (req, res, next) => {
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
}

module.exports.Renderlogin = (req, res) => {
    res.render('user/login');
}

module.exports.Login =  (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/campgrounds'; // if there is a returnTo url in the session, redirect to that url, otherwise redirect to /campgrounds
    delete req.session.returnTo; // delete the returnTo url from the session
    res.redirect(redirectUrl);
}



module.exports.Logout = (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', 'Logged you out!');
        res.redirect('/campgrounds');
    });
}