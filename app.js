var createError = require('http-errors');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local');
var passport = require('passport');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var request = require('request');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var passportLocalMongoose = require('passport-local-mongoose');
var mongoStore = require('connect-mongo')(session);


// Routes
var indexRouter = require('./app_server/routes/index');
var cartRoutes = require('./app_server/routes/cart');
var userRoutes = require('./app_server/routes/user');

// Models
var User                  = require("./app_server/models/user"),
    Plan                  = require("./app_server/models/plan"),
    Domain                = require("./app_server/models/domain")

// Connect to the Database
mongoose.connect("mongodb://localhost/Web_Dream");



// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// Setup the store for cart functionality
app.use(session({
  secret: "I am compesating with my expensive computer",
  resave: false,
  saveUninitialized: false,
  store: new mongoStore({mongooseConnection: mongoose.connection})
}));

// Setup Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.session = req.session;
   next();
});

// Seed new product
// Plan.create({name: "Dreamer", price: 4.99});
// Plan.create({name: "Innovater", price: 9.99});
// Plan.create({name: "CEO", price: 49.99})
// console.log('Plan Created')

// Routes
app.use('/', indexRouter);
app.use('/cart', cartRoutes);
app.use('/user', userRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
