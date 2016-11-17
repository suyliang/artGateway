/**
 * Created by Administrator on 2016/3/15.
 */

var Nwkmgr = require("../proto/nwkmgr.js");
var ZgbCommon = require("./zgbCommon");
var zgbCommon = new ZgbCommon();

var Common = require("../common");
var common = new Common();
var Iotgateway = require('../proto/iotgateway.js')
var enum_deviceType = require('../config/enum_deviceids.js')

function NwkmgrAction()
{
    this.zgbDeviceList = null;
    this.zgbDeviceListInfo = null;
}

//复位（mode == 0 表示重启 reboot 可以解决端口忙的问题，mode == 1 表示 恢复出厂设置）
NwkmgrAction.prototype.nwkZigbeeSystemResetReq = function(mode)
{
    var systemResetReq = new Nwkmgr.NwkZigbeeSystemResetReq;
    systemResetReq.mode = mode
    var buffer = systemResetReq.encode().toBuffer();
    var sendData = zgbCommon.getNwkmgrDate(buffer,Nwkmgr.nwkMgrCmdId_t.NWK_ZIGBEE_SYSTEM_RESET_REQ);
    return sendData;
}

//复位响应
NwkmgrAction.prototype.nwkZigbeeSystemResetCnf = function(data)
{
    var systemResetCnf = new Nwkmgr.NwkZigbeeSystemResetCnf;
    if(systemResetCnf.status == Nwkmgr.nwkStatus_t.STATUS_SUCCESS){

    }
    console.info("执行复位响应----------------------------status:"+systemResetCnf.status + "----mode:" + systemResetCnf.resetMode);
}


//请求设备列表
NwkmgrAction.prototype.msg_local_deviceList_request = function()
{
    var deviceListReq = new Nwkmgr.NwkGetLocalDeviceInfoReq;
    var buffer = deviceListReq.encode().toBuffer();
    var sendData = zgbCommon.getNwkmgrDate(buffer,Nwkmgr.nwkMgrCmdId_t.NWK_GET_LOCAL_DEVICE_INFO_REQ);
    return sendData;
}

//请求设备列表
NwkmgrAction.prototype.msg_deviceList_request = function()
{
    var deviceListReq = new Nwkmgr.NwkGetDeviceListReq;
    var buffer = deviceListReq.encode().toBuffer();
    var sendData = zgbCommon.getNwkmgrDate(buffer,Nwkmgr.nwkMgrCmdId_t.NWK_GET_DEVICE_LIST_REQ);
    return sendData;
}
//处理本地设备列表，返回一个数组
NwkmgrAction.prototype.deal_local_deviceList_ind = function(data)
{
    if(data[1] == Nwkmgr.nwkMgrCmdId_t.NWK_GET_LOCAL_DEVICE_INFO_CNF)
    {
        var localDeviceLsit = new Nwkmgr.NwkGetLocalDeviceInfoCnf.decode(data);
        //this.zgbDeviceListInfo = readDeviceLsit;
        var deviceInfo = localDeviceLsit.deviceInfoList;

        var addr = deviceInfo.ieeeAddress.toString();
        var did = deviceInfo.deviceId;
        console.log("local_deviceAddr:" + addr + "=====did=====" + did + "=====deviceStatus:" + deviceInfo.deviceStatus);
        return deviceInfo;
    }
    return null;
};
//处理设备列表，返回一个数组
NwkmgrAction.prototype.deal_deviceList_ind = function(data)
{
    if(data[1] == Nwkmgr.nwkMgrCmdId_t.NWK_GET_DEVICE_LIST_CNF)
    {
        var readDeviceLsit = new Nwkmgr.NwkGetDeviceListCnf.decode(data);
        this.zgbDeviceListInfo = readDeviceLsit;
        if(readDeviceLsit.status == Nwkmgr.nwkStatus_t.STATUS_SUCCESS)
        {
            var deviceInfoList = readDeviceLsit.deviceList;
            this.zgbDeviceList = deviceInfoList;
            for(var i = 0;i < deviceInfoList.length;i++)
            {
                var addr = deviceInfoList[i].ieeeAddress.toString();
                var did = zgbCommon.getDeviceId(deviceInfoList[i]);
                console.log("deviceAddr:" + addr + "=====did=====" + did + "=====deviceStatus:" + deviceInfoList[i].deviceStatus);
            }
            return readDeviceLsit;
        }
        return null;
    }
    return null;
};

