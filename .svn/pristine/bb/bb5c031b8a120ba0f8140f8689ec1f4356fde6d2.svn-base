/**
 * Created by Administrator on 2016/4/12.
 */

var Gateway = require("./proto/gateway.js");
var Iotgateway = require("./proto/iotgateway.js");
var driver_zgb = 0;//驱动id ，zgb为0
var driver_modbus = 1;//驱动id，modbus为1；
var driver_bacnet = 2;//驱动id，bacnet为2；
var driver_unKown = 3;//驱动id，bacnet为2；
var driver_fireOrCarPark = 4;//驱动id，bacnet为2；
var zgb_write_max = 100;//zgb 允许写入的队列里存在指令的最大数；
var modbus_write_max = 100;//modbus 允许写入的队列里存在指令的最大数；
var bacnet_write_max = 100;//modbus 允许写入的队列里存在指令的最大数；
var firePark_write_max = 100;//火灾或停车 允许写入的队列里存在指令的最大数；

var zgb_read_max = 25;//zgb 允许连续读取失败最大数，超过后就不在读；
var modbus_read_max = 100;//modbus 允许连续读取失败最大数，超过后就不在读；

var productID = 111;
var productKey = 11111;

function common(){

}

common.prototype.driverCommon = function(){
    var driverCommon = {};
    driverCommon.driver_zgb = driver_zgb;
    driverCommon.driver_modbus = driver_modbus;
    driverCommon.driver_bacnet = driver_bacnet;
    driverCommon.driver_fireOrCarPark = driver_fireOrCarPark;
    driverCommon.zgb_write_max = zgb_write_max;
    driverCommon.modbus_write_max = modbus_write_max;
    driverCommon.bacnet_write_max = bacnet_write_max;
    driverCommon.firePark_write_max = firePark_write_max;
    //driverCommon.zgb_read_max = zgb_read_max;
    //driverCommon.modbus_read_max = modbus_read_max;
    return driverCommon;
}

common.prototype.iotCmdId_t = function(){
    var cmdObj = {};
    cmdObj.IOT_SCAN_DEVICE_EVENT = "scan_device_event";
    cmdObj.IOT_DELETE_DEVICE_EVENT = "delete_device_event";
    cmdObj.IOT_ONOFF_DEVICE_EVENT = "onoff_device_event";
    cmdObj.IOT_UPLOAD_CONFIG_EVENT = "upLoad_config_event";
    cmdObj.IOT_REQ_GATEWAYINFO_EVENT = "req_gatewayInfo_event";
    return cmdObj;
}


common.prototype.handshakeInfo = function(){
    var handshakeInfo = {};
    handshakeInfo.productID = productID;
    handshakeInfo.productKey = productKey;
    return handshakeInfo;
}

//检测是否要轮循去读
common.prototype.checkIsReadContinual = function(deviceType)
{
    var boo = global.zgbReadContinuals.indexOf(deviceType) != -1;
    return boo;
}

//检测是否要处理报告数据
common.prototype.checkIsReport = function(deviceType)
{
    var boo = (global.zgbReports.indexOf(deviceType) != -1) || (global.zgbOnlyReports.indexOf(deviceType) != -1);
    return boo;
}
//检测是否仅仅是要处理报告数据，不需要去读取属性
common.prototype.checkIsOnlyReport = function(deviceType)
{
    var boo = (global.zgbOnlyReports.indexOf(deviceType) != -1);
    return boo;
}

common.prototype.resetZgbReadAttris = function(readAttrisArray){
    for(var i = 0;i < readAttrisArray.length;i++){
        readAttrisArray[i].continueTimeOut = 0;
        readAttrisArray[i].allSuccess = 0;
        readAttrisArray[i].allTimeOut = 0;
    }
}

common.prototype.zgbUpdateDeviceStatusObj = function() {
    var packet = {};

    packet.driverId = -1;//配置文件上的驱动id ，0表示zgb，1表示 modbus
    packet.deviceId = -1;//配置文件上的设备id
    packet.deviceDes = -1
    packet.deviceStatus = -1;//配置文件上的设备状态

    packet.deviceAddress = -1;
    packet.deviceType = -1;
    packet.upDataTime = 0;//更新的时间
    packet.tag = 0;//标记是否有超过一定时间没有更新过报告回来的值
    return packet;
}

