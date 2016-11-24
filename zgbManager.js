/**
 * Created by Administrator on 2016/3/15.
 */
/**
 * 管理zgb 通讯的控制器
 */
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var logger = require('./uint/myLog4js').myLog4js;
var ZgbCommon = require("./zgb/zgbCommon");
var zgbCommon = new ZgbCommon();

var didoUserFs = require('./uint/didoUseFs');

var Common = require("./common");
var common = new Common();

var zgbManagerCmdId_t = zgbCommon.cmdId_t();

var ConfigManager = require('./configManager.js')
var Iotgateway = require('./proto/iotgateway.js')
var GatewayAction = require('./zgb/gatewayAction.js')
var NwkmgrAction = require('./zgb/nwkmgrAction.js')
var Gateway = require('./proto/gateway.js')
var Nwkmgr = require('./proto/nwkmgr.js')
//var enum_deviceType = require('./config/enum_deviceids.js')

var configManager = new ConfigManager();
var gatewayAction = new GatewayAction();
var nwkmgrAction = new NwkmgrAction();

var HeadBodyBuffers = require('./uint/head_body_buffers').HeadBodyBuffers;

var readTimeOutId = -1;
var readAttrisArray = [];
var readAttrisIndex = 0;

var writeZgbAttributeList = [];

var bobv_writeList = [];
var isScanIng = false;
var scanTimeOut = -1;

var readNwkmgrBusyInterval = -1;//间隔20秒读取Nwkmgr的定时器
var readNwkmgrBusyIndTimeOut = -1;//读取Nwkmgr超时2次以上后执行复位的定时器
var readNwkmgrBusyTimeOutCount = 0;//读取Nwkmgr端口超时的次数 超过多稍次就复位

var manager_self;

//创建实例，同时传进两个端口的socket链接
function ZgbManager(_nwkmgrClient,_gatewayClient,_iotDevice)
{
    this.gateway_client = _gatewayClient;
    this.nwkmgr_client = _nwkmgrClient;
    this.iotDevice = _iotDevice;
    this.zgbDeviceList = null;
    this.zgbDeviceListInfo = null;
    this.zgbAttrisDictionary = null;
    this.devicesDictionary = null;
    this.buff_hbd = new HeadBodyBuffers(4, packetLength);
    manager_self = this;
    this.buff_hbd.on('packet', function (packet)
    {
        if(packet[2] == 18){
            manager_self.nwkmgr_client.write(packet);
        }
        if(packet[2] == 19){
            manager_self.gateway_client.write(packet);
        }
    });
}

util.inherits(ZgbManager, EventEmitter);

function packetLength(data)
{
    return data.readUInt16LE(0);
}
//往两个端口里写入数据流
ZgbManager.prototype.writeBuff = function(buff)
{
    if(buff != null)
    {
        this.buff_hbd.addBuffer(buff);
    }
}

var checkDevicesIsOffLine = -1;
ZgbManager.prototype.setReadAttrisDictionary = function(_zgbAttrisDictionary,_devicesDictionary)
{
    this.zgbAttrisDictionary = _zgbAttrisDictionary;
    this.devicesDictionary = _devicesDictionary;

    checkDeviceStatus();

    this.setbobv_writeList();
}

ZgbManager.prototype.beginDidoUse = function()
{
    didoUserFs.fsOpenFile(this.iotDevice);

    //-----------------测试统计dido口的使用情况
    setInterval(function(){
         for(var key in manager_self.zgbAttrisDictionary)
         {
             var readAttris = manager_self.zgbAttrisDictionary[key];
             if(readAttris.deviceType == 6 && (readAttris.clusterId == 15 || readAttris.clusterId == 16)){
                 if(readAttris.attributeValue == 0){
                    readAttris.attributeValue = 1;
                 }else{
                    readAttris.attributeValue = 0;
                 }
                didoUserFs.writeValue(readAttris);
             }
         }
     },40000);
    //-------------------------------------------------------------------------------
}

