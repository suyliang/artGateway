/**
 * Created by Administrator on 2016/7/13.
 */
/**
 * Created by Administrator on 2016/3/31.
 */
var logger = require('./uint/myLog4js').myLog4js;
var Iotgateway = require('./proto/iotgateway.js')
var Common = require("./common");
var common = new Common();

var util = require('util');
var EventEmitter = require('events').EventEmitter;

var ConfigManager = require('./configManager.js');
var configManager = new ConfigManager();

var Bacnet = require('./bacnet/bacnet.js')
var bacnetAction = new Bacnet();

var readAttrisArray = [];
var readAttrisIndex = 0;

var bacnetCommon = require('./bacnet/bacnetCommon');

var self;
var readOrWriteIng = false;
var bacnetDictionary = new Array();//按设备地址区分，比如更新一个设备的状态时用到


function BacnetManager(_iotDevice){
    self = this;
    this.iotDevice = _iotDevice;
    this.initManager();
}
util.inherits(BacnetManager, EventEmitter);

BacnetManager.prototype.initManager = function()
{
    /*
     bacnetData.deviceAddress;
     bacnetData.instanceType;
     bacnetData.instanceIndex;
     bacnetData.error;
     bacnetData.data;
     */
    // data = bacnetData
    bacnetAction.on(bacnetCommon.cmdId_t.READ_BACNET_IND,function(data)
    {
        var readValue;
        if(readAttrisIndex == -1){
            console.info("bacnet重设属性列表后索引发生改变");
            self.dealBacnetData();
            return;
        }
        if(data.error){
            //throw err
            if(readAttrisIndex < readAttrisArray.length && data.instanceType == readAttrisArray[readAttrisIndex].instanceType)
            {
                readAttrisArray[readAttrisIndex].continueTimeOut ++;
                readAttrisArray[readAttrisIndex].allTimeOut ++;
            }
        }else{
            
            if(readAttrisIndex < readAttrisArray.length && data.instanceType == readAttrisArray[readAttrisIndex].instanceType)
            {
                var nowtime = new Date().getTime();
                readAttrisArray[readAttrisIndex].continueTimeOut = 0;

                var deviceStatus = Iotgateway.DeviceStatus_t.DEVICE_ON_LINE;
                self.upDateDeviceStatus(readAttrisArray[readAttrisIndex],deviceStatus);

                var send = 0;
                if(nowtime - readAttrisArray[readAttrisIndex].upDataTime > 600000)
                {
                    send = 1;
                }
                else
                {
                    if(readAttrisArray[readAttrisIndex].attributeValue != data.data)
                    {
                        send = 1;
                    }
                }
                if(send == 1)
                {
                    
                    readAttrisArray[readAttrisIndex].upDataTime = nowtime;
                    readAttrisArray[readAttrisIndex].attributeValue = data.data;
                    var packet = readAttrisArray[readAttrisIndex];
                    self.iotDevice.x2IotAattribute(packet.driverId,packet.deviceId,packet.objectId,packet.objectType,packet.objectIndex,packet.attributeType,packet.attributeValue,packet.attributeValueMin,packet.attributeValueMax);
                    self.iotDevice.IotGwObjectAttributeMultipleInd();
                }

                /*if(readAttrisArray[readAttrisIndex].attributeValue != data.data)
                {
                    readAttrisArray[readAttrisIndex].attributeValue = data.data;
                    //self.emit(bacnetCommon.cmdId_t.READ_BACNET_IND,readAttrisArray[readAttrisIndex]);
                    var packet = readAttrisArray[readAttrisIndex];
                     self.iotDevice.x2IotAattribute(packet.driverId,packet.deviceId,packet.objectId,packet.objectType,packet.objectIndex,packet.attributeType,packet.attributeValue,packet.attributeValueMin,packet.attributeValueMax);
                     self.iotDevice.IotGwObjectAttributeMultipleInd();
                }*/
                //上传属性改变-------------
            }
        }
        /*console.info("---------------------------------------------------")
        console.error(readAttrisArray[readAttrisIndex].deviceAddress,
            readAttrisArray[readAttrisIndex].instanceType,
            readAttrisArray[readAttrisIndex].instanceIndex);
        console.dir(data);
        console.info("====================================================");*/
        self.dealBacnetData();
    });
    bacnetAction.on(bacnetCommon.cmdId_t.WRITE_BACNET_IND,function(data)
    {
        if(data.error){
            //throw err
        }else{

        }
        console.error("写入一次并返回了--------------------------------------------------------");
        readOrWriteIng = false;
        self.dealBacnetData();
    });

    /*/*setInterval(function()
    {
        var arr = [];
        for(var i = 0;i < 10;i++){
            var obj = {};
            obj.driverId = 2;
            obj.deviceId = 1;
            obj.objectId = 1;
            obj.attributeDataType = 57;
            obj.attributeType = 0;
            obj.attributeValue = 1000;
            arr.push(obj);
            self.writeAttris(arr);
        }
    },10000);*/
}

var writeAttributeList = [];
BacnetManager.prototype.writeAttris = function(writeList)
{
    writeAttributeList = writeList;

    if(readOrWriteIng == false)
    {
        this.dealBacnetData();
    }
}

