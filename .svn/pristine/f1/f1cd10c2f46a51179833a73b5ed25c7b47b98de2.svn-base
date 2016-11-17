/**
 * Created by Anson on 2016/3/16.
 */
var getmac;
var util = require('util');
var EventEmitter=require('events').EventEmitter;
var gateway = require("./proto/iotgateway.js");

var pathConfig = require("./pathConfig.js")

var Common = require("./common.js");
var common = new Common();

var deviceList = []; //设备列表数组缓存
var writeZgbAttributeQueue = [];//写属性数组缓存 zgb
var writeModbusAttributeQueue = [];//写属性数组缓存 modbus
var writeBacnetAttributeQueue = [];//写属性数组缓存 bacnet
var writeFireOrParkAttributeQueue = [];//写属性数组缓存 火灾或停车

var readAttributeQueue = [];//读属性数组缓存

var gatewayAddress = "5";
var gatewayIPAddress = "";
var gatewayVersion = "v1.0";
var gatewayDescription = "这是syl的一个测试网关"

function IotDevice (){
    this.writable = true;
    this.D = 0;
    this.V = 1011;
    
    if(pathConfig.get_debug() == false){
        
        getmac = require('getmac');
        getGatewayMac();
    }
    gatewayIPAddress = getIPAdress();
    //getGatewayMac();
}

util.inherits(IotDevice, EventEmitter);

function getGatewayMac(){
    getmac.getMac(function(err, macAddress) 
    {
        if (err){
            throw err;
        }
        gatewayAddress = macAddress.replace(/:/g, '').toLowerCase();
        //callback();
    });
}

function getIPAdress(){
    var interfaces = require('os').networkInterfaces();
    for(var devName in interfaces){
        var iface = interfaces[devName];
        for(var i=0;i<iface.length;i++){
            var alias = iface[i];
            if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                return alias.address;
            }
        }
    }
}


IotDevice.prototype.getGatewayAddress = function (){
    return gatewayAddress;
}

//握手
IotDevice.prototype.IotHandshake = function ()
{
    var package = new gateway.GwHandshakeInd;
    package.address = gatewayAddress;
    var info = new gateway.HandshakeInfo_t;
    info.productID = common.handshakeInfo().productID;
    info.productKey = common.handshakeInfo().productKey;
    package.handshakeInfo = info;
    var buffer = package.encode().toBuffer();
    this.emit("ind",package.cmdId,buffer);
}

//心跳包
IotDevice.prototype.IotBeat= function ()
{
    var package = new gateway.GwBeatInd;
    package.address = gatewayAddress;
    var buffer = package.encode().toBuffer();
    this.emit("ind",package.cmdId,buffer);
}
//网关信息上传
IotDevice.prototype.IotGwGatewayInfoInd = function ()
{
    var package = new gateway.GwGatewayInfoInd;
    package.address = gatewayAddress;
    package.ipAddress = gatewayIPAddress;
    var info = new gateway.GatewayInfo_t;
    info.address = gatewayAddress;
    info.versions = gatewayVersion;
    info.describe = gatewayDescription;
    package.gatewayInfo = info;
    var buffer = package.encode().toBuffer();
    this.emit("ind",package.cmdId,buffer);
}
//设备列表上传
IotDevice.prototype.IotGwDeviceListInd = function ()
{
    var package = new gateway.GwDeviceListInd;
    package.deviceList = deviceList;
    package.address = gatewayAddress;
    //console.info(deviceList);
    var buffer = package.encode().toBuffer();
    this.emit("ind",package.cmdId,buffer);
}
//设备状态属性改变，主动上传到云端去
IotDevice.prototype.IotGwUpdataDeviceStatusInd = function(arr)
{
    var package = new gateway.GwUpdataDeviceStatusInd;
    package.address = gatewayAddress;
    var statusList = [];
    var time = new Date().getTime();
    for(var i = 0;i < arr.length;i++)
    {
        var deviceStatus = new gateway.DeviceStatusList_t();
        deviceStatus.driverId = arr[i].driverId;
        deviceStatus.deviceId = arr[i].deviceId;
        deviceStatus.deviceStatus = arr[i].deviceStatus;
        deviceStatus.timestamp = time;
        statusList.push(deviceStatus);
        this.upDataDeviceStatus(arr[i].driverId,arr[i].deviceId,arr[i].deviceStatus);
    };
    package.deviceStatusList = statusList;
    var buffer = package.encode().toBuffer();
    this.emit("ind",package.cmdId,buffer);
}
//写属性响应
IotDevice.prototype.IotGwWriteObjectAttributeMultipleRsp = function(status,timestamp)
{
    var package = new gateway.GwWriteObjectAttributeMultipleRsp;
    package.address = gatewayAddress;
    package.status = status;
    package.timestamp = timestamp;
    var buffer = package.encode().toBuffer();
    this.emit("rsp",package.cmdId,buffer);
}

