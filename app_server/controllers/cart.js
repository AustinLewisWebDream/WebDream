var Cart = require('../models/cart');
var Services = require('../models/plan');
var Domain = require('../models/domain')

module.exports.get = function (req, res) {
    // If cart empty, render empty template
    if(!req.session.cart){
        res.render('cart');
    }
    var cart = new Cart(req.session.cart);
    var products = cart.generateArray();
    var totalPrice = cart.totalPrice;
    res.render('cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
}

module.exports.addItem = function (req, res) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Services.findById(productId, function(err, service) {
        if (err) {
            return res.redirect('/');
        }
        cart.add(service, service.id);
        req.session.cart = cart;
        res.redirect('/');
    });
}

module.exports.addDomain = function (req, res) {
    // Create a new domain from information given
    Domain.create({name: req.body.domainName, price: req.body.domainPrice}, function(err, body) {
        if(err){
            console.log('Error: addDomainRoute')
            console.log(err)
        }
        else {
            var cart = new Cart(req.session.cart ? req.session.cart : {});
            Domain.findOne({ name: req.body.domainName }, function(err, domain) {
            if (err) {
                return res.redirect('/');
            }
            cart.add(domain, domain.id);
            req.session.cart = cart;
            res.redirect('/checkout');
            });
        }
    });
}