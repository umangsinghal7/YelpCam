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