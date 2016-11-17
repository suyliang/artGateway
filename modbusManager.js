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

var ModbusAction = require('./modbus/modbusAction.js')
var modbusAction = new ModbusAction();

var readAttrisArray = [];
var readAttrisIndex = 0;

var ModbusCommon = require('./modbus/modbusCommon');
var modbusCommon = new ModbusCommon();

var Common = require('./common');
var common = new Common();

//var modbusIsInit = false;
var self;
var readOrWriteIng = false;
var allAttrisArray = [];
//var readModbusDictionary = new Array();
/*****
 * readAttrisArray
 * 设备地址（1-255）+寄存器类型（0-3）+寄存器地址（0-65535）+长度（1-255）
 返回：状态信息+数组

 **/

function ModbusManager(_iotDevice){
    self = this;
    this.iotDevice = _iotDevice;
    this.initManager();
}
util.inherits(ModbusManager, EventEmitter);

ModbusManager.prototype.initManager = function()
{
    var zongDianLianArray = new Array();
    modbusAction.on(modbusCommon.cmdId_t().READ_MODBUS_IND,function(data)
    {
        
        var readValue;
        var _readValue;
        if(readAttrisIndex == -1){
            self.dealModbusData();
            return;
        }
        if(data.stderr != "" || data.data == ""){
            //throw err
            if(readAttrisIndex < readAttrisArray.length)
            {
                readAttrisArray[readAttrisIndex].continueTimeOut ++;
                readAttrisArray[readAttrisIndex].allTimeOut ++;
            }
        }else{
            var nowtime = new Date().getTime();
            if(readAttrisIndex < readAttrisArray.length)
            {
                readAttrisArray[readAttrisIndex].continueTimeOut = 0;

                var deviceStatus = Iotgateway.DeviceStatus_t.DEVICE_ON_LINE;
                self.upDateDeviceStatus(readAttrisArray[readAttrisIndex],deviceStatus);

                /*var dataStr = data.data.slice(1,data.data.length - 1)
                var dataArr = dataStr.split(" ");
                var readBuffer = new Buffer(dataArr.length);
                
                if(dataArr.length > 2){
                    for(var i = 0;i < dataArr.length;i++)
                    {
                        if(i == 0){
                            readBuffer.writeUInt8(common.parseInt(dataArr[i]), 2);
                        }
                        if(i == 1){
                            readBuffer.writeUInt8(common.parseInt(dataArr[i]), 3);
                        }
                        if(i == 2){
                            readBuffer.writeUInt8(common.parseInt(dataArr[i]), 0);
                        }
                        if(i == 3){
                            readBuffer.writeUInt8(common.parseInt(dataArr[i]), 1);
                        }
                    }
                }else{
                    for(var i = 0;i < dataArr.length;i++)
                    {
                        if(i == 0){
                            readBuffer.writeUInt8(common.parseInt(dataArr[i]), 1);
                        }
                        if(i == 1){
                            readBuffer.writeUInt8(common.parseInt(dataArr[i]), 0);
                        }
                    }
                }*/

                //readValue = common.dealBufferValue(readAttrisArray[readAttrisIndex].attributeDataType,readBuffer);

                var dataArr = data.data.split(" ");
                _readValue = dataArr[0];

                //if(readValue != null)
                if(_readValue != null)
                {
					/*if(data.registerAddr == 4043)
                    {
                        if(zongDianLianArray["_"+data.addr+"4043"] == null)
                        {
                            zongDianLianArray["_"+data.addr+"4043"] = 0;
                        }
                        zongDianLianArray["_"+data.addr+"4043"] += 0.1;
                        _readValue = common.changeTwoDecimal_f(zongDianLianArray["_"+data.addr+"4043"]);
                    }else{
                        _readValue = common.changeTwoDecimal_f(readValue);
                    }*/
					//_readValue = common.changeTwoDecimal_f(readValue);
					
                    var send = 0;
                    if(nowtime - readAttrisArray[readAttrisIndex].upDataTime > 600000)
                    {
                        send = 1;
                    }
                    else
                    {
                        if(readAttrisArray[readAttrisIndex].attributeValue != _readValue)
                        {
                            send = 1;
                        }
                    }
                    if(send == 1)
                    {
                        readAttrisArray[readAttrisIndex].upDataTime = nowtime;
                        //上传属性改变-------------
                        readAttrisArray[readAttrisIndex].attributeValue = _readValue;
                        //self.emit(modbusCommon.cmdId_t().READ_MODBUS_IND,readAttrisArray[readAttrisIndex]);
                        var packet = readAttrisArray[readAttrisIndex];
                        self.iotDevice.x2IotAattribute(packet.driverId,packet.deviceId,packet.objectId,packet.objectType,packet.objectIndex,packet.attributeType,packet.attributeValue,packet.attributeValueMin,packet.attributeValueMax);
                        self.iotDevice.IotGwObjectAttributeMultipleInd();
                    }
                }

            }
        }
        //console.error("read ind>>>>>>>>>>" + data.addr + "---" + data.registerAddr +"-----" + data.err +"-----" + _readValue + "----readAttrisIndex：" + readAttrisIndex)
        //console.error("modbusCommon.cmdId_t().READ_MODBUS_IND:::",modbusCommon.cmdId_t().READ_MODBUS_IND,data,readValue,readAttrisArray[readAttrisIndex].deviceId,readAttrisIndex);
        self.dealModbusData();
    });
    modbusAction.on(modbusCommon.cmdId_t().WRITE_MODBUS_IND,function(data)
    {
        if(data.err){
            //throw err
        }else{

        }
        self.dealModbusData();
    });
}