//设备扫描：：：设备列表和配置设备使用列表的对比结果上传
IotDevice.prototype.gwScanDeviceRsp = function(_newDeviceList)
{
    var package = new gateway.GwScanDeviceRsp;
    package.address = gatewayAddress;
    package.driverId = 0;
    package.newDeviceList = _newDeviceList;
    var buffer = package.encode().toBuffer();
    this.emit("rsp",package.cmdId,buffer);
}
//删除设备响应 --》结果发给客户端
IotDevice.prototype.gwDeleteDeviceRsp = function(deviceId,status)
{
    var package = new gateway.GwDeleteDeviceRsp;
    package.address = gatewayAddress;
    package.driverId = 0;
    if(deviceId != -1)
    {
        package.deviceId = deviceId;
    }
    package.status = status;
    var buffer = package.encode().toBuffer();
    this.emit("rsp",package.cmdId,buffer);
}

//获取网关信息的响应 --》结果发给客户端
IotDevice.prototype.gwGetGatewayInfoRsp = function()
{
    var package = new gateway.GwGetGatewayInfoRsp;
    package.address = gatewayAddress;
    package.ipAddress = gatewayIPAddress;
    package.status = gateway.gwStatus_t.STATUS_SUCCESS;
    var info = new gateway.GatewayInfo_t;
    info.address = gatewayAddress;
    info.versions = gatewayVersion;
    info.describe = gatewayDescription;
    package.gatewayInfo = info;
    var buffer = package.encode().toBuffer();
    this.emit("ind",package.cmdId,buffer);
}


//下载配置文件响应 --》结果发给客户端
IotDevice.prototype.gwUpLoadConfigRsp = function(status,uid)
{
    var package = new gateway.GwUpLoadConfigRsp;
    package.address = gatewayAddress;
    package.result = status;
    package.upLoadId = uid;
    var buffer = package.encode().toBuffer();
    this.emit("rsp",package.cmdId,buffer);
}

//检查更新git上的程序 --》结果发给客户端
IotDevice.prototype.gwCheckGatewayUpdataRsp = function(reqType,result)
{
    var status = gateway.gwStatus_t.STATUS_FAILURE;
    if(result == true){
        status = gateway.gwStatus_t.STATUS_SUCCESS;
    }
    var package = new gateway.GwCheckGatewayUpdataRsp;
    package.address = gatewayAddress;
    package.reqType = reqType;
    package.result = status;
    var buffer = package.encode().toBuffer();
    this.emit("rsp",package.cmdId,buffer);
}


//上传dido的数据列表 --》结果发给客户端
IotDevice.prototype.GwDidoUseDataListInd = function(didoUseDataList)
{
    var package = new gateway.GwDidoUseDataListInd;
    package.address = gatewayAddress;
    package.driverId = 0;
    package.didoUseDataList = didoUseDataList;
    var buffer = package.encode().toBuffer();
    this.emit("ind",package.cmdId,buffer);
}



//属性值转换
function attributeValueConvert(attributeValue)
{
    if(attributeValue == null || attributeValue == "")return null;
    var beginIndex = attributeValue.offset;
    var endIndex = attributeValue.limit;
    var readLen = endIndex - beginIndex;
    var myBytes = new Buffer(readLen);
    attributeValue.buffer.copy(myBytes, 0, beginIndex, endIndex);
    return myBytes;
}

