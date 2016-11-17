/**
 * Created by Administrator on 2016/3/15.
 */

var Gateway = require("../proto/gateway.js");

var Common = require("../common");
var common = new Common();

var ZgbCommon = require("./zgbCommon");
var zgbCommon = new ZgbCommon();
var logger = require('../uint/myLog4js').myLog4js;


function GatewayAction(){

}
//读属性
GatewayAction.prototype.msg_attribute_request = function(address,clusterid,attris,endPointid)
{
    var readAttribute = new Gateway.GwReadDeviceAttributeReq;
    readAttribute.dstAddress = zgbCommon.getGWAddress(address,endPointid);
    readAttribute.clusterId = clusterid;
    readAttribute.attributeList = attris;
    var buffer = readAttribute.encode().toBuffer();
    var sendData = zgbCommon.getGatewayDate(buffer,Gateway.gwCmdId_t.GW_READ_DEVICE_ATTRIBUTE_REQ);
    return sendData;
}

//写属性   参数中应该有个命令id，根据命令id去找对应要修改的属性
GatewayAction.prototype.zgbWriteAttris = function(address,clusterid,attris,endPointid)
{
    var writeAttribute = new Gateway.GwWriteDeviceAttributeReq;
    writeAttribute.dstAddress = zgbCommon.getGWAddress(address,endPointid);
    writeAttribute.clusterId = clusterid;
    writeAttribute.attributeRecordList = attris;//gwAttributeRecord_t
    var buffer = writeAttribute.encode().toBuffer();
    var sendData = zgbCommon.getGatewayDate(buffer,Gateway.gwCmdId_t.GW_WRITE_DEVICE_ATTRIBUTE_REQ);
    return sendData;
}

/*往设备里写报告*/
GatewayAction.prototype.driver_write_attriReport = function(writeClusterId,writeGwaddr,attriids,attriValues,attriTypes)
{
    var package = new Gateway.GwSetAttributeReportingReq;
    package.clusterId = writeClusterId;
    package.dstAddress = zgbCommon.getGWAddress(writeGwaddr);

    var attrisArray = new Array();
    for(var i = 0;i < attriids.length;i++)
    {
        var gwAttributeReport_t = new Gateway.gwAttributeReport_t;
        gwAttributeReport_t.attributeId = attriids[i];
        gwAttributeReport_t.attributeType = attriTypes[i];
        var minValue =  common.parseInt(attriValues[i]);
        gwAttributeReport_t.minReportInterval = minValue;
        gwAttributeReport_t.maxReportInterval = 5;
        gwAttributeReport_t.reportableChange = 1;
        attrisArray.push(gwAttributeReport_t);
    }
    package.attributeReportList = attrisArray;
    var buffer = package.encode().toBuffer();
    var sendData = zgbCommon.getGatewayDate(buffer,Gateway.gwCmdId_t.GW_SET_ATTRIBUTE_REPORTING_REQ);
    return sendData;
}



GatewayAction.prototype.onoffControl = function(address,clusterid,endPointid,state)
{
    var devSetOnOffStateReq = new Gateway.DevSetOnOffStateReq;

    devSetOnOffStateReq.dstAddress = zgbCommon.getGWAddress(address,endPointid);
    devSetOnOffStateReq.state = state;
    var buffer = devSetOnOffStateReq.encode().toBuffer();
    var sendData = zgbCommon.getGatewayDate(buffer,Gateway.gwCmdId_t.DEV_SET_ONOFF_STATE_REQ);
    return sendData
}

GatewayAction.prototype.colorControl = function(address,clusterid,endPointid,color)
{
    var devSetColorReq = new Gateway.DevSetColorReq;
    devSetColorReq.dstAddress = zgbCommon.getGWAddress(address,endPointid);
    //readAttribute.cmdId = Gateway.gwCmdId_t.GW_READ_DEVICE_ATTRIBUTE_REQ;
    devSetColorReq.hueValue = color;
    devSetColorReq.saturationValue = 200;
    var buffer = devSetColorReq.encode().toBuffer();
    var sendData = zgbCommon.getGatewayDate(buffer,Gateway.gwCmdId_t.DEV_SET_COLOR_REQ);
    return sendData
}

GatewayAction.prototype.levelControl = function(address,clusterid,endPointid,levelValue)
{
    var devSetLevelReq = new Gateway.DevSetLevelReq;
    devSetLevelReq.dstAddress = zgbCommon.getGWAddress(address,endPointid);
    devSetLevelReq.transitionTime = 10;
    devSetLevelReq.levelValue = levelValue;
    var buffer = devSetLevelReq.encode().toBuffer();
    var sendData = zgbCommon.getGatewayDate(buffer,Gateway.gwCmdId_t.DEV_SET_LEVEL_REQ);
    return sendData
}

