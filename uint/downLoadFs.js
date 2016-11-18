var http = require("http");
var fs = require("fs");
var util = require('util');
var pathConfig = require("../pathConfig.js");
var EventEmitter = require('events').EventEmitter;
//var server = http.createServer(function(req, res){}).listen(50082);
console.log("downLoadFs start");

//var url = "http://www.baidu.com/img/bdlogo.gif";
//var url = "http://120.76.75.49:8080/fdyweb/uploadfile/config.xml";
//var url = "http://192.168.0.103:8080/fdyweb/uploadfile/config.xml";

function DownLoadFs(){
    this.url = global.configBaseUrl;
}

util.inherits(DownLoadFs, EventEmitter);

DownLoadFs.prototype.download = function(last_url,fileName,uid)
{
    console.log("http get start");
    var writeUrl = pathConfig.get_configFolder();
    var self = this;
    //var prams = last_url.split("/");
    //var names = prams[prams.length-1].split(".");
    //var fileName = unescape(names[0]);
    var url = self.url + last_url;
    var req = http.get(url, function(res){
        var imgData = "";
        var isErr = false;
        res.setEncoding("binary");

        res.on("data", function(chunk){
            if(chunk.indexOf("<html>") != -1){
                isErr = true;
            }else{
                imgData += chunk;
            }
        });
        res.on('error', function(err) {
            isErr = true
            console.log("http get error: " + err.message);
            self.emit("upDataConfigComPlete",err,uid)
        });
        res.on("end", function()
        {
            console.log("http get end: " + isErr);
            if(isErr == true){
                self.emit("upDataConfigComPlete",true,uid)
                return;
            }
            fs.writeFile(writeUrl+ fileName +".xml", imgData, "binary", function(err)
            {
                self.emit("upDataConfigComPlete",err,uid)
            });
        });
    });
    req.setTimeout(1500,function(){
        req.abort();
    })
    req.on('error',function(err){
        console.log("http get is error: " + err.code);
        self.emit("upDataConfigComPlete",err,uid)
    });
}
module.exports = DownLoadFs;