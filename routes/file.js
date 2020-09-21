var express = require("express");
var router = express.Router();
var multer=require('multer');
var file=require('../model/file');
var middleware = require("../middleware");
const upload=multer({
})

router.get('/files', middleware.isloggedin, async function (req, res) {
    res.render('files.ejs');
});
router.post('/files/upload',middleware.isloggedin,upload.single('file'),async function(req,res){
    const tobeadded={
        filename:req.body.filename,
        file:req.file.buffer,
        author:req.user.username
    }
    console.log(req.file.buffer);
    const newfile=await file.create(tobeadded);
    req.user.userfiles.push(newfile);
    await req.user.save();
    console.log(req.user);
    res.send("Uploaded Successfully");
})
router.post('/files/download/:fileid',middleware.isloggedin,async function(req,res){
   const buffer=file.findById(req.params.fileid);
   console.log(fileid);
   res.send({});
})
module.exports=router;