//数据解析器
IotDevice.prototype.IotGwReqParser= function (cmdid,data){
    switch(cmdid) {
        case gateway.CmdId_t.GW_WRITE_OBJECT_ATTRIBUTE_MULTIPLE_REQ: //写属性请求
            var package = new gateway.GwWriteObjectAttributeMultipleReq.decode(data);
            if (package.cmdId == gateway.CmdId_t.GW_WRITE_OBJECT_ATTRIBUTE_MULTIPLE_REQ) {
                var i, j, z;
                for (i = 0; i < package.deviceObjectAttributeList.length; i++) {
                    for (j = 0; j < package.deviceObjectAttributeList[i].objectList.length; j++) {
                        for (z = 0; z < package.deviceObjectAttributeList[i].objectList[j].attributeList.length; z++) {
                            var packet = ["driverId", "deviceId", "objectId", "objectType", "objectIndex", "attributeType", "attributeValue"];
                            packet.driverId = package.deviceObjectAttributeList[i].driverId;
                            packet.deviceId = package.deviceObjectAttributeList[i].deviceId;
                            packet.objectId = package.deviceObjectAttributeList[i].objectList[j].objectId;
                            packet.objectType = package.deviceObjectAttributeList[i].objectList[j].objectType;
                            packet.objectIndex = package.deviceObjectAttributeList[i].objectList[j].objectIndex;
                            packet.attributeType = package.deviceObjectAttributeList[i].objectList[j].attributeList[z].attributeType;
                            packet.attributeValue = package.deviceObjectAttributeList[i].objectList[j].attributeList[z].attributeValue;
                            //packet.attributeValue = attributeValueConvert(package.deviceObjectAttributeList[i].objectList[j].attributeList[z].attributeValue);
                            if (packet.attributeValue != null && packet.attributeValue != "") {
                                if (packet.driverId == common.driverCommon().driver_zgb) {
                                    if (writeZgbAttributeQueue.length < common.driverCommon().zgb_write_max) {
                                        writeZgbAttributeQueue.push(packet);
                                    }
                                }
                                else if (packet.driverId == common.driverCommon().driver_modbus) {
                                    if (writeModbusAttributeQueue.length < common.driverCommon().modbus_write_max) {
                                        writeModbusAttributeQueue.push(packet);
                                    }
                                }
                                else if (packet.driverId == common.driverCommon().driver_bacnet) {
                                    if (writeBacnetAttributeQueue.length < common.driverCommon().bacnet_write_max) {
                                        writeBacnetAttributeQueue.push(packet);
                                    }
                                } else if (packet.driverId == common.driverCommon().driver_fireOrCarPark) {
                                    if (writeFireOrParkAttributeQueue.length < common.driverCommon().firePark_write_max) {
                                        writeFireOrParkAttributeQueue.push(packet);
                                    }
                                }
                            }
                        }
                    }
                }
                this.emit("write", writeZgbAttributeQueue, writeModbusAttributeQueue, writeBacnetAttributeQueue, [], writeFireOrParkAttributeQueue);
                //this.IotGwWriteObjectAttributeMultipleRsp(gateway.gwStatus_t.STATUS_SUCCESS,package.timestamp);
            }
            break;
        case gateway.CmdId_t.GW_GENERIC_IND_RSP: //云的通用响应
            var package = new gateway.GwGenericIndRsp.decode(data);
            console.error("收到通用响应：类型为：", package.rspCmdId);
            this.emit("from_yun_common_rsp", package.rspCmdId, data);
            break;
        case gateway.CmdId_t.GW_SCAN_DEVICE_REQ: //扫描请求
            var package = new gateway.GwScanDeviceReq.decode(data);
            console.error("收到扫描请求");
            this.emit(common.iotCmdId_t().IOT_SCAN_DEVICE_EVENT, package);
            break;
        case gateway.CmdId_t.GW_DELETE_DEVICE_REQ: //删除请求
            var package = new gateway.GwDeleteDeviceReq.decode(data);
            console.error("收到删除设备的请求");
            if(package.driverId == 0){
                //只能删除zgb的设备
                this.emit(common.iotCmdId_t().IOT_DELETE_DEVICE_EVENT, package);
            }
            break;
        case gateway.CmdId_t.GW_CHECK_GATEWAY_UPDATA_REQ: //主动请求网关信息
            var package = new gateway.GwCheckGatewayUpdataReq.decode(data);
            console.error("收到更新网关程序指令");
            if (package.address == gatewayAddress) {
                this.emit(common.iotCmdId_t().IOT_REQ_UPDATA_GATEWAY_EVENT,package);
            }
            break;
        case gateway.CmdId_t.GW_UP_LOAD_CONFIG_REQ: //删除请求
            var package = new gateway.GwUpLoadConfigReq.decode(data);
            console.error("收到更新配置文件通知");
            this.emit(common.iotCmdId_t().IOT_UPLOAD_CONFIG_EVENT, package);
            break;
        case gateway.CmdId_t.GW_GET_GATEWAY_INFO_REQ: //主动请求网关信息
            var package = new gateway.GwGetGatewayInfoReq.decode(data);
            console.error("收到请求网关信息的指令");
            if (package.address == gatewayAddress){
                this.gwGetGatewayInfoRsp();
            }
            break;
        case gateway.CmdId_t.GW_GET_DEVICE_LIST_REQ: //主动请求网关信息
            var package = new gateway.GwGetDeviceListReq.decode(data);
            console.error("收到查询网关设备列表的指令");
            if (package.address == gatewayAddress) {
                this.IotGwDeviceListInd();
            }
            break;
        case gateway.CmdId_t.GW_ALL_ONOFF_REQ: //删除请求
            var package = new gateway.GwAllOnOffReq.decode(data);
            if(package.controlType == 0)
            {
                console.error("收到要全关");
            }else{
                console.error("收到要全开");
            }
            this.emit(common.iotCmdId_t().IOT_ONOFF_DEVICE_EVENT,package);
            break;
        default:
            break;
    }
}