var writeAttributeList = [];
ModbusManager.prototype.writeAttris = function(writeList)
{
    writeAttributeList = writeList;
}

ModbusManager.prototype.dealModbusData = function()
{
    readOrWriteIng = true;

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

    }else
    {
        if(readAttrisArray.length > 0)
        {
            readAttrisIndex ++;//返回后下标才+1,其他地方不需要
            if(readAttrisIndex >= readAttrisArray.length)
            {
                readAttrisIndex = 0;
            }
            setTimeout(function()
            {
                self.getReadAttrisBuff();

            },200)
        }
        else
        {

        }
    }
}


ModbusManager.prototype.write = function(driverId,deviceId,objectId,attributeType,attributeDataType,attributeValue)
{
    var deviceObj = configManager.getConfigXmlDevice(driverId,deviceId);
    if(deviceObj == null)
    {
        if(deviceObj.deviceAddr == "" || deviceObj.deviceAddr == null)return;
        logger.writeErr("modbusWrite>>>>>>不存在该设备:deviceId" + deviceId);
        return;
    }
    var attributeObj = deviceObj.objects["_"+objectId].attributes["_"+attributeType];;
    if(attributeObj == null)
    {
        logger.writeErr("modbusWrite>>>>>>不存在该设备:deviceId" + deviceId + "====objectId" + objectId +"=====attributeType" + attributeType);
        return;
    }
    var writeAddress = deviceObj.deviceAddr;
    var registerType = common.parseInt(attributeObj.registerType);
    var registerAddr = common.parseInt(attributeObj.registerAddr);
    var aValue = attributeValue + "";
    modbusAction.writeModbus(writeAddress,registerType,registerAddr,aValue);
}

ModbusManager.prototype.setReadAttrisList = function(arr)
{
    readAttrisArray = arr;

    //readAttrisArray.sort(common.compactLB);

    readAttrisIndex = -1;

    initModbusDictionary(false);

    if(readOrWriteIng == false)
    {
        this.dealModbusData();
    }
}

ModbusManager.prototype.getReadAttrisBuff = function()
{
    if(readAttrisIndex == -1)
    {
        readAttrisIndex = 0;
    }
    if(readAttrisIndex >= readAttrisArray.length)
    {
        readAttrisIndex = 0;
    }
    modbusAction.readModbus(
        readAttrisArray[readAttrisIndex].deviceAddress,
        readAttrisArray[readAttrisIndex].registerType,
        readAttrisArray[readAttrisIndex].registerAddr,
        common.getModbusAttriValueLength(readAttrisArray[readAttrisIndex].attributeDataType)
    )
}

//定时重置本地设备的状态，即30秒一次硬性更新状态
var modbusDictionary = new Array();//按设备地址区分，比如更新一个设备的状态时用到
var resetModbusDictionaryTime = null;
function initModbusDictionary(isreset)
{
    if(isreset == true){
        for(var key in modbusDictionary){
            modbusDictionary[key] = -1;
        }
    }else{
        for(var i = 0;i < readAttrisArray.length;i++)
        {
            var key = "_" + readAttrisArray[i].deviceAddress;
            if(modbusDictionary[key] == null)
            {
                modbusDictionary[key] = -1;
            }
        }
    }
    clearTimeout(resetModbusDictionaryTime);
    resetModbusDictionaryTime = setTimeout(function()
    {
        initModbusDictionary(true);
    },120000);
}

ModbusManager.prototype.upDateDeviceStatus = function(readAttrisObj,deviceStatus)
{
    var key = "_" + readAttrisObj.deviceAddress;
    readAttrisObj.deviceStatus = deviceStatus;
    if(modbusDictionary[key] != deviceStatus)
    {
        //console.info(readAttrisObj.deviceDes + "的状态发生了改变：" + deviceStatus);
        //logger.writeWarn(readAttrisObj.deviceDes + "的状态发生了改变：" + deviceStatus);
        self.iotDevice.IotGwUpdataDeviceStatusInd([readAttrisObj]);
    }
    modbusDictionary[key] = deviceStatus;
}
module.exports = ModbusManager