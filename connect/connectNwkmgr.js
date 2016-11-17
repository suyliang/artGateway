/**
 * Created by Administrator on 2016/3/12.
 */
//--------------------------------------------------------------------------------------------------------------------------------------
////连接网关的客户端-------------------------------------------
//var HeadBodyBuffers = require('./uint/head_body_buffers').HeadBodyBuffers;
//var hbd = new HeadBodyBuffers(4, packetLength);
//var ZgbManager = require("./zgbManager")
//var zgbManager;
var util = require('util');
var EventEmitter = require('events').EventEmitter;
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
function connectNwkmgr(_port,_host,_hbd){
    port = _port;
    host = _host;
    hbd = _hbd;
    self_this = this;
    this.initConnect();
}
util.inherits(connectNwkmgr, EventEmitter);
connectNwkmgr.prototype.getClient = function(){
    //console.logs(global.driverObjs["_0"]);
    return client;
}
connectNwkmgr.prototype.getStatus = function(){
    return isConnected;
}
connectNwkmgr.prototype.initConnect = function()
{
    //console.error("isConnected:::" , isConnected)
    client.connect(port,host,reconnect_callBack);
}

client.on('data', function(data) {
    hbd.addBuffer(data);
});

client.on('error',function(error){
    console.error(error);
    client.destroy();
})

client.on('close',function(error)
{
    isConnected = 0;

    var errcode = "null";
    if(error) {
        errcode = JSON.stringify(error);
    }
    //logger.writeErr("nwkmgr_client is closeed=========" + errcode);
    console.info("nwkmgr_client is closeed:::" + errcode);
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
    if(error != null){
        //logger.writeDebug("nwkmgr_client is connectErr:::" + reconnectCount_nwkmgr_client + error.code);
        console.info("nwkmgr_client is connectErr" + error.code)
        return;
    }else{
        //logger.writeDebug("nwkmgr_client is connected:::" + reconnectCount_nwkmgr_client);
        console.info("nwkmgr_client is connected")
        self_this.emit("connected",error);
    }
}

connectNwkmgr.prototype.write = function(data){
    if(isConnected == 1){
        client.write(data);
    }else{
        console.info(port + ":nwkmgr is had not connected");
    }
}

module.exports = connectNwkmgr;