//增加设备
IotDevice.prototype.IotDeviceAdd = function ( driverId,deviceId,describe,deviceMacAddress)
{
    deviceList.push(new gateway.DeviceList_t);
    deviceList[deviceList.length-1].driverId = driverId;
    deviceList[deviceList.length-1].deviceId = deviceId;
    deviceList[deviceList.length-1].describe = describe;
    //deviceList[deviceList.length-1].deviceMacAddress = deviceMacAddress;
    deviceList[deviceList.length-1].deviceStatus = gateway.DeviceStatus_t.DEVICE_CREATE;
    deviceList[deviceList.length-1].objectList = [];
}
//增加对象
//device_id,objectId,objectType,objectIndex,objectDes
IotDevice.prototype.IotObjectAdd= function (driverId,deviceId,objectId,objectType,objectIndex,describe){
    var i = 0;
    if(deviceList.length > 0)
    {
        while(deviceList[i].driverId != driverId || deviceList[i].deviceId != deviceId)
        {
            i++;
            if(i == deviceList.length) return;
        }
    }
    else
    {
        return;
    }
    deviceList[i].objectList.push(new gateway.ObjectList_t);
    deviceList[i].objectList[deviceList[i].objectList.length-1].objectId = objectId;
    deviceList[i].objectList[deviceList[i].objectList.length-1].objectType = objectType;
    deviceList[i].objectList[deviceList[i].objectList.length-1].objectIndex = objectIndex;
    deviceList[i].objectList[deviceList[i].objectList.length-1].describe = describe;
    deviceList[i].objectList[deviceList[i].objectList.length-1].objectStatus = gateway.ObjectStatus_t.OBJECT_CREATE;
    deviceList[i].objectList[deviceList[i].objectList.length-1].attributeList = [];
}
//增加属性
IotDevice.prototype.IotAattributeAdd= function (driverId,deviceId,objectId,attributeType,attributeDataType,attributeValueMin,attributeValueMax){
    var i= 0,j=0;
    if(deviceList.length > 0)
    {
        while(deviceList[i].driverId != driverId || deviceList[i].deviceId != deviceId)
        {
            i++;
            if(i == deviceList.length) return;
        }
    }
    else
    {
        return;
    }
    if(deviceList[i].objectList.length > 0)
    {
        //while((deviceList[i].objectList[j].objectType != objectType)&&(deviceList[i].objectList[j].objectIndex != objectIndex))
        while((deviceList[i].objectList[j].objectId != objectId))
        {
            j++;
            if(j == deviceList[i].objectList.length) return;
        }
    }
    else
    {
        return;
    }

    deviceList[i].objectList[j].attributeList.push(new gateway.AttributeList_t);
    deviceList[i].objectList[j].attributeList[deviceList[i].objectList[j].attributeList.length-1].attributeType = attributeType;
    deviceList[i].objectList[j].attributeList[deviceList[i].objectList[j].attributeList.length-1].attributeDataType = attributeDataType;
    deviceList[i].objectList[j].attributeList[deviceList[i].objectList[j].attributeList.length-1].attributeValue = ""; //c长度为4
    deviceList[i].objectList[j].attributeList[deviceList[i].objectList[j].attributeList.length-1].attributeValueMin=attributeValueMin;
    deviceList[i].objectList[j].attributeList[deviceList[i].objectList[j].attributeList.length-1].attributeValueMax=attributeValueMax;
}

