/**
 * Created by Administrator on 2016/3/14.
 */
//var config = require('../config/sample.xml');

var events = require('events');
var util = require('util');
var fs = require('fs');
var parseString = require('xml2js').parseString;
function XmlParse(){
    events.EventEmitter.call(this);
    this.xml = null;
    this.loadXmlErrors = [];
}
util.inherits(XmlParse, events.EventEmitter);

XmlParse.prototype.getxmldata = function(xmlpaths)
{
    //loadXmls = xmlpaths;

    this.loadXmlData(xmlpaths);

}
XmlParse.prototype.loadXmlData = function(xmlpaths){
    //loadXmls = _xmlpaths;
    if(xmlpaths.length == 0){
        return;
    }

    this.xml = fs.readFileSync(xmlpaths[0][0],'utf-8');
    var jsonData = null;

    parseString(this.xml,{explicitArray : false}, function (err, result)
    {
        if(err == null)
        {
            var obj = JSON.stringify(result);
            jsonData = JSON.parse(obj);

        }else{

            console.error("-----" + err);
        }
    });


    if(jsonData == null){
        this.loadXmlErrors.push(xmlpaths[0][0]);
        //this.emit('err',"can not readXml:" + xmlpaths[0][0]);
    }else{
        if(xmlpaths[0][1] == 0){
            this.getGatewayConfig(jsonData);
        }
        if(xmlpaths[0][1] == 1){
            this.creatCache(jsonData);
        }
        if(xmlpaths[0][1] == 2){
            this.creatZgbConfigCache(jsonData);
        }
    }
    xmlpaths.shift();
    if(xmlpaths.length > 0){
        this.loadXmlData(xmlpaths);
    }else{
        if(this.loadXmlErrors.length > 0){
            this.emit('err',"can not readXml:" + this.loadXmlErrors);
        }else{
            this.emit('complete');
        }
    }
}
XmlParse.prototype.getGatewayConfig = function(jsonData){
    var reports = [];
    var onlyReports = [];
    var reas = [];
    var continuals = [];
    var zgbReports = jsonData.common.zgbReports;

    if(zgbReports != null && zgbReports != "")
    {
        reports = zgbReports.split(",");
    }
    var zgbOnlyReports = jsonData.common.zgbOnlyReports;
    if(zgbOnlyReports != null && zgbOnlyReports != "")
    {
        onlyReports = zgbOnlyReports.split(",");
    }
    var zgbReads = jsonData.common.zgbReads;
    if(zgbReads != null && zgbReads != "")
    {
        reas = zgbReads.split(",");
    }
    var zgbReadContinuals = jsonData.common.zgbReadContinuals;
    if(zgbReadContinuals != null && zgbReadContinuals != "")
    {
        continuals = zgbReadContinuals.split(",");
    }
    global.configBaseUrl = jsonData.common.configBaseUrl
    global.zgbReports = reports;
    global.zgbOnlyReports = onlyReports;
    global.zgbReads = reas;
    global.zgbReadContinuals = continuals;
    global.zgbTimeOutMax = parseInt(jsonData.common.zgbTimeOutMax);
    global.modbusTimeOutMax = parseInt(jsonData.common.modbusTimeOutMax);
    global.bacnetTimeOutMax = parseInt(jsonData.common.bacnetTimeOutMax);
    global.zgbReadContinuals = continuals;

    return reports;
}
XmlParse.prototype.creatCache = function(jsonData){
    var drivers = jsonData.x2iot.drivers.driver;
    var driverObjs = new Array();
    var index = 0;
    if(this.isArray(drivers)){
        for(var j = 0 ;j < drivers.length;j++){
            index++;
            var driverObj = {};
            var devices = new Array();

            devices = this.json2obj_devices(drivers[j].devices.device);
            var key = drivers[j].driverId.toString();
            driverObjs["_"+key] = drivers[j];
            driverObjs["_"+key].devices = devices;
        }
    }else{
        if(typeof(drivers) == "object"){
            var driverObj = {};
            var devices = new Array();

            devices = this.json2obj_devices(drivers.devices.device);
            var key = drivers.driverId.toString();
            driverObjs["_"+key] = drivers;
            driverObjs["_"+key].devices = devices;
        }
    }
    this.xmlData = driverObjs;
    //console.logs(driverObjs);
    global.configXmlData = driverObjs;
    //this.emit('complete',driverObjs);

}

