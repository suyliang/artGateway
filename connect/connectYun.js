/**
 * Created by Administrator on 2016/3/12.
 */
//--------------------------------------------------------------------------------------------------------------------------------------
////连接网关的客户端-------------------------------------------
//var HeadBodyBuffers = require('./uint/head_body_buffers').HeadBodyBuffers;
var os = require('os');
var logger = require('../uint/myLog4js').myLog4js;
var iotgateway = require("../proto/iotgateway.js");
var port;
var host;
var net = require('net');

var hbd;
var client = new net.Socket();

var iotDevice = null;
var isConnected = 0;
var isInited = 0;
var isInitStep = 0;


var reconnectTime = null;
var self;

var heartBeatInterval = 0;//心跳包的定时器
var heartBeatDelay = 30000;//心跳包的间隔时间
var handShakeDelay = 10000;//握手的间隔
var connectIsCloseedTime = handShakeDelay * 4 + 5000;//云端没返回的时间，4次握手间隔时间

var messageTime = 0;

function connectYun(_port,_host,_hbd,_iotDevice){
    self = this;
    port = _port;
    host = _host;
    hbd = _hbd;
    iotDevice = _iotDevice;
    iotDevice.on("from_yun_common_rsp",function(rspCmdId,data)
    {
        if(rspCmdId == iotgateway.CmdId_t.GW_HANDSHAKE_IND)
        {
            //握手
            //logger.writeErr("收到握手响应-----------")

            if(isInitStep == 0){
                isInitStep = 1;
                iotDevice.IotGwGatewayInfoInd();//网关信息
            }
        }
        else if(rspCmdId == iotgateway.CmdId_t.GW_GATEWAY_INFO_IND)
        {
            //logger.writeErr("收到网关信息响应-----------")

            if(isInitStep == 1){
                isInitStep = 2;
                iotDevice.IotGwDeviceListInd();//设备列表信息
            }
        }
        else if(rspCmdId == iotgateway.CmdId_t.GW_DEVICE_LIST_IND)
        {
            logger.writeErr("收到设备列表响应-----------")

            if(isInitStep == 2)
            {
                isInitStep = 3;
                isInited = 1;

                while(didoCacheList.length > 0)
                {
                    self.write(didoCacheList[0]);
                    didoCacheList.shift();
                }
            }

            heartBeatYun();
            clearInterval(heartBeatInterval);
            heartBeatInterval = setInterval(heartBeatYun,heartBeatDelay); //30秒一次心跳包*/
        }
    });

    initConnect();

}

connectYun.prototype.getStatus = function(){

    return isConnected;
}

connectYun.prototype.getIsInit = function(){

    return isConnected;
}

connectYun.prototype.getClient = function(){

    return client;
}
function initConnect()
{
    client.connect(port,host,reconnect_callBack);

    client.on('data', function(data)
    {
        //console.error("yun-----data:" )
        //console.info(data);

        messageTime = new Date().getTime();

        hbd.addBuffer(data);
    });

    client.on('error',function(error)
    {
        isConnected = 0;
        //isInited = 0;
        console.error(error);

        logger.writeErr("yun connect is err");

        client.destroy();
    })

    client.on('close',function(error)
    {

        isConnected = 0;
        //isInited = 0;
        //console.error("yun connect is close------error:" + error);
        //logger.writeErr("yun connect is close------error:" + error);

        client.removeListener('connect',reconnect_callBack);

        clearTimeout(reconnectTime);

        reconnectTime = setTimeout(function()
        {
            console.error("yun sokect 执行了重连:" )
            client.connect(port,host,reconnect_callBack);

        },10000);

    });
}


//回调函数---------------------
function reconnect_callBack()
{
    isConnected = 1;

    console.info("yun connect is success");

    logger.writeErr("yun connect is success")

    isInitStep = 0;
    iotDevice.IotHandshake();//一连上服务器就先握手

    if(messageTime == 0){

        setInterval(function()
        {
            iotDevice.IotHandshake();//握手，当成心跳包处理

            var dateTime = new Date().getTime()

            if( dateTime - messageTime > connectIsCloseedTime)
            {
                if(isConnected == 1)
                {
                    sendInitConnectInfo();
                }
            }
        },handShakeDelay);
    }


    messageTime = new Date().getTime();
}

function sendInitConnectInfo()
{
    clearTimeout(reconnectTime);

    isConnected = 0;

    client.removeAllListeners();

    client.destroy();

    client.end();

    client = null;

    client = new net.Socket();

    //logger.writeErr("在连接状态下，与云5次心跳包无响应，重新创建了新的socket");

    initConnect();
}
connectYun.prototype.write = function(data)
{

    /*if(data[3] == iotgateway.CmdId_t.GW_HANDSHAKE_IND || data[3] == iotgateway.CmdId_t.GW_GATEWAY_INFO_IND || data[3] == iotgateway.CmdId_t.GW_DEVICE_LIST_IND)
    {
        logger.writeErr("握手-----网关信息-----设备列表：：：" + data[3] + "------isConnected:::" + isConnected + "------" + isInited);
    }*/

    /*if(isInited != 1){
     logger.writeErr("网关和云初始化还没完成：isInited" +isInited);
     }*/

    if(isConnected == 1)
    {
        if(data[3] == iotgateway.CmdId_t.GW_OBJECT_ATTRIBUTE_MULTIPLE_IND || data[3] == iotgateway.CmdId_t.GW_UPDATA_DEVICE_STATUS_IND)
        {
            //上传属性和更新设备状态
            if(isInited == 1)
            {
                client.write(data);
            }
        }
        else
        {
            client.write(data);
        }
    }
    else
    {
        if(data[3] == iotgateway.CmdId_t.GW_DIDO_USEDATE_LIST_IND){
            //dido的统计数据
            didoCacheList.push(data);
        }
        console.info(port + ":yun is had not connected");
    }
}

function heartBeatYun()
{
    iotDevice.IotBeat();
}


var didoCacheList = [];

module.exports = connectYun;