//检测zgb设备的状态，每 checkTimes 秒检查一次，如果每个设备的上次更新时间和当前的时间差大于checkTimes，当作超时，而判断为在线的处理在 收到该设备的报告返回的时候会做出改变
var checkTimes = 5;
function checkDeviceStatus()
{
    clearInterval(checkDevicesIsOffLine);
    checkDevicesIsOffLine = setInterval(function()
    {
        var time = new Date().getTime();
        for(var key in manager_self.devicesDictionary)
        {
            var zgbUpdateDeviceStatusObj = manager_self.devicesDictionary[key];

            //这个方法只是检查有报告的设备
            if(common.checkIsReport(zgbUpdateDeviceStatusObj.deviceType) == false)
            {
                continue;
            };

            zgbUpdateDeviceStatusObj.deviceStatus = -1;//checkTimes 秒钟重置设备状态，则下次有更新，保证能发到服务器上去

            if (time - zgbUpdateDeviceStatusObj.upDataTime >= checkTimes * 60 * 1000)
            {
                var deviceStatus = Iotgateway.DeviceStatus_t.DEVICE_OFF_LINE;
                manager_self.upDateDeviceStatus2(
                    zgbUpdateDeviceStatusObj,
                    deviceStatus
                );
            }
            zgbUpdateDeviceStatusObj.upDataTime = time;
        }
    },checkTimes * 60 * 1000 + 5)
}


//请求事件============================================================================================================================================
//写入gateway 2541端口的指令
ZgbManager.prototype.zgbGatewayReq = function(cmdId,prams)
{
    if(this.gateway_client.getStatus() == 0){
        console.error("gateway_client has not connected");
        return false;
    }
    if(cmdId == zgbManagerCmdId_t.ZGB_WRITE_ATTRIS_COMMOND)
    {
        this.writeAttris(prams);
    }
    if(cmdId == zgbManagerCmdId_t.ZGB_READ_ATTRIS_COMMOND)
    {
        this.readAttrisMannger(prams);
    }
    if(cmdId == zgbManagerCmdId_t.ZGB_WRITE_REPORT_COMMOND)
    {
        //var buff = gatewayAction.driver_write_attriReport();
        //this.writeBuff(buff);
    }
    if(cmdId == zgbManagerCmdId_t.ZGB_GET_DEVICE_ONOFF_STATUS_COMMOND)
    {
        if(global.local_deviceInfo != null)
        {
            if(global.local_deviceInfo.ieeeAddress != prams.ieeeAddress)
            {
                return false;
            }
        }
        var buff = gatewayAction.get_onoff_status(prams.ieeeAddress,3);
        this.writeBuff(buff);
    }
    return true;
}
//写入Nwkmgr 2540端口的指令
ZgbManager.prototype.zgbNwkmgrReq = function(cmdId,prams)
{
    if(this.nwkmgr_client.getStatus() == 0){
        console.error("gateway_client has not connected");
        return false;
    }
    if(cmdId == zgbManagerCmdId_t.ZGB_GET_LOCAL_DEVICELIST_COMMOND)
    {
        var buff = nwkmgrAction.msg_local_deviceList_request();
        this.writeBuff(buff);
    }
    else if(cmdId == zgbManagerCmdId_t.ZGB_GET_DEVICELIST_COMMOND)
    {
        var buff = nwkmgrAction.msg_deviceList_request();
        this.writeBuff(buff);
    }
    else if(cmdId == zgbManagerCmdId_t.ZGB_SCAN_DEVICE_COMMOND)
    {
        this.scanDevicesJoin(prams);
    }
    else if(cmdId == zgbManagerCmdId_t.ZGB_DELETE_DEVICE_COMMOND)
    {
        this.removeDeviceCommond(prams);
    }
    else if(cmdId == zgbManagerCmdId_t.ZGB_SYSTEM_RESET_COMMOND)
    {
        var buff = nwkmgrAction.nwkZigbeeSystemResetReq(prams);
        this.writeBuff(buff);
    }
    return true;
}

