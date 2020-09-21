var express = require("express");
var router = express.Router();
var middleware = require("../middleware");

router.get('/files', middleware.isloggedin, async function (req, res) {
    res.render('files.ejs');
});
module.exports=router;