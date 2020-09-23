var express = require('express');
var app = express();
var methodoverride = require('method-override');
var bodyparser = require('body-parser');
var mongoose = require("mongoose");
var authroutes = require("./app/routes/auth");
var fileroutes = require("./app/routes/file");
var profileroutes = require("./app/routes/profile");
var passport = require("passport");
var user = require('./app/model/user');
var moment = require('moment');

var localstrategy = require("passport-local");
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.URL, { useNewUrlParser: true });
app.use(require("express-session")
    ({
        secret: 'rusty is cute',
        resave: false,
        saveUninitialized: false
    }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.locals.moment = moment;
app.use(express.static('public'));
app.use(methodoverride('_method'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use(authroutes);
app.use(fileroutes);
app.use(profileroutes);

app.get('/test', function(req, res) {
    res.send('hello');
})

app.listen(process.env.PORT||3000,process.env.IP,function(){
    console.log('server has started');
});

module.exports = app;