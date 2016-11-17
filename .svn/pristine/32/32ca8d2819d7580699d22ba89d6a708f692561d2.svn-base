/**
 * Created by Administrator on 2016/3/15.
 */
//传入包体和命令id 组装包头 包体 组成完整的包 ---------
var Gateway = require("../proto/gateway.js");

var Nwkmgr = require("../proto/nwkmgr.js");
var IotGateway = require("../proto/iotgateway.js");
var Common = require("../common.js");
var common = new Common();
var gatewayKey = 1;//标记是否 是网关发出去的信息，服务器要求用，赋值给和云通讯的协议的第 5 个字节
var packetHeadLen = 4;//表示和云通讯的协议的包头长度，要修改长度只需 修改此值，和 在getIotGatewayDate（）方法里在对应的位置加载增加的字节,还有在gatewayindex 里的 yun_hbd = new HeadBodyBuffers(4, packetLength)，改成packetHeadLen;
//var deviceFs = require('../uint/zgbDevicesFs');

var ZGB_SCAN_DEVICE_COMMOND = 0;
var ZGB_GET_DEVICELIST_COMMOND = 1;
var ZGB_READ_ATTRIS_COMMOND = 2;
var ZGB_READ_ATTRIS_RESTART_COMMOND = 3;
var ZGB_WRITE_ATTRIS_COMMOND = 4;
var ZGB_DELETE_DEVICE_COMMOND = 5;
var ZGB_WRITE_REPORT_COMMOND = 6;
var ZGB_GET_LOCAL_DEVICELIST_COMMOND = 7;
var ZGB_GET_DEVICE_ONOFF_STATUS_COMMOND = 8;
var ZGB_SYSTEM_RESET_COMMOND = 9;
function ZgbCommon(){

}
ZgbCommon.prototype.cmdId_t = function(){
    var cmdObj = {};
    cmdObj.ZGB_READ_ATTRIS_COMMOND = ZGB_READ_ATTRIS_COMMOND;
    cmdObj.ZGB_READ_ATTRIS_RESTART_COMMOND = ZGB_READ_ATTRIS_RESTART_COMMOND;
    cmdObj.ZGB_SCAN_DEVICE_COMMOND = ZGB_SCAN_DEVICE_COMMOND;
    cmdObj.ZGB_GET_DEVICELIST_COMMOND = ZGB_GET_DEVICELIST_COMMOND;
    cmdObj.ZGB_WRITE_ATTRIS_COMMOND = ZGB_WRITE_ATTRIS_COMMOND;
    cmdObj.ZGB_DELETE_DEVICE_COMMOND = ZGB_DELETE_DEVICE_COMMOND;
    cmdObj.ZGB_WRITE_REPORT_COMMOND = ZGB_WRITE_REPORT_COMMOND;
    cmdObj.ZGB_GET_LOCAL_DEVICELIST_COMMOND = ZGB_GET_LOCAL_DEVICELIST_COMMOND;
    cmdObj.ZGB_GET_DEVICE_ONOFF_STATUS_COMMOND = ZGB_GET_DEVICE_ONOFF_STATUS_COMMOND;
    cmdObj.ZGB_SYSTEM_RESET_COMMOND = ZGB_SYSTEM_RESET_COMMOND;
    return cmdObj;
}

ZgbCommon.prototype.getPacketHead = function(packet){
    var head = packet.slice(0, packetHeadLen);
    return head;
}
ZgbCommon.prototype.getPacketBody = function(packet){
    var body = packet.slice(packetHeadLen);
    return body;
}

ZgbCommon.prototype.getNwkmgrDate = function(buffer,cmdId)
{
    var bufferHead =  new Buffer(4) ;
    bufferHead.writeUInt16LE(buffer.length, 0);
    bufferHead.writeUInt8(Nwkmgr.zStackNwkMgrSysId_t.RPC_SYS_PB_NWK_MGR, 2);
    bufferHead.writeUInt8(cmdId, 3);
    var newBuffer = Buffer.concat([bufferHead, buffer]);
    return  newBuffer;
}
ZgbCommon.prototype.getGatewayDate = function(buffer,cmdId)
{
    var bufferHead =  new Buffer(4) ;
    bufferHead.writeUInt16LE(buffer.length, 0);
    bufferHead.writeUInt8(Gateway.zStackGwSysId_t.RPC_SYS_PB_GW, 2);
    bufferHead.writeUInt8(cmdId, 3);
    var newBuffer = Buffer.concat([bufferHead, buffer]);
    return  newBuffer;
}

ZgbCommon.prototype.getIotGatewayDate = function(buffer,cmdId)
{
    var bufferHead =  new Buffer(4) ;
    bufferHead.writeUInt16LE(buffer.length, 0);
    bufferHead.writeUInt8(IotGateway.gwFunctionId_t.RPC_SYS_PB_GW_MGR, 2);
    bufferHead.writeUInt8(cmdId, 3);
    //bufferHead.writeUInt8(gatewayKey, 4);
    var newBuffer = Buffer.concat([bufferHead, buffer]);
    return  newBuffer;
}

