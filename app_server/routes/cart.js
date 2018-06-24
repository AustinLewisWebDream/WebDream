var express = require("express"),
    ctrlCart = require('../controllers/cart');

var router = express.Router();

router.get('/', ctrlCart.get)

router.get('/add/:id', ctrlCart.addItem)

router.post('/add/domain', ctrlCart.addDomain)

module.exports = router;