//处理返回 ==============================================================================================================================================
ZgbManager.prototype.dealGatewayCallBack = function(packet)
{
    if(packet[1] == Gateway.gwCmdId_t.GW_READ_DEVICE_ATTRIBUTE_RSP_IND)
    {
        var readAttrisValue = gatewayAction.dealGatewayReadAttris(packet);
        if(readAttrisValue != null)
        {
            this.readTimeOutFun(false,readAttrisValue.deviceAddress +"_" + readAttrisValue.clusterId);
        }
        return readAttrisValue;
    }
    if(packet[1] == Gateway.gwCmdId_t.GW_ATTRIBUTE_REPORTING_IND)
    {
        var reportAttrisValue = gatewayAction.dealGatewayReportAttris(packet);

        var deviceStatus = Iotgateway.DeviceStatus_t.DEVICE_ON_LINE;

        this.upDateDeviceStatus(
            reportAttrisValue.driverId,
            reportAttrisValue.deviceAddress,
            reportAttrisValue.clusterId,
            reportAttrisValue.deviceAttris[0].attributeId,
            reportAttrisValue.endpointId,
            deviceStatus
        );
        return reportAttrisValue;
    }
    if(packet[1] == Gateway.gwCmdId_t.DEV_GET_ONOFF_STATE_RSP_IND)
    {
        var devGetOnOffStateInd = gatewayAction.get_onoff_status_ind(packet);

        if(devGetOnOffStateInd != null)
        {
            //logger.writeWarn("devGetOnOffStateInd.status:" + devGetOnOffStateInd.status)

            checkIsLocalGetOnOffStatus(devGetOnOffStateInd);

            if(devGetOnOffStateInd.status == Gateway.gwStatus_t.STATUS_SUCCESS)
            {
                return devGetOnOffStateInd;
            }
        }
    }
    return null;
}

ZgbManager.prototype.dealNwkmgrCallBack = function(packet)
{
    if(this.nwkmgr_client.getStatus() == 0){
        return;
    }
    if(packet[1] == Nwkmgr.nwkMgrCmdId_t.NWK_GET_DEVICE_LIST_CNF)
    {
        this.zgbDeviceListInfo = nwkmgrAction.deal_deviceList_ind(packet);
        this.zgbDeviceList = this.zgbDeviceListInfo.deviceList;
        if(scanTimeOut == -2)
        {
            var newDevices = nwkmgrAction.upDataNewDevices(this.zgbDeviceList);
            this.iotDevice.gwScanDeviceRsp(newDevices);
        }
    }
    if(packet[1] == Nwkmgr.nwkMgrCmdId_t.NWK_ZIGBEE_DEVICE_IND)
    {
        var deviceInfo = nwkmgrAction.zgbDevice_join_ind(packet);
        this.gwDeleteDeviceRsp(deviceInfo);
    }
    if(packet[1] == Nwkmgr.nwkMgrCmdId_t.NWK_GET_LOCAL_DEVICE_INFO_CNF)
    {
        var local_deviceInfo = nwkmgrAction.deal_local_deviceList_ind(packet);
        global.local_deviceInfo = local_deviceInfo;
        checkNwkmgrIsBusy(local_deviceInfo);
    }
    if(packet[1] == Nwkmgr.nwkMgrCmdId_t.NWK_ZIGBEE_SYSTEM_RESET_CNF)
    {
        nwkmgrAction.nwkZigbeeSystemResetCnf(packet);
    }
}

