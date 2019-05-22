const passport = require('passport');

const secureRouter = (req, res, next) => {
    if(req.isAuthenticated()) return next();

    res.redirect('/users/login');
}

module.exports = secureRouter;