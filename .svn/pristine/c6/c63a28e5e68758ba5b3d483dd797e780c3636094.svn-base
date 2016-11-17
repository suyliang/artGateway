/**
 * Created by Administrator on 2016/3/16.
 */
var Common = require("./common");
var common = new Common();

var fireData = require("./fireCheck/fireCheckData");
var ZgbCommon = require("./zgb/zgbCommon");
var zgbCommon = new ZgbCommon();


/*var ModbusCommon = require("./modbus/modbusCommon");
 var modbusCommon = new ModbusCommon();*/

function ConfigManager(){

}

//获取config。xml里的各个对象
ConfigManager.prototype.getConfigXmlDevice = function(driverId,deviceId)
{
    var device = global.configXmlData["_"+driverId].devices["_"+deviceId];
    return device;
}

ConfigManager.prototype.getConfigXmlObject = function(driverId,deviceId,objectId)
{
    var object = global.configXmlData["_"+driverId].devices["_"+deviceId].objects["_"+objectId];
    return object;
}

ConfigManager.prototype.getConfigXmlAttribute = function(driverId,deviceId,objectId,attributeType)
{
    var object = global.configXmlData["_"+driverId].devices["_"+deviceId].objects["_"+objectId].attributes["_"+attributeType];
    return object;
}

//获取device.xml里的各个对象
ConfigManager.prototype.getDeviceXml_device = function(venderId,deviceId)
{
    var object = global.deviceData_173["_"+deviceId];
    return object;
}

ConfigManager.prototype.getDeviceXml_cmd = function(venderId,deviceId,cmdId)
{
    var object = global.deviceData_173["_"+venderId].devices["_"+deviceId].cmds["_"+cmdId];
    return object;
}

//准备采集的数据和准备发送列表到云服务器上去
var modbuskeys = new Array();
ConfigManager.prototype.setKeyIndex = function(key,index)
{
    modbuskeys["_" + key] = index;
}
ConfigManager.prototype.getKeyIndex = function(key)
{
    return modbuskeys["_" + key];
}

