var User = require('../models/user');
var passport = require('passport')
var passportLocalMongoose = require("passport-local-mongoose")

module.exports.signUp = function(req, res) {
    var newUser = new User({username: req.body.user, admin: false})
    User.register(newUser, req.body.pass, function(err, user){
        if(err){
            console.log(err)
            return res.redirect('/');
        }
        res.redirect("/"); 
    });
}

module.exports.login = function (req, res, next) {
    console.log(req.body);
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/cart',
    })(req, res, next);
  };

module.exports.panel = function(req, res) {
    res.render('user-panel')
}

module.exports.logout = function(req, res) {
    req.logout();
    res.redirect('/')
}