//请求搜索设备并加入设备
NwkmgrAction.prototype.scanZGBDeviceJoin = function()
{
    var nwkSetPermitJoinReq = new Nwkmgr.NwkSetPermitJoinReq;
    nwkSetPermitJoinReq.permitJoinTime = 60;
    nwkSetPermitJoinReq.permitJoin = Nwkmgr.nwkPermitJoinType_t.PERMIT_NETWORK;
    var buffer = nwkSetPermitJoinReq.encode().toBuffer();
    var sendData = zgbCommon.getNwkmgrDate(buffer,Nwkmgr.nwkMgrCmdId_t.NWK_SET_PERMIT_JOIN_REQ);
    return sendData;
}
//从网关列表里删除设备（删除设备）
NwkmgrAction.prototype.removeZgbDevice = function(address)
{
    var nwkRemoveDeviceReq = new Nwkmgr.NwkRemoveDeviceReq();
    nwkRemoveDeviceReq.leaveMode = Nwkmgr.nwkLeaveMode_t.LEAVE_REJOIN;
    //nwkRemoveDeviceReq.leaveMode = Nwkmgr.nwkLeaveMode_t.LEAVE;
    nwkRemoveDeviceReq.dstAddr = zgbCommon.getNwkmgrAddress(address,8);

    var buffer = nwkRemoveDeviceReq.encode().toBuffer();
    var sendData = zgbCommon.getNwkmgrDate(buffer,Nwkmgr.nwkMgrCmdId_t.NWK_REMOVE_DEVICE_REQ);
    return sendData;
}
/*收到加入设备通知*/
NwkmgrAction.prototype.zgbDevice_join_ind = function(data)
{
    var nwkZigbeeDeviceInd = new Nwkmgr.NwkZigbeeDeviceInd.decode(data);
    if(this.zgbDeviceList == null)return;

    var addr = nwkZigbeeDeviceInd.deviceInfo.ieeeAddress.toString();
    console.info("zgbDevice_join_ind:" + addr)
    if(nwkZigbeeDeviceInd.deviceInfo.deviceStatus == Nwkmgr.nwkDeviceStatus_t.DEVICE_ON_LINE)
    {
        updaDeviceList(addr, nwkZigbeeDeviceInd.deviceInfo);
    }
    else
    {
        updaDeviceList(addr);
    }
    var did = zgbCommon.getDeviceId(nwkZigbeeDeviceInd.deviceInfo);
    console.log("deviceList is changed：：：======addr:" + addr + "=====did:"+ did + "======deviceStatus:" + nwkZigbeeDeviceInd.deviceInfo.deviceStatus);
    return nwkZigbeeDeviceInd;
}

function updaDeviceList(key,dinfo)
{
    var index = getDeviceIndex(key);
    if(index == -1)return;
    if(dinfo != undefined)
    {
        if(index != -1)
        {
            this.zgbDeviceList[index] = dinfo;
        }
        else
        {
            this.zgbDeviceList.push(dinfo);
        }
    }
    else
    {
        if(index != -1)
        {
            this.zgbDeviceList.splice(index, 1);
        }
    }
}

function getDeviceIndex(address)
{
    if(this.zgbDeviceList == null){
        return -1;
    }
    for(var i = 0;i < this.zgbDeviceList.length;i++)
    {
        if(address.toString() == this.zgbDeviceList[i].ieeeAddress.toString())
        {
            return  i;
        }
    }
    return -1;
}

//对比配置文件和设备数据库数据，看那些还没用上的 发送给客户端
NwkmgrAction.prototype.upDataNewDevices = function(zgbDeviceList){
    var newDevices = []
    var devices = new Array();
    var data = global.configXmlData;
    if(data){
        if(data["_0"]){
            devices = data["_0"].devices;
        }
    }
    if(zgbDeviceList)
    {
        for(var i = 0;i < zgbDeviceList.length;i++)
        {
            var isUse = 0;
            for (var dev in devices) {
                if (devices[dev].deviceAddr == "") {
                    continue;
                }
                var zgbDevice_address = common.getDeviceAddr(devices[dev].deviceAddr);
                if (zgbDevice_address == zgbDeviceList[i].ieeeAddress)
                {
                    isUse = 1;
                    break;
                }
            }
            //if(isUse == 0){
                var ndeviceInfo = new Iotgateway.ScanDeviceInfo_t();
                ndeviceInfo.ieeeAddress = zgbCommon.address_longToString(zgbDeviceList[i].ieeeAddress);
                ndeviceInfo.ieeeAddress_long = zgbDeviceList[i].ieeeAddress;
                ndeviceInfo.manufacturerId = zgbDeviceList[i].manufacturerId;
                //ndeviceInfo.deviceId = zgbDeviceList[i].simpleDescList[0].deviceId;
                ndeviceInfo.deviceId = zgbCommon.getDeviceId(zgbDeviceList[i]);
                ndeviceInfo.deviceVer = zgbDeviceList[i].simpleDescList[0].deviceVer;

                var clusterIds = null;
                if(ndeviceInfo.deviceId == global.DEVICE_TYPE12){
                    //I/O扩展模块
                    clusterIds = zgbCommon.getDeviceClusterIds(zgbDeviceList[i]);
                }
                ndeviceInfo.deviceDes = enum_deviceType.getNameByDriverId(ndeviceInfo.deviceId,clusterIds);
                ndeviceInfo.deviceStatus = Iotgateway.DeviceStatus_t.DEVICE_ON_LINE;
                ndeviceInfo.isUse = isUse;

                //var desc = enum_deviceType.getNameByDriverId(ndeviceInfo.deviceId);
                newDevices.push(ndeviceInfo);
                console.info(ndeviceInfo.deviceDes)
            //}
        }
    }
    return newDevices;
    //this.iotDevice.gwScanDeviceRsp(newDevices);
}



module.exports = NwkmgrAction;