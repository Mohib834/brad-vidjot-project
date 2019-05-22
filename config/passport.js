const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/User');

module.exports = function(passport){
    passport.serializeUser((user, done) => {
        done(null, user.id); 
    })

    passport.deserializeUser((id, done) =>{
        User.findById(id, (err, user) => {
            done(err, user);
        })
    })

    passport.use('local-signup', new LocalStrategy({
        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true
    }, async (req, email, password, done) => {
        const user = await User.findOne({ email });
        try{
            if(user) return  done(null, false, req.flash('signupmsg', 'The email is already registered'));
            if(req.body.password !== req.body.passwordConfirm){
                done(null, false, req.flash('signupmsg', 'Password do not match'));
            } else{
                const newUser = new User({ email, password });
                await newUser.save();
                return done(null, newUser, req.flash('success-signup', 'Account created successfully!'));
            }
        } catch(e){
            done(e)
        }
    }))

    passport.use('local-signin', new LocalStrategy({
        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true
    }, async(req, email, password, done) => {
        try{
            const user = await User.findOne({ email });
            if(!user) return done(null, false, req.flash('loginmsg', 'Wrong Credentials!'));

            const isMatch = await user.isValidPassword(password);
            if(!isMatch) return done(null, false, req.flash('loginmsg', 'Wrong Credentials!'))
            return done(null, user, req.flash('success-login', 'Login Successfull!'));
        } catch(err){
            done(err);
        }
    }))
}