//处理zgb的控制事件 比如开关 调节灯的亮度
ZgbManager.prototype.dealZgbAction = function(driverId,deviceId,objectId,attributeType,attributeValue)
{
    if(this.gateway_client.getStatus() == 0){
        return;
    }
    var time = new Date().getTime();
    try{
        var device = configManager.getConfigXmlDevice(driverId,deviceId);
        if(device == null)
        {
            return;
        }
        var zgbDeviceId = device.deviceType;
        var zgbDevice = configManager.getDeviceXml_device(173,zgbDeviceId);
        if(zgbDevice == null)
        {
            return;
        }
        var dobject = device.objects["_"+objectId];
        var attri = dobject.attributes["_"+attributeType];
        var attriDataType = common.parseInt(attri.attributeDataType);
        var endpointId = common.parseInt(dobject.endpointId);
        if(attri == null)
        {
            return;
        }
        if(attri.hardwareCmdId == ""){
            return;
        }
        var cmdobj = zgbDevice.cmds["_" + attri.hardwareCmdId];
    }catch(err){
        //写属性协议参数有误，或者config文件配置有错
        console.error("function dealZgbAction:err","可能处理xml出错了，没执行下去，超时了吗？")
        logger.writeErr("function dealZgbAction:err , deal xml err");
        return;
    }

    var attributeDataType = common.parseInt(attri.attributeDataType);

    if(attributeValue == "" || attributeValue == "null")return;

    var controlValue;

    var zgbDevice_address = common.getDeviceAddr(device.deviceAddr);
    var clusterid = common.parseInt(cmdobj.clusterId);

    var buff;

    if(cmdobj.zbSetCmdId == "" || cmdobj.zbSetCmdId == null)
    {
        controlValue = attributeValue;
        var attris = [];
        var gwAttributeRecord_t = new Gateway.gwAttributeRecord_t;

        gwAttributeRecord_t.attributeId = common.parseInt(cmdobj.attributeId);

        gwAttributeRecord_t.attributeType = attriDataType;

        var valueBuff = common.valueToBuffer(attriDataType,controlValue);

        gwAttributeRecord_t.attributeValue = valueBuff;

        attris.push(gwAttributeRecord_t);

        buff = gatewayAction.zgbWriteAttris(zgbDevice_address,clusterid,attris,endpointId);
    }else{
        controlValue = common.dealAttriValue(attributeDataType,attributeValue);
        if(controlValue == null)return;
        if(cmdobj.zbSetCmdId == Gateway.gwCmdId_t.DEV_SET_ONOFF_STATE_REQ)
        {

            buff = gatewayAction.onoffControl(zgbDevice_address,clusterid,endpointId,controlValue);
        }
        if(cmdobj.zbSetCmdId == Gateway.gwCmdId_t.DEV_SET_COLOR_REQ)
        {
            buff = gatewayAction.colorControl(zgbDevice_address,clusterid,endpointId,controlValue);
        }
        if(cmdobj.zbSetCmdId == Gateway.gwCmdId_t.DEV_SET_LEVEL_REQ)
        {
            buff = gatewayAction.levelControl(zgbDevice_address,clusterid,endpointId,controlValue);
        }
    }
    this.writeBuff(buff);
    return buff;
}

//执行扫描设备的逻辑处理
ZgbManager.prototype.scanDevicesJoin = function(gwScanDeviceReq)
{
    /*if(isScanIng == true){
        return;
     }*/
    clearTimeout(scanTimeOut);
    if(gwScanDeviceReq.scanType == 0)
     {
         scanTimeOut = - 2;
         manager_self.zgbNwkmgrReq(zgbManagerCmdId_t.ZGB_GET_DEVICELIST_COMMOND);
         return;
     }
    var buff = nwkmgrAction.scanZGBDeviceJoin();
    this.writeBuff(buff);

    //isScanIng = true;
    scanTimeOut = setTimeout(function()
    {
        clearTimeout(scanTimeOut);
        scanTimeOut = - 2;
        manager_self.zgbNwkmgrReq(zgbManagerCmdId_t.ZGB_GET_DEVICELIST_COMMOND);

    },63000)
}
//执行删除设备的功能逻辑
var removeDeviceDitionary = new Array();
ZgbManager.prototype.removeDeviceCommond = function(gwDeleteDeviceReq)
{
    var deviceAddress = "";
    var deviceId = -1;
    if(gwDeleteDeviceReq.deviceAddress)
    {
        deviceAddress = gwDeleteDeviceReq.deviceAddress;
    }
    else
    {
        if(gwDeleteDeviceReq.deviceId == null)
        {
            return;
        }
        deviceId = gwDeleteDeviceReq.driverId;
        deviceAddress = configManager.getIeeeAddrByDriverId_DeviceId(gwDeleteDeviceReq.driverId,gwDeleteDeviceReq.deviceId);
    }

    if(deviceAddress == null || deviceAddress == ""){
        return;
    }

    deviceAddress = common.getDeviceAddr(deviceAddress);

    removeDeviceDitionary["_"+deviceAddress] = deviceId;

    var buff = nwkmgrAction.removeZgbDevice(deviceAddress);

    this.writeBuff(buff);
}