//
common.prototype.zgbAttrisPacket  = function(){
    var packet = {};

    packet.deviceDes = -1;//设备描述
    packet.deviceType = -1;//设备类型，就是zgb的设备id
    packet.attributeValue = "";//属性值
    packet.attributeValueMax = "";//属性最大值
    packet.attributeValueMin = "";//属性最小值

    packet.driverId = -1;//配置文件上的驱动id ，0表示zgb，1表示 modbus
    packet.deviceId = -1;//配置文件上的设备id
    packet.objectId = -1;//配置文件上的对象id
    packet.objectType = -1;//配置文件上的对象类型 av ao bv bo等
    packet.objectIndex = -1;//配置文件上的对象索引av1 av2 后面的数字就是索引
    packet.attributeType = -1;//配置文件上的属性类型，是属性节点的唯一标识
    packet.endpointId = -1;//属性的endpointId，读取属性的时候要用到
    packet.deviceAddress = -1;//配置文件上的设备物理地址 这里是所指的是转换成long型的而非配置文件里的字符串
    packet.deviceMacAddress = "";//配置文件上的设备物理地址 这里是所指的是转换成long型的而非配置文件里的字符串
    packet.deviceStatus = -1;//配置文件上的设备状态
    packet.index = 0;//如果是在一个列表里，这个是在哪个列表里的 索引

    packet.objectDes = "";//如果是在一个列表里，这个是在哪个列表里的 索引
    packet.clusterId = -1;//属性的簇id

    /*packet.continueTimeOut = -1;//连续超时的次数，如果有一次不超时（正常获取到数据的时候），这里会重置为0 表示此设备正常
    packet.allSuccess = -1;//统计读取成功的所有次数
    packet.allTimeOut = -1;//统计读取数据失败（超时）的所有次数*/

    packet.upDataTime = 0;

    return packet;
}

//zgb读属性的列表里的数据单元
common.prototype.zgbReadAtttrisPacket  = function(){
    var packet = {};

    packet.deviceDes = -1;//设备描述
    packet.deviceType = -1;//设备类型，就是zgb的设备id
    packet.deviceStatus = -1;//配置文件上的设备状态
    packet.continueTimeOut = -1;//连续超时的次数，如果有一次不超时（正常获取到数据的时候），这里会重置为0 表示此设备正常

    packet.driverId = 0;//配置文件上的驱动id ，0表示zgb，1表示 modbus
    packet.deviceId = -1;//配置文件上的设备id
    packet.objectId = -1;//配置文件上的对象id
    packet.deviceMacAddress = "";//配置文件上的设备物理地址 这里是所指的是转换成long型的而非配置文件里的字符串
    packet.deviceAddress = -1;//配置文件上的设备物理地址 这里是所指的是转换成long型的而非配置文件里的字符串
    packet.clusterId = -1;//属性的簇id，读取属性的时候要用到
    packet.deviceAttris = [];//deviceAttrisObjects
    packet.endpointId = -1;//属性的endpointId，读取属性的时候要用到
    packet.index = -1;//如果是在一个列表里，这个是在哪个列表里的 索引

    packet.allSuccess = -1;//统计读取成功的所有次数
    packet.allTimeOut = -1;//统计读取数据失败（超时）的所有次数

    packet.nowReadTime = 0;//上次读取的时间 毫秒

    packet.objectType = -1;//配置文件上的对象类型 av ao bv bo等
    packet.objectIndex = -1;//配置文件上的对象索引av1 av2 后面的数字就是索引
    packet.objectDes = "";//配置文件上的对象索引av1 av2 后面的数字就是索引

    return packet;
}
//zgb设备的一个属性的内容
common.prototype.deviceAttrisObject  = function(){
    var attriObject = {}
    attriObject.attributeId = -1;//属性id
    attriObject.attributeValue = -1;//属性值
    attriObject.attributeDataType = -1;//属性数据类型
    attriObject.alertStr = "";
    return attriObject;
}
//modbus的读取属性列表里的一个元素 和 zgb的区别主要在于 registerType和registerAddr
common.prototype.modbusReadAtttrisPacket  = function(){
    var packet = {};

    packet.attributeValue = "";
    packet.deviceDes = -1;
    packet.deviceStatus = -1;
    packet.continueTimeOut = -1;

    packet.driverId = 1;
    packet.deviceId = -1;
    packet.deviceAddress = -1;

    packet.objectId = -1;
    packet.objectType = -1;
    packet.objectIndex = -1;
    packet.registerType = -1;//读取modbus的类型
    packet.registerAddr = -1;////读取modbus的地址
    packet.attributeDataType = -1;
    packet.index = -1;

    packet.attributeValueMax = "";//属性最大值
    packet.attributeValueMin = "";//属性最小值

    packet.allSuccess = -1;
    packet.allTimeOut = -1;

    packet.attributeType = -1;

    packet.registerAddrs = [];
    packet.readDictionary = new Array();

    packet.upDataTime = 0;

    return packet;
}

