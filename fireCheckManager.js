/**
 * Created by Administrator on 2016/8/2.
 */
var logger = require('./uint/myLog4js').myLog4js;
var iotgateway = require('./proto/iotgateway.js')
var FireAction = require("./fireCheck/fireCheckAction")
var fireAction = new FireAction();
var fireData = require("./fireCheck/fireCheckData")
var self;
var fireDictionary = new Array();

function FireCheckManager(_iotDevice)
{
    self = this;
    this.iotDevice = _iotDevice;
    this.initManager();
}

FireCheckManager.prototype.setFireDictionary = function(arr)
{
    fireDictionary = arr;
    initDeviceDictionary(false);
}

/*FireCheckManager.prototype.initManager = function()
 {
     fireAction.on(fireData.REPORT_EVENT,function(adress,cmdType,value)
     {
         var key = fireData.setFireAttrisKey(adress,cmdType);
         //console.dir(fireDictionary);
         var packet = fireDictionary[key];
         if(packet)
         {
             packet.attributeValue = value;
             reportEvent(packet);

             var deviceStatus = iotgateway.DeviceStatus_t.DEVICE_ON_LINE;
             self.upDateDeviceStatus(packet,deviceStatus);
         }
     });
 }*/

FireCheckManager.prototype.initManager = function()
{
    fireAction.on(fireData.REPORT_EVENT,function(adress,cmdType,value)
    {
        var key = fireData.setFireAttrisKey(adress,cmdType);
        //console.dir(fireDictionary);
        var packet = fireDictionary[key];
        if(packet)
        {
            if (cmdType == fireData.TYPE_HEARTBEAT)
            {
                var key1 = fireData.setFireAttrisKey(adress,fireData.TYPE_ALARM);
                var packet1 = fireDictionary[key1];
                if (packet1.attributeValue == ""){
                    packet1.attributeValue = "0";
                    reportEvent(packet1);
                }
            }

            packet.attributeValue = value;

            if(cmdType == fireData.TYPE_ALARM){
                console.info(packet.deviceDes + "报警了：：：：" + packet.attributeValue);
            }

            reportEvent(packet);

            var deviceStatus = iotgateway.DeviceStatus_t.DEVICE_ON_LINE;
            self.upDateDeviceStatus(packet,deviceStatus);
        }
    });
}

function reportEvent(packet,value)
{
    self.iotDevice.x2IotAattribute(packet.driverId,packet.deviceId,packet.objectId,packet.objectType,packet.objectIndex,packet.attributeType,packet.attributeValue,packet.attributeValueMin,packet.attributeValueMax);
    self.iotDevice.IotGwObjectAttributeMultipleInd();
}

//定时重置本地设备的状态，即30秒一次硬性更新状态
var devicesDictionary = new Array();//按设备地址区分，比如更新一个设备的状态时用到
var resetStatusTime = null;
function initDeviceDictionary(isreset)
{
    var curTime = new Date().getTime();
    if(isreset == true)
    {
        for(var key in devicesDictionary)
        {
            devicesDictionary[key].deviceStatus = -1;
            if(curTime - devicesDictionary[key].updateTime > 180000)
            {
                //设备被我判定为离线了
                var deviceStatus = iotgateway.DeviceStatus_t.DEVICE_OFF_LINE;
                self.upDateDeviceStatus(devicesDictionary[key],deviceStatus)
            }else{
                //设备在线
                var obj = fireDictionary[key + fireData.TYPE_ALARM];
                if(obj){
                    reportEvent(obj);
                }
            }
        }
    }
    else
    {
        for(var key1 in fireDictionary)
        {
            var key2 = "_" + fireDictionary[key1].deviceAddress;
            if(devicesDictionary[key2] == null)
            {
                devicesDictionary[key2] =
                {
                    deviceAddress:fireDictionary[key1].deviceAddress,
                    deviceDes:fireDictionary[key1].deviceDes,
                    driverId:4,
                    deviceId:fireDictionary[key1].deviceId,
                    updateTime:curTime,
                    deviceStatus:-1
                };
            }
        }
    }
    clearTimeout(resetStatusTime);
    resetStatusTime = setTimeout(function()
    {
        initDeviceDictionary(true);
    },180000);
}

FireCheckManager.prototype.upDateDeviceStatus = function(readAttrisObj,deviceStatus)
{

    var key = "_"  + readAttrisObj.deviceAddress;

    if(devicesDictionary[key] == null){
        return;
    }
    if(deviceStatus == iotgateway.DeviceStatus_t.DEVICE_ON_LINE)
    {
        readAttrisObj.deviceStatus = deviceStatus;
        var curTime = new Date().getTime();
        devicesDictionary[key].updateTime = curTime;
    }
    if(devicesDictionary[key].deviceStatus != deviceStatus)
    {
        devicesDictionary[key].deviceStatus = deviceStatus;
        //console.info(readAttrisObj.deviceDes + "的状态发生了改变：" + deviceStatus);
        self.iotDevice.IotGwUpdataDeviceStatusInd([readAttrisObj]);
    }
    devicesDictionary[key].deviceStatus = deviceStatus;
}

FireCheckManager.prototype.writeAttris = function(writeAttris)
{
    while(writeAttris.length > 0)
    {
        var writeObj = writeAttris[0];
        for(var key1 in fireDictionary)
        {
            if(fireDictionary[key1].deviceId == writeObj.deviceId && fireDictionary[key1].objectId == writeObj.objectId)
            {
                //本来应该是发什么过来，就发什么回去，但是现在客户端界面没做好，会发0或1，而功能只是为了取消报警，所以默认发0；
                //fireDictionary[key1].attributeValue = writeObj.attributeValue;
                fireDictionary[key1].attributeValue = "0";
                reportEvent(fireDictionary[key1]);
                break;
            }
        }
        writeAttris.shift();
    }

}
module.exports = FireCheckManager;