//处理设备删除返回的结果，然后响应到云上
ZgbManager.prototype.gwDeleteDeviceRsp = function(nwkZigbeeDeviceInd)
{
    var addr = nwkZigbeeDeviceInd.deviceInfo.ieeeAddress.toString();

    var deviceStatus = nwkZigbeeDeviceInd.deviceInfo.deviceStatus;
    this.upDateDeviceStatus1(addr,deviceStatus);

}


//全开或者全关
ZgbManager.prototype.deviceAllOnOff = function(status)
{
    //加一个时间间隔，不能连续点击
    for (var i = 0; i < writeZgbAttributeList.length; i++)
    {
        if(writeZgbAttributeList[i].driverId == null)
        {
            writeZgbAttributeList.splice(i,1);
        }
    }
    for (var j = 0; j < bobv_writeList.length; j++)
    {
        writeZgbAttributeList.unshift([bobv_writeList[j], status]);
    }
}
//获取一键全开或全关的设备列表
ZgbManager.prototype.setbobv_writeList = function()
{
    bobv_writeList = [];
    for(var key in this.zgbAttrisDictionary)
    {
        var readAttris = this.zgbAttrisDictionary[key];
        if (readAttris.driverId == 0 && (readAttris.objectType == Iotgateway.ObjectType_t.OBJECT_BO || readAttris.objectType == Iotgateway.ObjectType_t.OBJECT_BV))
        {
            bobv_writeList.push(readAttris);
        }
    }
}

//检测是否忙碌
//间隔20秒检查一次：发送一次获取本地设备的开关状态（目前找不到更好的方法）
var getOnOffStatusInterval_Time = 20000;//20秒
//十秒为超时时间，读取本地某个设备的开关状态，10之内没返回就当作超时（如果10秒内返回了，就取消定时器，不叠加也不复位），叠加一次超时次数，超过1次就执行复位
var getOnOffStatusTimeOut_Time = 10000;//10秒
function checkNwkmgrIsBusy(local_deviceInfo)
{
    clearInterval(readNwkmgrBusyInterval);
    clearTimeout(readNwkmgrBusyIndTimeOut);

    readNwkmgrBusyInterval = setInterval(function()
    {
        if(manager_self.gateway_client.getStatus() == 1) {

            manager_self.zgbGatewayReq(zgbManagerCmdId_t.ZGB_GET_DEVICE_ONOFF_STATUS_COMMOND, local_deviceInfo);

            readNwkmgrBusyIndTimeOut = setTimeout(function () {
                readNwkmgrBusyTimeOutCount ++;

                if (readNwkmgrBusyTimeOutCount >= 2) {
                    //超过两次不能在2541读到数据，判定为超时
                    readNwkmgrBusyTimeOutCount = 0;
                    //执行复位
                    var boo = manager_self.zgbNwkmgrReq(zgbManagerCmdId_t.ZGB_SYSTEM_RESET_COMMOND,0);

                    if (boo == true) {
                        logger.writeErr("执行复位：" + readNwkmgrBusyTimeOutCount);
                    }
                }
            }, getOnOffStatusTimeOut_Time);//十秒为超时时间，读取本地某个设备的开关状态，10之内没返回就当作超时，叠加一次超时次数，超过1次就执行复位
        }
    },getOnOffStatusInterval_Time);
}

//能获取到读取开关状态的返回，不管是本地还是2541的，那就是和2540或者2541端口的连接还没断，所以：停止叠加readNwkmgrBusyTimeOutCount和定时器
function checkIsLocalGetOnOffStatus(devGetOnOffStateInd)
{

    readNwkmgrBusyTimeOutCount = 0;
    clearTimeout(readNwkmgrBusyIndTimeOut);
}