//写属性
IotDevice.prototype.IotWriteAattribute= function (driverId,deviceId,objectId,attributeType,attributeValue){
    var i= 0,j= 0,z=0;
    if(deviceList.length > 0)
    {
        while(deviceList[i].deviceId != deviceId)
        {
            i++;
            if(i == deviceList.length) return;
        }
    }
    else
    {
        return;
    }
    if(deviceList[i].objectList.length > 0)
    {
        //while((deviceList[i].objectList[j].objectType != objectType)&&(deviceList[i].objectList[j].objectIndex != objectIndex))
        while((deviceList[i].objectList[j].objectId != objectId))
        {
            j++;
            if(j == deviceList[i].objectList.length) return;
        }
    }
    else
    {
        return;
    }

    if(deviceList[i].objectList[j].attributeList.length > 0)
    {
        while(deviceList[i].objectList[j].attributeList[z].attributeType != attributeType)
        {
            z++;
            if(z == deviceList[i].objectList[j].attributeList.length) return;
        }
    }
    else
    {
        return;
    }
    deviceList[i].objectList[j].attributeList[z].attributeValue = attributeValue; //c长度为4
}
//读属性
IotDevice.prototype.IotReadAattribute= function (driverId,deviceId,objectId,attributeType){
    var i= 0,j= 0,z=0;
    if(deviceList.length > 0)
    {
        while(deviceList[i].driverId != driverId)
        {
            i++;
            if( i == deviceList.length) return;
        }
    }
    else
    {
        return;
    }
    if(deviceList[i].objectList.length > 0)
    {
        //while((deviceList[i].objectList[j].objectType != objectType)&&(deviceList[i].objectList[j].objectIndex != objectIndex))
        while((deviceList[i].objectList[j].objectId != objectId))
        {
            j++;
            if(j==deviceList[i].objectList.length) return;
        }
    }
    else
    {
        return;
    }
    if(deviceList[i].objectList[j].attributeList.length > 0)
    {
        while(deviceList[i].objectList[j].attributeList[z].attributeType != attributeType)
        {
            z++;
            if(z == deviceList[i].objectList[j].attributeList.length) return;
        }
    }
    else
    {
        return;
    }
    return deviceList[i].objectList[j].attributeList[z].attributeValue; //c长度为4
}

IotDevice.prototype.x2IotAattribute= function (driverId,deviceId,objectId,objectType,objectIndex,attributeType,attributeValue,attributeValueMin,attributeValueMax){
    if(deviceList.length == 0){
        return;
    }
    var packet = {};
    packet.driverId = driverId;
    packet.deviceId = deviceId;
    packet.objectId = objectId;
    packet.objectType = objectType;
    packet.objectIndex = objectIndex;
    packet.attributeType = attributeType;
    packet.attributeValue = attributeValue;
    packet.attributeValueMin = attributeValueMin;
    packet.attributeValueMax = attributeValueMax;

    //this.IotWriteAattribute(deviceId,objectType,objectIndex,attributeType,attributeValue);
    if(readAttributeQueue.length < 100) readAttributeQueue.push(packet);

}

