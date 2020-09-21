var express = require("express");
var router = express.Router();
var middleware = require("../middleware");

router.get('/profile', middleware.isloggedin, async function (req, res) {
    res.render('profile.ejs');
});
module.exports=router;