//接收客户端发下来的写属性命令，参数为数组，储存起来，一条一条的处理
ZgbManager.prototype.writeAttris = function(writeList)
{
    if(manager_self.gateway_client.getStatus() == 0)
    {
        writeZgbAttributeList = [];
        return;
    }

    writeZgbAttributeList = writeList;

    if(canReadIndex == -1 || canReadIndex == null)
    {
        this.writeAttriIntervalFun();
    }
}

//在写属性列表里，每500毫秒取出一条来执行
ZgbManager.prototype.writeAttriIntervalFun = function()
{
    if(manager_self.gateway_client.getStatus() == 0)return null;

    if (writeZgbAttributeList && writeZgbAttributeList.length > 0)
    {
        if(writeZgbAttributeList[0].driverId == null)
        {

            var buff = gatewayAction.onoffControl(
                writeZgbAttributeList[0][0].deviceAddress,
                writeZgbAttributeList[0][0].clusterId,
                writeZgbAttributeList[0][0].endpointId,
                writeZgbAttributeList[0][1]);
            this.writeBuff(buff)
        }else {

            var driverId = writeZgbAttributeList[0].driverId;
            var deviceId = writeZgbAttributeList[0].deviceId;
            var objectId = writeZgbAttributeList[0].objectId;
            var attributeType = writeZgbAttributeList[0].attributeType;
            var attributeValue = writeZgbAttributeList[0].attributeValue;

            manager_self.dealZgbAction(driverId, deviceId, objectId, attributeType, attributeValue);
        }
        writeZgbAttributeList.shift();
        return true;
    }
    else
    {
        return false;
    }
}

