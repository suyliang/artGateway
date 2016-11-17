/**
 * Created by Administrator on 2016/8/1.
 */
/**
 * Created by Administrator on 2016/3/12.
 */
//--------------------------------------------------------------------------------------------------------------------------------------
////连接网关的客户端-------------------------------------------
//var HeadBodyBuffers = require('./uint/head_body_buffers').HeadBodyBuffers;
//var hbd = new HeadBodyBuffers(4, packetLength);
//var ZgbManager = require("./zgbManager")
//var zgbManager;
var logger = require('../uint/myLog4js').myLog4js;

var util = require('util');
var EventEmitter=require('events').EventEmitter;
var port;
var host;
var net = require('net');
var hbd;
var client = new net.Socket();
var isConnected = 0;
var self_this;
/*function packetLength(data) {
 return data.readUInt32BE(0);
 }*/
function connectCarServer(_port,_host,_hbd){

    port = _port;
    host = _host;
    hbd = _hbd;
    self_this = this;
    this.initConnect();
}

util.inherits(connectCarServer, EventEmitter);

connectCarServer.prototype.initConnect = function()
{

    client.connect(port,host,reconnect_callBack);
}


connectCarServer.prototype.getClient = function()
{

    return client;
}
connectCarServer.prototype.getStatus = function()
{

    return isConnected;
}


client.on('data', function(data)
{

    hbd.addBuffer(data);
});

client.on('error',function(error)
{

    console.error(error);

    isConnected = 0;
    client.destroy();
})

client.on('close',function(error)
{

    isConnected = 0;

    var errcode = "null";
    if(error != null)
    {
        errcode = JSON.stringify(error);
    }

    //logger.writeErr("gate_client is closeed===========" + errcode);
    console.info("gate_client is closeed:::" + errcode)

    self_this.emit("closeed",error);

    client.removeListener('connect',reconnect_callBack);

    setTimeout(function()
    {
        client.connect(port,host,reconnect_callBack);
    },5000);

});
//回调函数---------------------
function reconnect_callBack(error)
{

    isConnected = 1;
    if(error)
    {
        //logger.writeErr("gate_client is connectErr:::" + error.code);
        //console.info("gate_client is connectErr" + error.code)
        return;
    }
    else
    {
        //logger.writeErr("gate_client is connected");
        //console.info("gate_client is connected")
        self_this.emit("connected",error);
    }
}

connectCarServer.prototype.write = function(data)
{

    if(isConnected == 1)
    {
        var cmdid = data[3];
        client.write(data);

    }else{
        console.info(port + ":gateway is had not connected");
    }
}

module.exports = connectCarServer;