IotDevice.prototype.IotGwObjectAttributeMultipleInd = function (){
    var deviceObjectAttributeList=[];
    var readAttributeQueue_r=[];
    var i = 0,j = 0,z = 0,y = 0;
    /*if(readAttributeQueue.length == 7){
        console.info("--------------------------------------")
    }*/
    while(readAttributeQueue.length > 0)
    {
        var packet = {};
        packet.driverId = readAttributeQueue[0].driverId;
        packet.deviceId = readAttributeQueue[0].deviceId;
        packet.objectId = readAttributeQueue[0].objectId;
        packet.objectType = readAttributeQueue[0].objectType;
        packet.objectIndex = readAttributeQueue[0].objectIndex;
        packet.attributeType = readAttributeQueue[0].attributeType;
        packet.attributeValue = readAttributeQueue[0].attributeValue;
        packet.attributeValueMin = readAttributeQueue[0].attributeValueMin;
        packet.attributeValueMax = readAttributeQueue[0].attributeValueMax;
        readAttributeQueue.splice(0, 1);
        readAttributeQueue_r.push(packet);

    }

    while(y < readAttributeQueue_r.length)
    {
        if(deviceObjectAttributeList.length < 1) {
            deviceObjectAttributeList.push(new gateway.DeviceObjectAttributeList_t);
        }else{
            while((i < deviceObjectAttributeList.length)&&(deviceObjectAttributeList[i].deviceId != readAttributeQueue_r[y].deviceId))
            {
                i++;
                if(i == deviceObjectAttributeList.length){
                    deviceObjectAttributeList.push(new gateway.DeviceObjectAttributeList_t);
                    break;
                }
            }
        }

        if(deviceObjectAttributeList[i].objectList.length < 1) {
            deviceObjectAttributeList[i].objectList.push(new gateway.ObjectAttributeList_t);
        }else{
            while ((j < deviceObjectAttributeList[i].objectList.length) && (deviceObjectAttributeList[i].objectList[j].objectId != readAttributeQueue_r[y].objectId)) {
                j++;
                if (j == deviceObjectAttributeList[i].objectList.length) {
                    deviceObjectAttributeList[i].objectList.push(new gateway.ObjectAttributeList_t);
                    break;
                }
            }
        }

        if(deviceObjectAttributeList[i].objectList[j].attributeList < 1) {
            deviceObjectAttributeList[i].objectList[j].attributeList.push(new gateway.AttributeList_t);
        }else{
            while ((z < deviceObjectAttributeList[i].objectList[j].attributeList.length) && (deviceObjectAttributeList[i].objectList[j].attributeList[z].attributeType != readAttributeQueue_r[y].attributeType)) {
                z++;
                if (z == deviceObjectAttributeList[i].objectList[j].attributeList.length) {
                    deviceObjectAttributeList[i].objectList[j].attributeList.push(new gateway.AttributeList_t);
                    break;
                }

            }
        }

        deviceObjectAttributeList[i].driverId = readAttributeQueue_r[y].driverId;
        deviceObjectAttributeList[i].deviceId = readAttributeQueue_r[y].deviceId;
        deviceObjectAttributeList[i].objectList[j].objectId = readAttributeQueue_r[y].objectId;
        deviceObjectAttributeList[i].objectList[j].objectType = readAttributeQueue_r[y].objectType;
        deviceObjectAttributeList[i].objectList[j].objectIndex = readAttributeQueue_r[y].objectIndex;
        deviceObjectAttributeList[i].objectList[j].attributeList[z].attributeType = readAttributeQueue_r[y].attributeType;
        deviceObjectAttributeList[i].objectList[j].attributeList[z].attributeValue = readAttributeQueue_r[y].attributeValue + "";
        deviceObjectAttributeList[i].objectList[j].attributeList[z].attributeValueMin = readAttributeQueue_r[y].attributeValueMin;
        deviceObjectAttributeList[i].objectList[j].attributeList[z].attributeValueMax = readAttributeQueue_r[y].attributeValueMax;

        y++;
    }
    if(deviceObjectAttributeList.length > 0)
    {
        var time = new Date().getTime(); //返回从 1970 年 1 月 1 日至今的毫秒数;
        var package = new gateway.GwObjectAttributeMultipleInd;
        package.address = gatewayAddress;
        package.deviceObjectAttributeList = deviceObjectAttributeList;
        package.timestamp = time;
        var buffer = package.encode().toBuffer();
        this.emit("ind",package.cmdId, buffer);
    }
}

//增加对象
//device_id,objectId,objectType,objectIndex,objectDes
IotDevice.prototype.upDataDeviceStatus = function (driverId,deviceId,status){
    var i = 0;
    if(deviceList.length > 0)
    {
        while(deviceList[i].driverId != driverId || deviceList[i].deviceId != deviceId)
        {
            i++;
            if(i == deviceList.length) return;
        }
    }
    else
    {
        return;
    }
    deviceList[i].deviceStatus = status;
}


module.exports = IotDevice;