//请求读取设备属性----------------------
var reconnectCount = 0
ZgbManager.prototype.readAttrisMannger = function (arr)
{
    readAttrisArray = arr;

    clearTimeout(readTimeOutId);

    readAttrisIndex = 0;

    if(readAttrisArray.length > 0)
    {
        //logger.writeDebug("readAttrisMannger start ::::" + reconnectCount);
        reconnectCount ++;
        this.getReadAttrisBuff();
    }
}
//在读属性列表里，取出一条指令来执行
var canReadIndex = null;
ZgbManager.prototype.getReadAttrisBuff = function()
{
    clearTimeout(readTimeOutId);
    var nowtime = new Date().getTime();
    if(manager_self.gateway_client.getStatus() == 0)
    {
        setTimeout(manager_self.getReadAttrisBuff,200);
        return;
    }

    var boo = manager_self.writeAttriIntervalFun();

    if(boo == true)
    {
        setTimeout(manager_self.getReadAttrisBuff,200);
        return;
    }
    if(readAttrisIndex >= readAttrisArray.length)
    {
        readAttrisIndex = 0;
    }
    if(common.checkIsReadContinual(readAttrisArray[readAttrisIndex].deviceType) == false){
        //不需要轮循的设备，目的只是更新状态，3秒钟更新一次数据

        if(nowtime - readAttrisArray[readAttrisIndex].nowReadTime < 3 * 60 * 1000 ){

            setTimeout(manager_self.getReadAttrisBuff,200);
            return;
        }
    }
    if((readAttrisArray[readAttrisIndex].continueTimeOut % global.zgbTimeOutMax) == 0 && readAttrisArray[readAttrisIndex].continueTimeOut > 0 )
    {
        var deviceStatus = Iotgateway.DeviceStatus_t.DEVICE_OFF_LINE;

        manager_self.upDateDeviceStatus(

            readAttrisArray[readAttrisIndex].driverId,
            readAttrisArray[readAttrisIndex].deviceAddress,
            readAttrisArray[readAttrisIndex].clusterId,
            readAttrisArray[readAttrisIndex].endpointId,
            readAttrisArray[readAttrisIndex].deviceAttris[0].attributeId,
            deviceStatus
        );
        console.info("-----------zgb readAttris is timeout warn:::" + JSON.stringify(readAttrisArray[readAttrisIndex]));
    }

    var attris = []
    for(var j = 0;j < readAttrisArray[readAttrisIndex].deviceAttris.length;j++)
    {
        attris.push(readAttrisArray[readAttrisIndex].deviceAttris[j].attributeId);
    }

    var buff = gatewayAction.msg_attribute_request
    (
        readAttrisArray[readAttrisIndex].deviceAddress,
        readAttrisArray[readAttrisIndex].clusterId,
        attris,
        readAttrisArray[readAttrisIndex].endpointId
    );
    readAttrisArray[readAttrisIndex].nowReadTime = nowtime;
    //var time = Date.now();
    //console.info("msg_attribute_read_request:" + JSON.stringify(readAttrisArray[readAttrisIndex]) + "----time:" + time + "------readAttrisIndex:" + readAttrisIndex);
    //开始 計算超时
    //clearTimeout(readTimeOutId);
    readTimeOutId = setTimeout(function ()
    {
        manager_self.readTimeOutFun(true);

    }, 10000);
    manager_self.writeBuff(buff);
}
//读取属性指令的定时器
ZgbManager.prototype.readTimeOutFun = function(boo,_key)
{
    if(boo == false)
    {
        for (var i = 0; i < readAttrisArray.length; i++)
        {
            var key = readAttrisArray[i].deviceAddress + "_" + readAttrisArray[i].clusterId;
            if (key == _key)
            {
                //找到现在返回的属性 对应的是读取列表中的那一条
                var cur_index = readAttrisArray[i].index;
                readAttrisArray[cur_index].continueTimeOut = 0;
                readAttrisArray[cur_index].allSuccess += 1;
                //更新设备状态
                if(readAttrisArray[cur_index].deviceAttris.length > 0){

                    var deviceStatus = Iotgateway.DeviceStatus_t.DEVICE_ON_LINE;
                    this.upDateDeviceStatus
                    (
                        readAttrisArray[cur_index].driverId,
                        readAttrisArray[cur_index].deviceAddress,
                        readAttrisArray[cur_index].clusterId,
                        readAttrisArray[cur_index].endpointId,
                        readAttrisArray[cur_index].deviceAttris[0].attributeId,
                        deviceStatus
                    );
                }
                //-------------------------------------------------------------------------------------
                if (cur_index != readAttrisIndex)
                {
                    //在设定的超时之外返回了读取属性值，
                    //只更新属性值，不更新索引
                    if(readAttrisArray[cur_index].allTimeOut > 1)
                    {
                        readAttrisArray[cur_index].allTimeOut --;
                    }
                }
                else
                {
                    clearTimeout(readTimeOutId);
                    setTimeout(function()
                    {
                        readAttrisIndex++;
                        manager_self.getReadAttrisBuff();
                    },1000);
                }
                break;
            }
        }
    }
    else
    {
        if(readAttrisArray[readAttrisIndex] == undefined)
        {
            console.info("readAttrisArray[readAttrisIndex] == undefined-------------------readIndex:" + readAttrisIndex);
        }
        else
        {
            readAttrisArray[readAttrisIndex].continueTimeOut += 1;
            readAttrisArray[readAttrisIndex].allTimeOut += 1;
        }
        clearTimeout(readTimeOutId);
        readAttrisIndex ++;
        this.getReadAttrisBuff();
    }
}

ZgbManager.prototype.upDateDeviceStatus = function(driverId,deviceAddress,clusterId,attriId,endpointId,deviceStatus)
{
    var changeAttris = [];

    var deviceUpDateStatusObj = manager_self.devicesDictionary["_" + deviceAddress];
    if(deviceUpDateStatusObj == null)
    {
        return;
    }

    if(deviceUpDateStatusObj.deviceStatus != deviceStatus)
    {
        deviceUpDateStatusObj.deviceStatus = deviceStatus;
        //console.info(deviceUpDateStatusObj.deviceDes + "的状态发生了改变：" + deviceStatus);
        //logger.writeWarn(deviceUpDateStatusObj.deviceDes + "的状态发生了改变：" + deviceStatus);
        changeAttris.push(deviceUpDateStatusObj);
    }

    if(changeAttris.length > 0)
    {
        this.iotDevice.IotGwUpdataDeviceStatusInd(changeAttris);
    }
}


