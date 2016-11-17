/**
 * Created by Administrator on 2016/3/9.
 */
// simple client  test

var yun_port = 11000;
var gate_port = 11001;
var yun_host = "192.168.1.1";
var gate_host = "127.0.0.1";
var net = require('net');

var HeadBodyBuffers = require('./../uint/head_body_buffers').HeadBodyBuffers;
var yunState = 0;
var gatewayState = 0;

function packetLength(data) {
    return data.readUInt32BE(0);
}

//--------------------------------------------------------------------------------------------------------------------------------------
//网关连接云服务器的客户端-------------------------------------------
var yun_hbd = new HeadBodyBuffers(4, packetLength);

var yun_client = net.connect(yun_port,yun_host,function(){
    console.log('client connected');
    yunState = 1;
    //客户端连上云服务
    //client.write('world!\r\n');
});
yun_hbd.on('packet', function (packet) {
    var head = packet.slice(0, 4);
    var body = packet.slice(4);
    console.log("from service:body:", body.toString(), body.length);
    setTimeout(function(){
        yun_client.write(packet);
    },1000)
})
var keepAlive =   '{type:\"keepAlive\"}';
var packet = new Buffer(4+ Buffer.byteLength(keepAlive));
packet.writeUInt32BE(Buffer.byteLength(keepAlive),0);
packet.write(keepAlive,4);
yun_client.write(packet);
yun_client.on('data', function(data)
{
    yun_hbd.addBuffer(data);
});
yun_client.on('close',function()
{
    yunState = 0;
    console.log('Connection closed');
});
yun_client.on('error',function(error)
{
    yunState = 0;
    console.error(error);
    yun_client.destroy();
})



//--------------------------------------------------------------------------------------------------------------------------------------
////连接网关的客户端-------------------------------------------
var gateway_hbd = new HeadBodyBuffers(4, packetLength);

var gateway_client = net.connect(yun_port,yun_host,function(){
    console.log('gayeway connected');
    //客户端连上云服务
    //client.write('world!\r\n');
});
gateway_hbd.on('packet', function (packet) {
    var head = packet.slice(0, 4);
    var body = packet.slice(4);
    console.log("from service:body:", body.toString(), body.length);
    setTimeout(function(){
        gateway_client.write(packet);
    },1000)
})
gateway_client.on('data', function(data) {
    gateway_hbd.addBuffer(data);
});

gateway_client.on('error',function(error){
    console.error(error);
    gateway_client.destroy();
})

yun_client.on('close',function(error)
{
    log.info("the yun close:" + error);
    clearInterval(heartBeatTimerYun);
    yun_client.removeListener('connect',reconnect_callBack_yun);//移除监听
    //yunClient.connect(yunPort,yunHost,reconnect_callBack_yun);
    setTimeout(yunReConnectFun, 15000);//十秒后重连
});
gateClient.on('close',function(error)
{
    log.info("the gateway close");
    gateClient.removeListener('connect',reconnect_callBack_gate);
    gateClient.connect(servicePort,gwHost,reconnect_callBack_gate);
});


function yunReConnectFun()
{
    yunClient.connect(yunPort,yunHost,reconnect_callBack_yun);
}



function yunHandshake()
{
    var buf = Buffer.concat([Buffer(msgHead),bufferLen,Buffer(desAddress),Buffer(gatewayAddress.gatewayAddress())]);
    yun_client.write(buf);
    log.info("the yun handshake");
}

//module.exports = YunClient;