GatewayAction.prototype.get_onoff_status = function(address,endPointid)
{
    var devGetOnOffStateReq = new Gateway.DevGetOnOffStateReq;
    devGetOnOffStateReq.dstAddress = zgbCommon.getGWAddress(address,endPointid);
    var buffer = devGetOnOffStateReq.encode().toBuffer();
    var sendData = zgbCommon.getGatewayDate(buffer,Gateway.gwCmdId_t.DEV_GET_ONOFF_STATE_REQ);
    return sendData
}

GatewayAction.prototype.get_onoff_status_ind = function(data)
{
    //if(global.local_deviceInfo == null)
    var devGetOnOffStateInd = new Gateway.DevGetOnOffStateRspInd.decode(data);
    if(devGetOnOffStateInd.cmdId == Gateway.gwCmdId_t.DEV_GET_ONOFF_STATE_RSP_IND)
    {
        return devGetOnOffStateInd;
    }else{
        return null;
    }
}

GatewayAction.prototype.dealGatewayReadAttris = function(data)
{
    if(data[1] == Gateway.gwCmdId_t.GW_READ_DEVICE_ATTRIBUTE_RSP_IND)
    {
        var attributeRspInd = new Gateway.GwReadDeviceAttributeRspInd.decode(data);
        //var time = Date.now();

        var key = null;
        var _readAttrisObj = {};
        if(attributeRspInd.status == Gateway.gwStatus_t.STATUS_SUCCESS)
        {
            var srcAddress = attributeRspInd.srcAddress;
            key = srcAddress.ieeeAddr.toString();
            var alertStr = "";

            _readAttrisObj.driverId = 0;
            _readAttrisObj.deviceAddress = key;
            _readAttrisObj.clusterId = attributeRspInd.clusterId;
            _readAttrisObj.endpointId = srcAddress.endpointId;
            _readAttrisObj.deviceAttris = [];

            for( var j = 0;j < attributeRspInd.attributeRecordList.length;j++)
            {
                var attrisObj = new common.deviceAttrisObject();
                var attriId = attributeRspInd.attributeRecordList[j].attributeId;
                attrisObj.attributeId = attriId;

                var bufferArr = attributeRspInd.attributeRecordList[j].attributeValue.buffer;

                var beginIndex = attributeRspInd.attributeRecordList[j].attributeValue.offset;
                var endIndex = attributeRspInd.attributeRecordList[j].attributeValue.limit;

                var readLen = endIndex - beginIndex;
                var myBytes = new Buffer(readLen);
                bufferArr.copy(myBytes, 0, beginIndex, endIndex);

                attrisObj.attributeValue = common.zgb_dealAttriValueToString(attributeRspInd.attributeRecordList[j].attributeType,myBytes);
                _readAttrisObj.deviceAttris.push(attrisObj);

                var myvalue = attrisObj.attributeValue;
                if (attributeRspInd.clusterId == 6) {
                    //myvalue = myBytes.readUInt8(0, 1)
                    alertStr = '开关状态：' + myvalue;
                }
                if (attributeRspInd.clusterId == 8) {
                    //myvalue = myBytes.readUInt8(0, 1)
                    alertStr = '灯的亮度：' + myvalue;
                }
                if (attributeRspInd.clusterId == 768) {
                    //myvalue = myBytes.readUInt8(0, 1)
                    if (attriId == 0) {
                        alertStr += '灯的颜色：' + myvalue + "\n";
                    }
                    else if (attriId == 1) {
                        alertStr += '灯的饱和度：' + myvalue + "\n";
                    }
                }
                if (attributeRspInd.clusterId == 1024)
                {
                    //亮度
                    //myvalue = myBytes.readFloatLE(0, 4);
                    alertStr  = '环境亮度：' + parseInt(myvalue*100)/100;
                }
                if (attributeRspInd.clusterId == 1026)
                {
                    //温度
                    //myvalue = myBytes.readFloatLE(0, 4);
                    alertStr = '环境温度：' + parseInt(myvalue*100)/100;
                }
                if (attributeRspInd.clusterId == 1029)
                {
                    //湿度
                    //myvalue = myBytes.readFloatLE(0, 4);
                    alertStr = '环境湿度：' + parseInt(myvalue*100)/100;
                }
                if(attributeRspInd.clusterId == 1027)
                {
                    //压力传感器
                    //myvalue = myBytes.readFloatLE(0,4);
                    if(attriId == 0){
                        alertStr = "压力值：" + parseInt(myvalue*100)/100 +"\n";
                    }
                }
                if(attributeRspInd.clusterId == 2820)
                {
                    //电表
                    //0x0300,0x0505,0x0905,0x0A05,0x0508,0x0908,0x0A08
                    //myvalue = myBytes.readUInt16LE(0,2)/10;
                    if(alertStr == "") {
                        alertStr += '电表数据：\n';
                    }
                    if(attriId == 0x0300){
                        alertStr += "当前频率：" + myvalue +"\n";
                    }
                    if(attriId == 0x0505){
                        alertStr += "当前A电压：" + myvalue +"\n";
                    }
                    if(attriId == 0x0905){
                        alertStr += "当前B电压：" + myvalue +"\n";
                    }
                    if(attriId == 0x0A05){
                        alertStr += "当前C电压：" + myvalue +"\n";
                    }
                    if(attriId == 0x0508){
                        alertStr += "当前A电流：" + myvalue +"\n";
                    }
                    if(attriId == 0x0908){
                        alertStr += "当前B电流：" + myvalue +"\n";
                    }
                    if(attriId == 0x0A08){
                        alertStr += "当前C电流：" + myvalue +"\n";
                    }
                }
                if (attributeRspInd.clusterId == 12)
                {
                    //ai输入量
                    if(attriId == 0x0055){
                        //myvalue = myBytes.readFloatLE(0, 4);
                        alertStr  = 'ai模拟输入量：' + parseInt(myvalue*100)/100;
                    }
                }
                if (attributeRspInd.clusterId == 13)
                {
                    //ai输入量
                    if(attriId == 0x0055){
                        //myvalue = myBytes.readFloatLE(0, 4);
                        alertStr  = 'ao模拟输出量：' + parseInt(myvalue*100)/100;
                    }
                }
                if (attributeRspInd.clusterId == 15)
                {
                    //di输入量
                    if(attriId == 0x0055){
                        //myvalue = myBytes.readUInt8(0, 1);
                        alertStr  = 'di数字输入量：' + myvalue;
                    }
                }
                if (attributeRspInd.clusterId == 16)
                {
                    //di输入量
                    if(attriId == 0x0055){
                        //myvalue = myBytes.readUInt8(0, 1);
                        alertStr  = 'do数字输出量：' + myvalue;
                    }
                }
            }
            //console.info("读取属性值返回：" + alertStr);
            _readAttrisObj.alertStr = alertStr;
            return _readAttrisObj;
        }
        else
        {
            //记录状态，采集失败
            //logger.writeErr("读属性超时-----time:" + time + "---status:" + attributeRspInd.status )
            //console.error("收到一次-----time:" + time + "------status:" + attributeRspInd.status + "======clusterId:" + attributeRspInd.clusterId+"=====address:" + key + "====cur_index:")
            return null;
        }
        //return null;
    }
    return null;
};