XmlParse.prototype.json2obj_devices = function(obj)
{
    var devices = new Array();
    if(this.isArray(obj))
    {
        for(var i = 0;i < obj.length;i++){
            var key = obj[i].deviceId.toString();
            devices["_"+key] = obj[i];
            //var objects = new Array();
            var _objects = obj[i].objects.object;
            devices["_"+key].objects = this.json2obj_objects(_objects);
        }
    }else{
        if(typeof(obj) == "object")
        {
            var key = obj.deviceId.toString();
            devices["_"+key] = obj;
            var _objects = obj.objects.object;
            devices["_"+key].objects = this.json2obj_objects(_objects);
        }
    }
    return devices
}

XmlParse.prototype.json2obj_objects = function(obj)
{
    var objects = new Array();
    if (this.isArray(obj)) {
        for (var j = 0; j < obj.length; j++) {
            var key = obj[j].objectId.toString();
            objects["_" + key] = obj[j];
            var attris = obj[j].attributes.attribute;
            objects["_"+key].attributes = this.json2obj_attris(attris);
        }
    }else{
        if(typeof(obj) == "object"){
            var key = obj.objectId.toString();
            objects["_"+key] = obj;
            var attris = obj.attributes.attribute;
            objects["_"+key].attributes = this.json2obj_attris(attris);
        }
    }
    return objects;
}

XmlParse.prototype.json2obj_attris = function(obj) {
    var attris = new Array();
    if (this.isArray(obj)) {
        for (var j = 0; j < obj.length; j++) {
            var key = obj[j].attributeType.toString();
            attris["_" + key] = obj[j];
        }
    }else{
        if(typeof(obj) == "object"){
            var key = obj.attributeType.toString();
            attris["_"+key] = obj;
        }
    }
    return attris;
}

//读取设备的命令id表----------------------------------------------------------------------------------------------------------------------


XmlParse.prototype.creatZgbConfigCache = function(jsonData){
    var venderId = jsonData.venderDevice.venderId.toString();
    var devices = jsonData.venderDevice.devices.device;
    var deviceObjs = new Array();
    if(this.isArray(devices)){
        for(var j = 0 ;j < devices.length;j++){
            var key = devices[j].deviceId.toString();
            deviceObjs["_"+key] = devices[j];
            var cmd = devices[j].cmds.cmd;
            deviceObjs["_"+key].cmds = this.json2obj_devices_cmds(cmd);
        }
    }else{
        if(typeof(devices) == "object"){
            var key = devices.deviceId.toString();
            deviceObjs["_"+key] = devices;
            var cmd = devices.cmds.cmd;
            deviceObjs["_"+key].cmds = this.json2obj_devices_cmds(cmd);
        }
    }
    //console.logs(driverObjs);
    //this.xmlData["_" +venderId] = deviceObjs;
    global.deviceData_173 = deviceObjs;
    //this.emit('complete',global.deviceData_173);

}

XmlParse.prototype.json2obj_devices_cmds = function(obj){
    var cmds = new Array();
    if(this.isArray(obj)){
        for(var i = 0;i < obj.length;i++){
            var key = obj[i].appCmdId.toString();
            cmds["_"+key] = obj[i];
        }
    }else{
        if(typeof(obj) == "object"){
            var key = obj.appCmdId.toString();
            cmds["_"+key] = obj;
        }
    }
    return cmds
}



XmlParse.prototype.isArray = function(object){
    return object && typeof object==='object' &&
        Array == object.constructor;
}

/*private static String jsonString(String s){
    char[] temp = s.toCharArray();
    int n = temp.length;
    for(int i =0;i<n;i++){
        if(temp[i]==':'&&temp[i+1]=='"'){
            for(int j =i+2;j<n;j++){
                if(temp[j]=='"'){
                    if(temp[j+1]!=',' &&  temp[j+1]!='}'){
                        temp[j]='��';
                    }else if(temp[j+1]==',' ||  temp[j+1]=='}'){
                        break ;
                    }
                }
            }
        }
    }
    return new String(temp);
}*/


exports.XmlParse = XmlParse;
//module.exports = XmlParse;