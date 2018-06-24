var User = require("../models/user");
// var Campground = require("../models/campground");
module.exports = {
   
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error", "You must be signed in to do that!");
        res.redirect("/login");
    },

    isAdmin: function(req, res, next) {
        if(req.user.admin) {
           return next(); 
        }
        req.flash("error", "Invalid Authorization");
        res.redirect("/");
    }
}