var busyTimeTest = -1;
GatewayAction.prototype.dealGatewayReportAttris = function(data){

    var reportObj = {};
    if(data[1] == Gateway.gwCmdId_t.GW_ATTRIBUTE_REPORTING_IND)
    {
        var reportDeviceAttris = new Gateway.GwAttributeReportingInd.decode(data);
        if(reportDeviceAttris.status == Gateway.gwStatus_t.STATUS_SUCCESS)
        {
            var srcAddress = reportDeviceAttris.srcAddress;
            var key = srcAddress.ieeeAddr.toString();

            var alertStr = "";

            reportObj.driverId = 0;
            reportObj.deviceAddress = key;
            reportObj.clusterId = reportDeviceAttris.clusterId;
            reportObj.endpointId = srcAddress.endpointId;
            reportObj.deviceAttris = [];

            for( var j = 0;j < reportDeviceAttris.attributeRecordList.length;j++)
            {
                var attrisObj = new common.deviceAttrisObject();
                var attriId = reportDeviceAttris.attributeRecordList[j].attributeId;
                var bufferArr = reportDeviceAttris.attributeRecordList[j].attributeValue.buffer;

                var beginIndex = reportDeviceAttris.attributeRecordList[j].attributeValue.offset;
                var endIndex = reportDeviceAttris.attributeRecordList[j].attributeValue.limit;
                var readLen = endIndex - beginIndex;
                var myBytes = new Buffer(readLen);
                bufferArr.copy(myBytes,0,beginIndex,endIndex);

                attrisObj.attributeId = attriId;
                attrisObj.attributeValue = common.zgb_dealAttriValueToString(reportDeviceAttris.attributeRecordList[j].attributeType,myBytes);
                reportObj.deviceAttris.push(attrisObj);

                var myvalue = attrisObj.attributeValue;
                if (reportDeviceAttris.clusterId == 6) {
                    //myvalue = myBytes.readUInt8(0, 1)
                    alertStr = '开关状态：' + myvalue;
                }
                if (reportDeviceAttris.clusterId == 8) {
                    //myvalue = myBytes.readUInt8(0, 1)
                    alertStr = '灯的亮度：' + myvalue;
                }
                if (reportDeviceAttris.clusterId == 768) {
                    //myvalue = myBytes.readUInt8(0, 1)
                    if (attriId == 0) {
                        alertStr += '灯的颜色：' + myvalue + "\n";
                    }
                    else if (attriId == 1) {
                        alertStr += '灯的饱和度：' + myvalue + "\n";
                    }
                }
                if (reportDeviceAttris.clusterId == 1024)
                {
                    //亮度
                    //myvalue = myBytes.readFloatLE(0, 4);
                    alertStr  = '环境亮度：' + parseInt(myvalue*100)/100;
                }
                if (reportDeviceAttris.clusterId == 1026)
                {
                    //温度
                    //myvalue = myBytes.readFloatLE(0, 4);
                    alertStr = '环境温度：' + parseInt(myvalue*100)/100;
                }
                if (reportDeviceAttris.clusterId == 1029)
                {
                    //湿度
                    //myvalue = myBytes.readFloatLE(0, 4);
                    alertStr = '环境湿度：' + parseInt(myvalue*100)/100;
                }
                if(reportDeviceAttris.clusterId == 1027)
                {
                    //压力传感器
                    //myvalue = myBytes.readFloatLE(0,4);
                    if(attriId == 0){
                        alertStr = "压力值：" + parseInt(myvalue*100)/100 +"\n";
                    }
                }
                if(reportDeviceAttris.clusterId == 2820)
                {
                    //电表
                    //0x0300,0x0505,0x0905,0x0A05,0x0508,0x0908,0x0A08
                    //myvalue = myBytes.readUInt16LE(0,2)/10;
                    if(alertStr == "") {
                        alertStr += '电表数据：\n';
                    }
                    if(attriId == 0x0300){
                        alertStr += "当前频率：" + myvalue +"\n";
                    }
                    if(attriId == 0x0505){
                        alertStr += "当前A电压：" + myvalue +"\n";
                    }
                    if(attriId == 0x0905){
                        alertStr += "当前B电压：" + myvalue +"\n";
                    }
                    if(attriId == 0x0A05){
                        alertStr += "当前C电压：" + myvalue +"\n";
                    }
                    if(attriId == 0x0508){
                        alertStr += "当前A电流：" + myvalue +"\n";
                    }
                    if(attriId == 0x0908){
                        alertStr += "当前B电流：" + myvalue +"\n";
                    }
                    if(attriId == 0x0A08){
                        alertStr += "当前C电流：" + myvalue +"\n";
                    }
                }
                if (reportDeviceAttris.clusterId == 12)
                {
                    //ai输入量
                    if(attriId == 0x0055){
                        //myvalue = myBytes.readFloatLE(0, 4);
                        alertStr  = 'ai模拟输入量：' + parseInt(myvalue*100)/100;
                    }
                }
                if (reportDeviceAttris.clusterId == 13)
                {
                    //ai输入量
                    if(attriId == 0x0055){
                        //myvalue = myBytes.readFloatLE(0, 4);
                        alertStr  = 'ao模拟输出量：' + parseInt(myvalue*100)/100;
                    }
                }
                if (reportDeviceAttris.clusterId == 15)
                {
                    //di输入量
                    if(attriId == 0x0055){
                        //myvalue = myBytes.readUInt8(0, 1);
                        alertStr  = 'di数字输入量：' + myvalue;
                    }
                }
                if (reportDeviceAttris.clusterId == 16)
                {
                    //di输入量
                    if(attriId == 0x0055){
                        //myvalue = myBytes.readUInt8(0, 1);
                        alertStr  = 'do数字输出量：' + myvalue;
                    }
                }
                reportObj.alertStr = alertStr;
            }
            /*if(reportObj.alertStr != ""){
                console.info("属性报告返回的值"+"(" + reportObj.clusterId +")：" + alertStr);
            }*/
            if(busyTimeTest == -1)
            {
                busyTimeTest = setTimeout(function () {
                    clearTimeout(busyTimeTest);
                    busyTimeTest = -1;
                    logger.writeInfo("属性报告返回的值"+"(" + reportObj.clusterId +")：" + alertStr);
                    //console.info("属性报告返回的值"+"(" + reportObj.clusterId +")：" + alertStr);
                },3600000)
            }

            return reportObj;
        }
        return null;
    }
    return null;
};



module.exports = GatewayAction;