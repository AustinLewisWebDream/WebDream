var express = require('express');
var ctrlMain = require('../controllers/main');
var ctrlDomain = require('../controllers/domain');
var router = express.Router();

/* GET home page. */
router.get('/', ctrlMain.index);

router.get('/hosting', ctrlMain.hosting);

router.get('/design', ctrlMain.design);

router.get('/domain', ctrlDomain.checkAvailable, ctrlDomain.get);
router.get('/domain/update/:id', ctrlDomain.checkAvailable, ctrlDomain.getDomain);

router.get('/checkout', ctrlMain.checkout);

module.exports = router;
