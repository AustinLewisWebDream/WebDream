var Services = require('../models/plan'),
    Cart     = require('../models/cart')

module.exports.index = function(req, res) {
    Services.find({}, function(err, Services){
        if(err){ console.log(err); }
        
        else { 
            res.render("index", {services: Services}); }
    });
};

module.exports.hosting = function(req, res) {
    res.render('hosting')
};

module.exports.design = function(req, res) {
    res.render('designs')
};

module.exports.checkout = function(req, res) {
    // If cart empty, render empty template
    if(!req.session.cart){
        res.render('/');
    }
    var cart = new Cart(req.session.cart);
    res.render('checkout', {products: cart.generateArray(), totalPrice: cart.totalPrice});
};

