/**
 * Created by Administrator on 2016/5/16.
 */
var http = require("http");
var fs = require("fs");

function upLoadClient(){
    this.BASE_URL = "http://192.168.0.103:8080/fdyweb/commonUpload.do"
    //this.BASE_URL = "http://120.76.75.4:8080/fdyweb/commonUpload.do"
}

upLoadClient.prototype.upload = function(_options){

    var boundaryKey = '----' + new Date().getTime();
    var data = {

        file:"null",

        filename: 'deviceAttris.info',

        note: "GetewayFileUpload"
    };
    //path:'/fdyweb/commonUpload.do?' + JSON.stringify(data),//上传服务路径
    var options = {

        host:'127.0.0.1',//远端服务器域名

        port:1337,//远端服务器端口号

        method:'POST',

        path:"/",

        headers:{

            'Content-Type':'multipart/form-data ;boundary=' + boundaryKey,

            'Connection':'keep-alive'

        }
    };

    var req = http.request(options,function(res){

        res.setEncoding('utf8');

        res.on('data', function (chunk) {

            console.log('body: ' + chunk);

        });

        res.on('end',function(){

            console.log('res end.');

        });
        res.on('error',function(error,response,body){
            console.log(body)
        });
    });

    //req.write('你好');
    req.write(

        '–' + boundaryKey + '\r\n' +

        'Content-Disposition: form-data; file="multipart/form-data";note="GetewayFileUpload";filename="deviceAttris.info"\r\n' +

        'Content-Type: application/x-zip-compressed\r\n\r\n'

    );
    //file=文件类型&fileName=文件名称&note=GetewayFileUpload
    //设置1M的缓冲区

    var fileStream = fs.createReadStream('./upLoadInfos/deviceAttris/deviceAttris.info',{bufferSize:1024 * 1024*2});

    fileStream.pipe(req,{end:false});

    fileStream.on('end',function(){

        req.end('\r\n–' + boundaryKey + '–');

    });
}

var server = http.createServer(function(req,res){
    if(req.url !== "/favicon.icon"){
        req.on('data', function (data) {
            console.log("服务器端收到数据：" + data);
            res.end();
        })
    }
}).listen(1337,"127.0.0.1");



module.exports = upLoadClient;




/*
 var http = require('http');
 var path = require('path');
 var fs = require('fs');

 function postFile(fileKeyValue, req) {
 var boundaryKey = Math.random().toString(16);
 var enddata = '\r\n----' + boundaryKey + '--';

 var files = new Array();
 for (var i = 0; i < fileKeyValue.length; i++) {
 var content = "\r\n----" + boundaryKey + "\r\n" + "Content-Type: application/octet-stream\r\n" + "Content-Disposition: form-data; name=\"" + fileKeyValue[i].urlKey + "\"; filename=\"" + path.basename(fileKeyValue[i].urlValue) + "\"\r\n" + "Content-Transfer-Encoding: binary\r\n\r\n";
 var contentBinary = new Buffer(content, 'utf-8');//当编码为ascii时，中文会乱码。
 files.push({contentBinary: contentBinary, filePath: fileKeyValue[i].urlValue});
 }
 var contentLength = 0;
 for (var i = 0; i < files.length; i++) {
 var stat = fs.statSync(files[i].filePath);
 contentLength += files[i].contentBinary.length;
 contentLength += stat.size;
 }

 req.setHeader('Content-Type', 'multipart/form-data; boundary=--' + boundaryKey);
 req.setHeader('Content-Length', contentLength + Buffer.byteLength(enddata));

 // 将参数发出
 var fileindex = 0;
 var doOneFile = function(){
 req.write(files[fileindex].contentBinary);
 var fileStream = fs.createReadStream(files[fileindex].filePath, {bufferSize : 4 * 1024});
 fileStream.pipe(req, {end: false});
 fileStream.on('end', function() {
 fileindex++;
 if(fileindex == files.length){
 req.end(enddata);
 } else {
 doOneFile();
 }
 });
 };
 if(fileindex == files.length){
 req.end(enddata);
 } else {
 doOneFile();
 }
 }

 //测试用例
 //http://nodejs.org/api/http.html#http_http_request_options_callback
 var files = [
 {urlKey: "file1", urlValue: "E:\\DFBF.jpg"},
 {urlKey: "file2", urlValue: "E:\\1.jpg"},
 {urlKey: "file3", urlValue: "E:\\Pro 空格 中文.mp3"}
 ]
 var options = {
 host: "localhost",
 port: "8908" ,
 method: "POST",
 path: "/Home/Upload"
 }

 var req = http.request(options, function(res){
 console.log("RES:" + res);
 console.log('STATUS: ' + res.statusCode);
 console.log('HEADERS: ' + JSON.stringify(res.headers));
 //res.setEncoding("utf8");
 res.on("data", function(chunk){
 console.log("BODY:" + chunk);
 })
 })

 req.on('error', function(e){
 console.log('problem with request:' + e.message);
 console.log(e);
 })
 postFile(files, req);
 console.log("done");*/