BacnetManager.prototype.dealBacnetData = function()
{
    if(readAttrisArray.length > 0){
        readOrWriteIng = true
    }
    if (writeAttributeList.length > 0)
    {
        var driverId = writeAttributeList[0].driverId;
        var deviceId = writeAttributeList[0].deviceId;
        var objectId = writeAttributeList[0].objectId;
        var attributeDataType = writeAttributeList[0].attributeDataType;
        var attributeType = writeAttributeList[0].attributeType;
        var attributeValue = writeAttributeList[0].attributeValue;

        writeAttributeList.shift();
        self.write(driverId, deviceId, objectId, attributeType,attributeDataType, attributeValue);

    }else{
        if(readAttrisArray.length > 0)
        {
            readAttrisIndex ++;//返回后下标才+1,其他地方不需要

            setTimeout(function(){
                self.getReadAttrisBuff();
            },500);
        }else{

        }
    }
}


BacnetManager.prototype.write = function(driverId,deviceId,objectId,attributeType,attributeDataType,attributeValue)
{
    var deviceObj = configManager.getConfigXmlDevice(driverId,deviceId);
    if(deviceObj == null)
    {
        if(deviceObj.deviceAddr == "" || deviceObj.deviceAddr == null)return;
        logger.writeErr("bacnetWrite>>>>>>不存在该设备:deviceId" + deviceId);
        return;
    }
    var attributeObj = deviceObj.objects["_"+objectId].attributes["_"+attributeType];
    if(attributeObj == null)
    {
        logger.writeErr("bacnetWrite>>>>>>不存在该设备:deviceId" + deviceId + "====objectId" + objectId +"=====attributeType" + attributeType);
        return;
    }
    var writeAddress = deviceObj.deviceAddr;
    var instanceType = common.parseInt(attributeObj.instanceType);
    var instanceIndex = common.parseInt(attributeObj.instanceIndex);

    var data_value = getDataType(instanceType);
    if(data_value == null)return;
    bacnetAction.writeBacnet(writeAddress,instanceType,instanceIndex,data_value,attributeValue);
}

var type_boolean = 1;
var type_floft = 4;

function getDataType(object_type)
{
    switch (object_type){
        case 0:
        case 1:
        case 2:
            return type_floft;

        case 3:
        case 4:
        case 5:
            return type_boolean;

        default:
            return null;

    }
}


BacnetManager.prototype.setReadAttrisList = function(arr)
{
    console.info("bacnet重新设置了一次属性列表")
    readAttrisArray = arr;

    readAttrisIndex = -1;

    if(readAttrisArray.length == 0){
        readOrWriteIng = false;
        return;
    }
    initBacnetAction(false);

    if(readOrWriteIng == false)
    {
        this.dealBacnetData();
    }
}

BacnetManager.prototype.getReadAttrisBuff = function()
{
    if(readAttrisIndex == -1)
    {
        readAttrisIndex = 0;
    }
    if(readAttrisIndex >= readAttrisArray.length)
    {
        readAttrisIndex = 0;
    }
    //device_instance,object_type,object_instance
    bacnetAction.readBacnet(
        readAttrisArray[readAttrisIndex].deviceAddress,
        readAttrisArray[readAttrisIndex].instanceType,
        readAttrisArray[readAttrisIndex].instanceIndex
    )
}
//定时重置本地设备的状态，即30秒一次硬性更新状态
var resetBacnetActionTime = null;
function initBacnetAction(isreset)
{
    if(isreset == true)
    {
        for(var key in bacnetDictionary)
        {
            bacnetDictionary[key] = -1;
        }

        var ondataStatus = 0;
        for(var i = 0;i < readAttrisArray.length;i++)
        {
            if(readAttrisArray[i].continueTimeOut < global.bacnetTimeOutMax )
            {
                ondataStatus = 1
            }
        }
        if(ondataStatus == 0)
        {
            var deviceStatus = Iotgateway.DeviceStatus_t.DEVICE_OFF_LINE;
            self.upDateDeviceStatus(readAttrisArray[0],deviceStatus);
        }
    }else{
        for(var i = 0;i < readAttrisArray.length;i++)
        {
            var key = "_" + readAttrisArray[i].deviceAddress;
            if(bacnetDictionary[key] == null)
            {
                bacnetDictionary[key] = -1;
            }
        }
    }
    clearTimeout(resetBacnetActionTime);
    resetBacnetActionTime = setTimeout(function()
    {
        initBacnetAction(true);
    },120000);
}


BacnetManager.prototype.upDateDeviceStatus = function(readAttrisObj,deviceStatus)
{
    if(readAttrisObj == null) return;
    var key = "_" + readAttrisObj.deviceAddress;
    readAttrisObj.deviceStatus = deviceStatus;
    if(bacnetDictionary[key] != deviceStatus)
    {
        //console.info(readAttrisObj.deviceDes + "的状态发生了改变：" + deviceStatus);
        //logger.writeWarn(readAttrisObj.deviceDes + "的状态发生了改变：" + deviceStatus);
        self.iotDevice.IotGwUpdataDeviceStatusInd([readAttrisObj]);
    }
    bacnetDictionary[key] = deviceStatus;
}
module.exports = BacnetManager