ConfigManager.prototype.getXmlUpDownData = function(iotDevice)
{
    var rindex = 0;
    var zgbReadAttrisArray = [];
    var zgbAttrisDictionary = new Array();
    var modbusAttrisArray = [];
    var bacnetAttrisArray = [];
    var carParkAttrisArray = new Array();
    var fireCheckAttrisArray = [];

    var zgbDevicesDictionary = new Array();

    var zgbReadAttrisLenght = 0;//zgb 需要读取的属性的长度
    var zgbAttrisLenght = 0;//zgb的属性长度
    var modbusAttrisLenght = 0;
    var bacnetAttrisLenght = 0;
    var carParkAttrisLenght = 0;
    var fireAttrisLenght = 0;

    var data = global.configXmlData;
    for(var driverKey in data)
    {
        var driverId = common.parseInt(data[driverKey].driverId);
        var devices = data[driverKey].devices;
        for(var dev in devices)
        {
            var deviceId = common.parseInt(devices[dev].deviceId);
            var device_desc = devices[dev].deviceDes;
            var zgb_deviceAddress = common.getDeviceAddr(devices[dev].deviceAddr);
            var modbus_deviceAddress = common.parseInt(devices[dev].deviceAddr);
            var bacnet_deviceAddress = common.parseInt(devices[dev].deviceAddr);
            var carPark_deviceAddress = common.parseInt(devices[dev].deviceAddr);
            var fire_deviceAddress = common.parseInt(devices[dev].deviceAddr);
            var deviceMacAddress = devices[dev].deviceAddr;//字符串的物理地址，和 硬件上一致
            if(deviceMacAddress == "" || deviceMacAddress == "null" || deviceMacAddress == null)
            {
                continue;
            }
            if(driverId == 0)
            {
                //var zgbDevice_address = common.getDeviceAddr(devices[dev].deviceAddr);
                var zgbDevice_id = devices[dev].deviceType;
                /*if(common.checkIsOnlyReport(zgbDevice_id) == true){
                 continue;
                 };*/
                var zgbDevice = this.getDeviceXml_device(173, zgbDevice_id);

                var deviceobj = new common.zgbUpdateDeviceStatusObj();
                deviceobj.driverId = driverId;
                deviceobj.deviceId = deviceId;
                deviceobj.deviceAddress = zgb_deviceAddress;
                deviceobj.deviceType = zgbDevice_id;
                deviceobj.deviceStatus = -1;
                deviceobj.deviceDes = device_desc;

                zgbDevicesDictionary["_" + zgb_deviceAddress] = deviceobj;
            }
            iotDevice.IotDeviceAdd(driverId,deviceId,device_desc,deviceMacAddress);

            var objs = devices[dev].objects;
            for (var obj in objs)
            {
                var objectId = common.parseInt(objs[obj].objectId);
                var objectType = common.parseInt(objs[obj].objectType);
                var objectIndex = common.parseInt(objs[obj].objectIndex);
                var endpointId = common.parseInt(objs[obj].endpointId);
                var objectDes = objs[obj].objectDes;
                var attributes = objs[obj].attributes;
                iotDevice.IotObjectAdd(driverId,deviceId,objectId,objectType,objectIndex,objectDes);
                for (var att in attributes)
                {
                    var attributeType = common.parseInt(attributes[att].attributeType);
                    var attributeDataType = common.parseInt(attributes[att].attributeDataType);

                    var min_maxs = [];
                    if(attributes[att].attributeMinMax){
                        min_maxs = attributes[att].attributeMinMax.split(",");
                    }
                    var attributeValueMin = ""
                    var attributeValueMax = ""
                    if(min_maxs.length == 2)
                    {
                        attributeValueMax = min_maxs[1];
                        attributeValueMin = min_maxs[0];
                    }
                    iotDevice.IotAattributeAdd(driverId,deviceId,objectId,attributeType,attributeDataType,attributeValueMin,attributeValueMax);

                    if(driverId == 0){
                        var clusterId;
                        if (attributes[att].hardwareCmdId != '' && attributes[att].hardwareCmdId != 'null')
                        {
                            var cmdobj = zgbDevice.cmds["_" + attributes[att].hardwareCmdId];
                            if(cmdobj == null){
                                continue;
                            }
                            if(cmdobj.attributeId != "")
                            {
                                clusterId = common.parseInt(cmdobj.clusterId);
                                var _attris = cmdobj.attributeId.split(",");
                                var attris = [];
                                for(var i = 0;i < _attris.length;i++)
                                {
                                    var deviceAttrisObject = new common.deviceAttrisObject();
                                    deviceAttrisObject.attributeId = common.parseInt(_attris[i]);
                                    attris.push(deviceAttrisObject);

                                    var dicKey = zgbCommon.setZgbReadAttrisDictionary(driverId,zgb_deviceAddress,clusterId,attris[i].attributeId,endpointId);
                                    var zgbPacket = new common.zgbAttrisPacket()
                                    zgbPacket.driverId = driverId;
                                    zgbPacket.deviceId = deviceId;
                                    zgbPacket.objectId = objectId;
                                    zgbPacket.objectType = objectType;
                                    zgbPacket.objectIndex = objectIndex;
                                    zgbPacket.attributeType = attributeType;
                                    zgbPacket.attributeValue = "";
                                    zgbPacket.endpointId = endpointId;

                                    zgbPacket.attributeValueMax = attributeValueMax;
                                    zgbPacket.attributeValueMin = attributeValueMin;

                                    zgbPacket.index = zgbAttrisLenght;

                                    zgbPacket.deviceDes = device_desc;
                                    zgbPacket.deviceType = zgbDevice_id;
                                    zgbPacket.deviceAddress = zgb_deviceAddress;

                                    zgbPacket.objectDes = objectDes;
                                    zgbPacket.clusterId = clusterId;

                                    zgbPacket.deviceMacAddress = deviceMacAddress;

                                    zgbAttrisDictionary[dicKey] = zgbPacket;
                                    zgbAttrisLenght++;
                                }
                                if(common.checkIsOnlyReport(zgbDevice_id) == true)
                                {
                                    //如果是只报告不读，则不执行下面
                                    continue;
                                };
                                // 为了将同一个设备的同一个cluster下的属性归类，这样读的次数的会少很多
                                var aaaa = 0
                                for(var j = 0;j < zgbReadAttrisArray.length;j++)
                                {
                                    if(zgbReadAttrisArray[j].clusterId == clusterId && zgbReadAttrisArray[j].driverId == driverId && zgbReadAttrisArray[j].deviceId == deviceId)
                                    {
                                        zgbReadAttrisArray[j].deviceAttris.push(attris[0]);
                                        aaaa = 1;
                                        break;
                                    }
                                }
                                //------------------------------------------------------------------
                                if(aaaa == 0){
                                    //这个设备的cluster还没存在 则添加一个
                                    var zgbPacket1 = new common.zgbReadAtttrisPacket()
                                    zgbPacket1.driverId = driverId;
                                    zgbPacket1.deviceId = deviceId;
                                    zgbPacket1.objectId = objectId;
                                    zgbPacket1.deviceAddress = zgb_deviceAddress;
                                    zgbPacket1.clusterId = clusterId;
                                    zgbPacket1.deviceAttris = attris;
                                    zgbPacket1.endpointId = endpointId;
                                    zgbPacket1.index = zgbReadAttrisLenght;
                                    zgbPacket1.continueTimeOut = 0;
                                    zgbPacket1.allSuccess = 0;
                                    zgbPacket1.allTimeOut = 0;

                                    zgbPacket1.deviceDes = device_desc;
                                    zgbPacket1.deviceType = zgbDevice_id;

                                    zgbPacket1.objectDes = objectDes;

                                    zgbPacket1.deviceMacAddress = deviceMacAddress;

                                    zgbReadAttrisArray.push(zgbPacket1);
                                    zgbReadAttrisLenght ++;
                                }
                            }
                        }
                    }
                    else if(driverId == 1){
                        var registerType = common.parseInt(attributes[att].registerType);
                        var registerAddr = common.parseInt(attributes[att].registerAddr);
                        /*if (attributes[att].attributeValue == '' || attributes[att].attributeValue == 'null')
                        {*/
                            //readModbusDictionary
                            /*var key = deviceId + "" + registerType;
                             var gindex = this.getKeyIndex(key);
                             if(gindex == null){
                             this.setKeyIndex(key,rindex);
                             rindex ++;
                             var readParameters = new common.modbusPacketParameters();
                             readParameters.driverId = driverId;
                             readParameters.deviceId = deviceId;

                             readParameters.index = readModbusAttrisIndex;
                             readParameters.continueTimeOut = 0;
                             readParameters.allSuccess = 0;
                             readParameters.allTimeOut = 0;
                             readParameters.registerAddrs = [];
                             readParameters.readDictionary = new Array();
                             modbusAttrisArray.push(readParameters);
                             }

                             var readObj = new common.modbusTypeParameters();
                             readObj.objectId = objectId;
                             readObj.registerType = registerType;
                             readObj.registerAddr = registerAddr;
                             readObj.attributeDataType = attributeDataType;
                             readObj.attributeValue = "";
                             readObj.objectType = objectType;
                             readObj.objectIndex = objectIndex;
                             modbusAttrisArray[gindex].registerAddrs.push(readObj)*/


                            var modbusParameters = new common.modbusReadAtttrisPacket();
                            modbusParameters.driverId = driverId;
                            modbusParameters.deviceId = deviceId;
                            modbusParameters.deviceAddress = modbus_deviceAddress;
                            modbusParameters.objectId = objectId;
                            modbusParameters.registerType = registerType;
                            modbusParameters.registerAddr = registerAddr;
                            modbusParameters.attributeDataType = attributeDataType;
                            modbusParameters.attributeType = attributeType;
                            modbusParameters.index = modbusAttrisLenght;
                            modbusParameters.continueTimeOut = 0;
                            modbusParameters.allSuccess = 0;
                            modbusParameters.allTimeOut = 0;
                            modbusParameters.objectType = objectType;
                            modbusParameters.objectIndex = objectIndex;
                            modbusParameters.deviceDes = device_desc;
                            modbusParameters.deviceStatus = -1;

                            modbusParameters.attributeValueMax = attributeValueMax;
                            modbusParameters.attributeValueMin = attributeValueMin;

                            modbusAttrisArray.push(modbusParameters);
                            modbusAttrisLenght ++;
                        //}
                    }

                    else if(driverId == 2){
                        var instanceType = common.parseInt(attributes[att].instanceType);
                        var instanceIndex = common.parseInt(attributes[att].instanceIndex);
                        /*if (attributes[att].attributeValue == '' || attributes[att].attributeValue == 'null')
                        {*/
                            var bacnetPacket = new common.bacnetPacket();
                            bacnetPacket.driverId = driverId;
                            bacnetPacket.deviceId = deviceId;
                            bacnetPacket.deviceAddress = bacnet_deviceAddress;
                            bacnetPacket.objectId = objectId;
                            bacnetPacket.instanceType = instanceType;
                            bacnetPacket.instanceIndex = instanceIndex;
                            bacnetPacket.attributeDataType = attributeDataType;
                            bacnetPacket.attributeType = attributeType;
                            bacnetPacket.index = bacnetAttrisLenght;
                            bacnetPacket.continueTimeOut = 0;
                            bacnetPacket.allSuccess = 0;
                            bacnetPacket.allTimeOut = 0;
                            bacnetPacket.objectType = objectType;
                            bacnetPacket.objectIndex = objectIndex;
                            bacnetPacket.deviceDes = device_desc;
                            bacnetPacket.deviceStatus = -1;

                            bacnetPacket.attributeValueMax = attributeValueMax;
                            bacnetPacket.attributeValueMin = attributeValueMin;

                            bacnetAttrisArray.push(bacnetPacket);
                            bacnetAttrisLenght ++;
                        //}
                    }else if(driverId == 3){

                        /*if (attributes[att].attributeValue == '' || attributes[att].attributeValue == 'null')
                        {*/
                            var carKey = zgbCommon.setCarParkAttrisKey(carPark_deviceAddress);
                            var carParkPacket = new common.carParkAtttrisPacket();
                            carParkPacket.driverId = driverId;
                            carParkPacket.deviceId = deviceId;
                            carParkPacket.deviceAddress = carPark_deviceAddress;
                            carParkPacket.objectId = objectId;
                            carParkPacket.attributeDataType = attributeDataType;
                            carParkPacket.attributeType = attributeType;
                            carParkPacket.index = carParkAttrisLenght;

                            carParkPacket.objectType = objectType;
                            carParkPacket.objectIndex = objectIndex;
                            carParkPacket.deviceDes = device_desc;
                            carParkPacket.deviceStatus = -1;

                            carParkPacket.attributeValueMax = attributeValueMax;
                            carParkPacket.attributeValueMin = attributeValueMin;

                            carParkAttrisArray[carKey] = carParkPacket;
                            carParkAttrisLenght ++;
                        //}
                    }
                    else if(driverId == 4){

                        /*if (attributes[att].attributeValue == '' || attributes[att].attributeValue == 'null')
                        {*/
                            if(attributes[att].cmdType == "" || attributes[att].cmdType == "null")continue;

                            var cmdType = common.parseInt(attributes[att].cmdType);

                            var carKey = fireData.setFireAttrisKey(fire_deviceAddress,cmdType);
                            var firePacket = new common.fireAtttrisPacket();
                            firePacket.driverId = driverId;
                            firePacket.deviceId = deviceId;
                            firePacket.deviceAddress = carPark_deviceAddress;
                            firePacket.objectId = objectId;
                            firePacket.attributeDataType = attributeDataType;
                            firePacket.attributeType = attributeType;
                            firePacket.index = fireAttrisLenght;

                            firePacket.objectType = objectType;
                            firePacket.objectIndex = objectIndex;
                            firePacket.deviceDes = device_desc;
                            firePacket.deviceStatus = -1;

                            firePacket.cmdType = cmdType;

                            firePacket.attributeValueMax = attributeValueMax;
                            firePacket.attributeValueMin = attributeValueMin;

                            fireCheckAttrisArray[carKey] = firePacket;
                            fireAttrisLenght ++;

                        //}
                    }
                }
            }
        }
    }
    var configDataObj = {};
    configDataObj.zgbReadAttrisArray = zgbReadAttrisArray;//zgb只读的属性，用来读取属性
    configDataObj.zgbReadAttrisLenght = zgbReadAttrisLenght;//zgb只读的属性的长度

    configDataObj.zgbAttrisDictionary = zgbAttrisDictionary;//zgb的所有属性，用来更新属性状态 属性值
    configDataObj.zgbAttrisLenght = zgbAttrisLenght;//zgb的所有属性，用来更新属性状态 属性值

    configDataObj.modbusAttrisArray = modbusAttrisArray;
    configDataObj.modbusAttrisLenght = modbusAttrisLenght;

    configDataObj.bacnetAttrisArray = bacnetAttrisArray;
    configDataObj.bacnetAttrisLenght = bacnetAttrisLenght;

    configDataObj.carParkAttrisArray = carParkAttrisArray;
    configDataObj.carParkAttrisLenght = carParkAttrisLenght;

    configDataObj.fireCheckAttrisArray = fireCheckAttrisArray;
    configDataObj.fireAttrisLenght = fireAttrisLenght;

    configDataObj.zgbDevicesDictionary = zgbDevicesDictionary;//统计zgb有多少个设备

    return configDataObj;
    //return [readAttrisArray,zgbAttrisDictionary,modbusAttrisArray,bacnetAttrisArray,carParkAttrisArray,fireCheckAttrisArray,zgbDevicesDictionary];
}

ConfigManager.prototype.getIeeeAddrByDriverId_DeviceId = function(driverId,deviceId)
{
    var deviceAddress;

    var device = this.getConfigXmlDevice(driverId,deviceId);
    if(device == null)
    {
        return null;
    }
    deviceAddress = device.deviceAddr;
    return deviceAddress;
}


ConfigManager.prototype.creatRegisterAddrs = function(readAttrisDictionary)
{
    for(var i = 0;i < readAttrisDictionary.length;i++)
    {
        if(readAttrisDictionary[i].registerAddrs.length > 0)
        {
            for(var i = 0;i < readAttrisDictionary[i].registerAddrs.length;i++)
            {

            }
        }
    }
}


module.exports = ConfigManager;