//zgb读属性的列表里的数据单元
common.prototype.carParkAtttrisPacket  = function()
{
    var packet = {};

    packet.deviceDes = -1;//设备描述
    packet.deviceType = -1;//设备类型，就是zgb的设备id
    packet.deviceStatus = -1;//配置文件上的设备状态

    packet.driverId = 0;//配置文件上的驱动id ，0表示zgb，1表示 modbus
    packet.deviceId = -1;//配置文件上的设备id
    packet.objectId = -1;//配置文件上的对象id
    packet.deviceMacAddress = -1;//配置文件上的设备物理地址 这里是所指的是转换成long型的而非配置文件里的字符串
    packet.deviceAddress = -1;//配置文件上的设备物理地址 这里是所指的是转换成long型的而非配置文件里的字符串
    packet.index = -1;
    packet.objectType = -1;//配置文件上的对象类型 av ao bv bo等
    packet.objectIndex = -1;//配置文件上的对象索引av1 av2 后面的数字就是索引

    return packet;
}


//zgb读属性的列表里的数据单元
common.prototype.fireAtttrisPacket  = function()
{
    var packet = {};

    packet.deviceDes = -1;//设备描述
    packet.deviceType = -1;//设备类型，就是zgb的设备id
    packet.deviceStatus = -1;//设备状态

    packet.driverId = 0;//配置文件上的驱动id ，0表示zgb，1表示 modbus
    packet.deviceId = -1;//配置文件上的设备id
    packet.objectId = -1;//配置文件上的对象id
    packet.deviceMacAddress = -1;//配置文件上的设备物理地址 这里是所指的是转换成long型的而非配置文件里的字符串
    packet.deviceAddress = -1;//配置文件上的设备物理地址 这里是所指的是转换成long型的而非配置文件里的字符串

    packet.objectType = -1;//配置文件上的对象类型 av ao bv bo等
    packet.objectIndex = -1;//配置文件上的对象索引av1 av2 后面的数字就是索引


    packet.attributeType = -1;
    packet.attributeDataType = -1;
    packet.attributeValue = "";

    packet.attributeValueMin = "";
    packet.attributeValueMax = "";

    packet.index = -1;

    packet.cmdType = -1;//报告回来的属性类型 0 心跳包 1 电量 2报警
    return packet;
}


common.prototype.modbusTypeParameters  = function() {
    var readObject = {};
    readObject.objectId = -1;
    readObject.objectType = -1;
    readObject.objectIndex = -1;
    readObject.registerAddr = -1;
    readObject.attributeValue = -1;
    readObject.attributeDataType = -1;
    return readObject;
}
common.prototype.modbusTypeParameters1  = function() {
    var readObject = {};
    readObject.objectIds = [];
    readObject.objectTypes = [];
    readObject.objectIndexs = [];
    readObject.registerAddrs = [];
    readObject.attributeValues = [];
    readObject.attributeDataTypes = [];
    return readObject;
}


