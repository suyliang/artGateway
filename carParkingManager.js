/**
 * Created by Administrator on 2016/8/12.
 */
/**
 * Created by Administrator on 2016/3/12.
 */
//--------------------------------------------------------------------------------------------------------------------------------------
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var logger = require('./uint/myLog4js').myLog4js;
var HeadBodyBuffers = require('./uint/head_body_buffers').HeadBodyBuffers;
var CarParkAction = require('./carPark/parkAction.js');
var carParkAction;
var manager_self;
//创建实例，同时传进两个端口的socket链接
function CarParkingManager(_iotDevice)
{
    /*this.gateway_client = _gatewayClient;
     this.nwkmgr_client = _nwkmgrClient;
     this.iotDevice = _iotDevice;
     this.zgbDeviceList = null;
     this.zgbDeviceListInfo = null;
     this.readAttrisDictionary = null;
     this.devicesDictionary = null;*/
    this.iotDevice = _iotDevice;
    this.buff_hbd = new HeadBodyBuffers(2, packetLength);
    manager_self = this;
    this.buff_hbd.on('packet', function (packet)
    {
        console.error(packet)
        /*if(packet[2] == 18){
         manager_self.nwkmgr_client.write(packet);
         }
         if(packet[2] == 19){
         manager_self.gateway_client.write(packet);
         }*/
    });

    carParkAction = new CarParkAction(8082,"192.168.0.91",manager_self.buff_hbd);

    carParkAction.on("closed",function(){

    });
    carParkAction.on("connected",function(){

    });
    carParkAction.on("error",function(){

    });
}

util.inherits(CarParkingManager, EventEmitter);

function packetLength(data)
{
    return data.readUInt8(1);
}
//往两个端口里写入数据流
CarParkingManager.prototype.writeBuff = function(buff)
{
    if(buff != null)
    {
        this.buff_hbd.addBuffer(buff);
    }
}

module.exports = CarParkingManager;