//对比本地缓存的状态，如果状态改变了，才响应到云上去
ZgbManager.prototype.upDateDeviceStatus1 = function(deviceAddress,deviceStatus) {
    var changeAttris = [];

    if (this.devicesDictionary["_" + deviceAddress] != null)
    {
        var readAttrisObj = this.devicesDictionary["_" + deviceAddress];
        readAttrisObj.deviceStatus = deviceStatus;
        //console.info(readAttrisObj.deviceDes + "的状态发生了改变：" + deviceStatus);
        //logger.writeWarn(readAttrisObj.deviceDes + "的状态发生了改变：" + deviceStatus);
        changeAttris.push(readAttrisObj);
        this.iotDevice.IotGwUpdataDeviceStatusInd(changeAttris);
    }
}


//对比本地缓存的状态，如果状态改变了，才响应到云上去
//参数value 里必须带有driverId,deviceAddress,clusterId,clusterId,attris,不然在字典里找不到对应的属性
ZgbManager.prototype.upDateDeviceStatus2 = function(readAttrisObj,deviceStatus)
{
    var changeAttris = [];

    if(readAttrisObj)
    {
        readAttrisObj.deviceStatus = deviceStatus;
        //console.info(readAttrisObj.deviceDes + "的状态发生了改变：" + deviceStatus);
        //logger.writeWarn(readAttrisObj.deviceDes + "的状态发生了改变：" + deviceStatus);
        changeAttris.push(readAttrisObj);
        this.iotDevice.IotGwUpdataDeviceStatusInd(changeAttris);

    }
}


//提供获取设备列表接口
ZgbManager.prototype.getZgbDeviceList = function()
{
    return this.zgbDeviceList;
}

var mastSendTime = 480000;

//处理读属性返回，判断是否改变了值，返回所需要的数据
ZgbManager.prototype.sendAttrisChangeToYun = function(value)
{
    //设备更新属性
    if(value.driverId != -1)
    {
        var sendArr = [];
        var nowtime = new Date().getTime();
        for(var i = 0;i < value.deviceAttris.length;i++) {

            var dicKey = zgbCommon.setZgbReadAttrisDictionary(value.driverId,value.deviceAddress,value.clusterId,value.deviceAttris[i].attributeId,value.endpointId);


            if(this.devicesDictionary["_" + value.deviceAddress] != null)
            {
                this.devicesDictionary["_" + value.deviceAddress].upDataTime = nowtime;
            }

            var valueArr = this.zgbAttrisDictionary[dicKey];
            if(valueArr == null){
                continue;
            };

            if(valueArr != null && value.deviceAttris[i].attributeValue != null){

                if(valueArr.attributeValue == null){

                }else{

                    var oldValue = valueArr.attributeValue;
                    var newValue = value.deviceAttris[i].attributeValue;
                    valueArr.attributeValue = newValue;
                    //收到dido的值，写进到缓存里去，（只是写入到缓存，然后5分钟写入一次到本地数据，一个小时发一次到云服务器）
                    /*if(valueArr.deviceType == global.DEVICE_TYPE12){
                        if(valueArr.clusterId == global.DEVICE_CID_DI || valueArr.clusterId == global.DEVICE_CID_DO){
                            //这个是dido的数据
                            didoUserFs.writeValue(valueArr);
                        }
                    }*/
                    //------------------------------------------------------------------------------------
                    if(nowtime - valueArr.upDataTime < mastSendTime){
                        //mastSendTime分钟强制更新一次
                        if( oldValue == newValue)continue;
                    }
                    //logger.writeInfo("-------" + value.alertStr);
                }
                valueArr.upDataTime = nowtime;
                sendArr.push(valueArr);
            }
        }
        return sendArr;
    }
    return null;
}


module.exports = ZgbManager;