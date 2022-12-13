var express = require("express");
var bodyParser = require("body-parser");
var multer = require('multer');
var path = require('path');
var app = express();

app.use(bodyParser.json());

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/tour_images');
    },
    filename: function (req, file, cb) {
        var microsecond = Math.round(new Date().getTime() / 1000 * Math.floor(Math.random() * 1000000000));
        cb(null, microsecond + path.extname(file.originalname));
    }
});

var upload = multer({ storage : storage }).array('userPhoto',1000); // 1000 is files limit at a time user can upload

app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        // console.log(req.body);
        console.log("file details from client side >> ", req.files);
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});