//modbus的读取属性列表里的一个元素 和 zgb的区别主要在于 registerType和registerAddr
common.prototype.bacnetPacket  = function(){
    var packet = {};

    packet.attributeValue = "";
    packet.deviceDes = -1;
    packet.deviceStatus = -1;
    packet.continueTimeOut = -1;

    packet.driverId = 1;
    packet.deviceId = -1;
    packet.deviceAddress = -1;

    packet.objectId = -1;
    packet.objectType = -1;
    packet.objectIndex = -1;
    packet.instanceType = -1;//读取bacnet的类型
    packet.instanceIndex = -1;////读取bacnet的索引
    packet.attributeDataType = -1;
    packet.index = -1;

    packet.attributeValueMax = "";//属性最大值
    packet.attributeValueMin = "";//属性最小值

    packet.allSuccess = -1;
    packet.allTimeOut = -1;

    packet.attributeType = -1;

    packet.upDataTime = 0;

    return packet;
}



common.prototype.getDeviceAddr = function(ieeeAddr_str){
    var ieeeAddr_long = parseInt(ieeeAddr_str,16);
    return ieeeAddr_long;
}

common.prototype.parseInt = function(str){
    var pint = parseInt(str);
    return pint;
}

common.prototype.dealAttriValue = function(attributeDataType,attributeValue) {
    var myvalue = null;
    if(attributeDataType == Iotgateway.AttributeDataTypes_t.DATATYPE_BOOLEAN){
        //myvalue = attributeValue.readUInt8(0, 1);
        myvalue = parseInt(attributeValue);
        if(myvalue > 1 || myvalue < 0)return;
    }
    if(attributeDataType == Iotgateway.AttributeDataTypes_t.DATATYPE_UINT8){
        //myvalue = attributeValue.readUInt8(0, 1);
        myvalue = parseInt(attributeValue);
        if(myvalue > 255 || myvalue < 0)return;
    }
    if(attributeDataType == Iotgateway.AttributeDataTypes_t.DATATYPE_INT16){
        //myvalue = attributeValue.readUInt8(0, 1);
        myvalue = parseInt(attributeValue,16);
    }
    if(attributeDataType == Iotgateway.AttributeDataTypes_t.DATATYPE_UINT16){
        //myvalue = attributeValue.readUInt8(0, 1);
        myvalue = parseInt(attributeValue,16);
    }
    if(attributeDataType == Iotgateway.AttributeDataTypes_t.DATATYPE_UINT32){
        //myvalue = attributeValue.readUInt8(0, 1);
        myvalue = parseInt(attributeValue,32);
    }
    if(attributeDataType == Iotgateway.AttributeDataTypes_t.DATATYPE_SINGLE_PREC){
        //myvalue = attributeValue.readFloatLE(0, 4);
        myvalue = parseInt(attributeValue,32);
    }
    return myvalue;
};
//值转buff 写属性时用到
common.prototype.valueToBuffer = function(attributeDataType,attributeValue) {
    var myvalue;
    if(attributeDataType == Iotgateway.AttributeDataTypes_t.DATATYPE_BOOLEAN){
        myvalue = new Buffer(1);
        myvalue.writeUInt8(attributeValue,0);
    }
    if(attributeDataType == Iotgateway.AttributeDataTypes_t.DATATYPE_INT8){
        myvalue = new Buffer(1);
        myvalue.writeInt8(attributeValue,0);
    }
    if(attributeDataType == Iotgateway.AttributeDataTypes_t.DATATYPE_UINT8){
        myvalue = new Buffer(1);
        myvalue.writeUInt8(attributeValue, 0);
    }
    if(attributeDataType == Iotgateway.AttributeDataTypes_t.DATATYPE_UINT16){
        myvalue = new Buffer(2);
        myvalue.writeUInt16LE(attributeValue, 0);
    }
    if(attributeDataType == Iotgateway.AttributeDataTypes_t.DATATYPE_INT16){
        //myvalue = attributeValue.readInt16LE(0, 2);
        myvalue = new Buffer(2);
        myvalue.writeInt16LE(attributeValue,0);
    }
    if(attributeDataType == Iotgateway.AttributeDataTypes_t.DATATYPE_SINGLE_PREC){
        //myvalue = attributeValue.readFloatLE(0, 4);
        myvalue = new Buffer(4);
        myvalue.writeFloatLE(attributeValue,0);
    }
    return myvalue;
};
common.prototype.zgb_dealAttriValueToString = function(attributeDataType,attributeValue) {
    var myvalue = null;
    if(attributeDataType == Iotgateway.AttributeDataTypes_t.DATATYPE_BOOLEAN){
        myvalue = attributeValue.readUInt8(0, 1);
    }
    if(attributeDataType == Iotgateway.AttributeDataTypes_t.DATATYPE_INT8){
        myvalue = attributeValue.readInt8(0, 1);
    }
    if(attributeDataType == Iotgateway.AttributeDataTypes_t.DATATYPE_UINT8){
        myvalue = attributeValue.readUInt8(0, 1);
    }
    if(attributeDataType == Iotgateway.AttributeDataTypes_t.DATATYPE_UINT16){
        myvalue = attributeValue.readUInt16LE(0, 2);
    }
    if(attributeDataType == Iotgateway.AttributeDataTypes_t.DATATYPE_INT16){
        myvalue = attributeValue.readInt16LE(0, 2);
    }
    if(attributeDataType == Iotgateway.AttributeDataTypes_t.DATATYPE_SINGLE_PREC){
        myvalue = attributeValue.readFloatLE(0, 4);
    }
    return myvalue+"";
};
//字节转数字
common.prototype.dealBufferValue = function(attributeDataType,attributeValue) {
    var myvalue = null;
    if(attributeDataType == Iotgateway.AttributeDataTypes_t.DATATYPE_BOOLEAN){
        myvalue = attributeValue.readUInt8(0, 1);
    }
    if(attributeDataType == Iotgateway.AttributeDataTypes_t.DATATYPE_UINT8){
        myvalue = attributeValue.readUInt8(0, 1);
    }
    if(attributeDataType == Iotgateway.AttributeDataTypes_t.DATATYPE_UINT16){
        myvalue = attributeValue.readUInt16BE(0, 2);
    }

    if(attributeDataType == Iotgateway.AttributeDataTypes_t.DATATYPE_SINGLE_PREC){
        myvalue = attributeValue.readFloatBE(0, 4);
    }
    return myvalue;
};

