const { text } = require("body-parser");
var mongoose = require("mongoose")
var fileschema= new mongoose.Schema(
    {
        filename: {
            type: String,
            required:true,
        },
        isPublic: {
            type: Boolean,
            default:true,
        },
        file:{
            type:Buffer,
            required:true
        },
        author:{
            type:String,
            required:true
        },
        time:{
         type:Date,
         default:Date.now()  
        }
    })
var file = mongoose.model('file', fileschema);
module.exports = file;