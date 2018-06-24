var express = require('express'),
    router = express.Router(),
    ctrlUser = require('../controllers/user'),
    middleware = require('../middleware/athenticate')
    passport = require('passport'),
    passportLocalMongoose = require('passport-local-mongoose')


// Get routes are rendered client side via javascript
router.post('/sign-up', ctrlUser.signUp);

router.post('/login', ctrlUser.login);

router.get('/panel', middleware.isLoggedIn, ctrlUser.panel);

router.get('/logout', ctrlUser.logout)

module.exports = router;