common.prototype.getModbusAttriValueLength = function(attributeDataType)
{
    var myvalue = null;
    if(attributeDataType == Iotgateway.AttributeDataTypes_t.DATATYPE_BOOLEAN){
        myvalue = 1;
        //myvalue = attributeValue.readUInt8(0, 1);
    }
    if(attributeDataType == Iotgateway.AttributeDataTypes_t.DATATYPE_INT16){
        myvalue = 1;
        //myvalue = attributeValue.readInt16(0, 2);
    }
    if(attributeDataType == Iotgateway.AttributeDataTypes_t.DATATYPE_UINT16){
        myvalue = 1;
        //myvalue = attributeValue.readUInt16(0, 2);
    }
    if(attributeDataType == Iotgateway.AttributeDataTypes_t.DATATYPE_INT32){
        myvalue = 2;
        //myvalue = attributeValue.readInt32(0, 4);
    }
    if(attributeDataType == Iotgateway.AttributeDataTypes_t.DATATYPE_UINT32){
        myvalue = 2;
        //myvalue = attributeValue.readUInt32(0, 4);
    }
    if(attributeDataType == Iotgateway.AttributeDataTypes_t.DATATYPE_SINGLE_PREC){
        myvalue = 2;
        //myvalue = attributeValue.readFloatLE(0, 4);
    }
    return myvalue;
};
//浮点保留两位小数
common.prototype.changeTwoDecimal_f= function (floatvar)
{
    var f_x = parseFloat(floatvar);
    if (isNaN(f_x)){
        return '0.00';
    }
    var f_x = Math.round(f_x*100)/100;
    var s_x = f_x.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0){
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2){
        s_x += '0';
    }
    return s_x;
}
//去除空格的方法
common.prototype.Trim = function(str,is_global)
{
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g,"");
    if(is_global.toLowerCase()=="g")
    {
        result = result.replace(/\s/g,"");
    }
    return result;
}

//数组排序方法函数,从小到大排序
common.prototype.compactLB = function(v1,v2)
{
    if(v1 < v2){
        return -1;
    }else if(v1 > v2){
        return 1;
    }else{
        return 0;
    }
}

//数组排序方法函数,从小到大排序
common.prototype.compactBL = function(v1,v2)
{
    if(v1 > v2){
        return -1;
    }else if(v1 < v2){
        return 1;
    }else{
        return 0;
    }
}

module.exports = common;