//endpointId 如果为空，就控制所有的端口，比如dido会全开或全关
ZgbCommon.prototype.getGWAddress = function(ieeeAddress,endpointId)
{
    var gateaddr = new Gateway.gwAddressStruct_t;
    gateaddr.ieeeAddr = ieeeAddress;
    gateaddr.addressType = Gateway.gwAddressType_t.UNICAST;

    if(endpointId != null)
    {
        gateaddr.endpointId = endpointId;
    }else{
        //gateaddr.endpointId = 8;
    }
    return gateaddr;
}

ZgbCommon.prototype.getNwkmgrAddress = function(ieeeAddress,endpointId)
{
    var gateaddr = new Nwkmgr.nwkAddressStruct_t;
    gateaddr.ieeeAddr = ieeeAddress;
    gateaddr.addressType = Nwkmgr.nwkAddressType_t.UNICAST;
    if(endpointId != null)
    {
        gateaddr.endpointId = endpointId;
    }else{
        //gateaddr.endpointId = 8;
    }
    return gateaddr;
}

ZgbCommon.prototype.setZgbReadAttrisDictionary = function(driverId,address,clusterId,attriId,endpointId)
{
    var dictionaryKey = "_" + driverId + address + clusterId + attriId + endpointId;
    return dictionaryKey;
}

ZgbCommon.prototype.setCarParkAttrisKey = function(address)
{
    var dictionaryKey = "_" + address;
    return dictionaryKey;
}

ZgbCommon.prototype.address_longToString = function(long)
{
    var address = long.toString(16);
    if(address.length < 16){
        address = "00" + long.toString(16);
    }
    console.error(address);
    return address;
}
//硬件说：每个端口的设备id都是一样的，都可以拿来当作辨别设备的id
ZgbCommon.prototype.getDeviceId = function(deviceInfo)
{
    var deviceId = null;
    if(deviceInfo != null)
    {
        if(deviceInfo.simpleDescList.length > 0)
        {
            var desc = deviceInfo.simpleDescList[0];
            deviceId = desc.deviceId;
        }

        /*for(var i = 0;i < deviceInfo.simpleDescList.length;i++)
        {
            var desc = deviceInfo.simpleDescList[i];
            if(desc != null)
            {
                if(desc.deviceId){
                    deviceId = desc.deviceId;
                }
                break;
                /!*if(desc.endpointId == 8)
                {
                    deviceId = desc.deviceId;
                }*!/
            }
        }*/
    }
    return deviceId;
}

//硬件说：每个端口的设备id都是一样的，都可以拿来当作辨别设备的id
ZgbCommon.prototype.getDeviceClusterIds = function(deviceInfo)
{
    var clusterIds = [];
    if(deviceInfo != null)
    {
        for(var i = 0;i < deviceInfo.simpleDescList.length;i++)
         {
             var desc = deviceInfo.simpleDescList[i];
             if(desc != null)
             {
                 if(desc.inputClusters != null)
                 {
                     for (var j = 0; j < desc.inputClusters.length; j++)
                     {
                         var clusterId = desc.inputClusters[j];
                         if (clusterIds.length == 0) {
                             clusterIds.push(clusterId);
                         }
                         else {
                             if (clusterIds.indexOf(clusterId) == -1) {
                                 clusterIds.push(clusterId);
                             }
                         }
                     }
                 }
                 if(desc.outputClusters != null)
                 {
                     for(var k = 0;k < desc.outputClusters.length;k++)
                     {
                         var clusterId = desc.outputClusters[k];
                         if(clusterIds.length == 0)
                         {
                             clusterIds.push(clusterId);
                         }
                         else
                         {
                             if(clusterIds.indexOf(clusterId) == -1)
                             {
                                 clusterIds.push(clusterId);
                             }
                         }
                     }
                 }
             }
         }
    }
    return clusterIds;
}


/*
ZgbCommon.prototype.getDeviceListFromTable = function(deviceFsCallBack)
{
    deviceFs.fsReadFile(deviceFsCallBack);
}
ZgbCommon.prototype.deviceFsCallBack = function(err,data)
{
    var deviceList = [];
    if(err){
        console.info("读取设备数据库出错");
        console.info(err);
        return deviceList;
    }
    if(data == ""){
        console.info("设备数据库表为空");
        return deviceList;
    }
    var result = common.Trim(data,"g");
    var devicesStrs = result.split("CapInfo");
    if(devicesStrs[1] == ""){
        console.info("设备列表没有任何设备存在");
    }else{
        var devicesStr = devicesStrs[1];
        var devices = devicesStr.split(",");
        //var deviceList = [];
        for(var i = 0;i < devices.length;i++){
            if(i % 7 == 0){
                if(devices[i].substr(0,1) == "#"){
                    i += 7
                }else{
                    var dobject = {};
                    dobject.ieeeAddress = devices[i];
                    dobject.NwkAddress = devices[i+1];
                    dobject.Status = devices[i+2];
                    dobject.manufacturerId = devices[i+3];
                    dobject.EP_Count = devices[i+4];
                    dobject.ParentIeeeAddress = devices[i+5];
                    dobject.CapInfo = devices[i+6];
                    deviceList.push(dobject);
                }
            }
        }
    }
    return deviceList;
}
*/

module.exports = ZgbCommon;


