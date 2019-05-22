const express = require('express');
const router = express.Router();
const User = require('../model/User');
const passport = require('passport');


router.get('/login', (req, res) => {
    res.render('users/login', {message:req.flash('loginmsg')});
})

router.get('/register', (req, res) => {
    res.render('users/register',{ message: req.flash('signupmsg')});
})

router.post('/login', passport.authenticate('local-signin', {
    successRedirect:'/ideas',
    failureRedirect:'/users/login',
    failureFlash:true
}))

//form validation is left and must
router.post('/register', passport.authenticate('local-signup', {
    successRedirect:'/ideas',
    failureRedirect:'/users/register',
    failureFlash:true
}), (req, res) => {
 
})

router.get('/logout', (req, res) => {
    req.logout(); //passport provided methods
    res.redirect('/'); //passport provided methods
})

module.exports = router;