/**
 * Created by Administrator on 2016/3/11.
 */
 //aa
var pathConfig = require("./pathConfig.js");

//var testjs = require("./test.js");

var logger = require('./uint/myLog4js').myLog4js;
//var MemoryUse = require("./memoryUse");
//var memoryUse = new MemoryUse();
var _led = require("./led.js");
//var uoLoadWrite = require('./upLoadInfos/upLoad').upLoadjs;
var connectYun = require('./connect/connectYun');
var connectGateway = require('./connect/connectGateway');
var connectNwkmgr = require('./connect/connectNwkmgr');

var iotGateway = require('./proto/iotgateway');

var DownLoadFs = require('./uint/downLoadFs');
//var UpLoadClient = require('./uint/upLoadClient');
//var upLoadClient = new UpLoadClient();
//var deviceFs = require('./uint/zgbDevicesFs');
//var yun_port = 11000;
//var yun_host = "127.0.0.1";

var childProcess = require('child_process');

var exec = require('child_process').exec;

var yun_port = 13033;
//var yun_host = "192.168.0.77";
var yun_host = "120.76.75.49";

//var gate_host = "192.168.0.110";
var gate_host = "127.0.0.1";
var gate_port = 2541;
var nwkmgr_port = 2540;

var HeadBodyBuffers = require('./uint/head_body_buffers').HeadBodyBuffers;

var Common = require("./common");
var common = new Common();

var ZgbCommon = require("./zgb/zgbCommon");
var zgbCommon = new ZgbCommon();
var zgbManagerCmdId_t = zgbCommon.cmdId_t();

var ModbusCommon = require("./modbus/modbusCommon");

var gate_hbd = new HeadBodyBuffers(4, packetLength);
var nwkmgr_hbd = new HeadBodyBuffers(4, packetLength);
var yun_hbd = new HeadBodyBuffers(4, packetLength);

var IotDevice = require("./IotDevice.js");
var iotDevice = new IotDevice();

//var yun_client = new connectYun(yun_port,yun_host,yun_hbd,iotDevice);
var yun_client = null;
var gate_client = null;
var nwkmgr_client = null;

var ZgbManager = require("./zgbManager")
var zgbManager;


var modbusManager;
var bacnetManager;
var fireCheckManager;
var carParkManager;

var ConfigManager = require('./configManager')
var configManager = new ConfigManager();

var debugLogFs = require('./uint/debugLogFs.js')

//读取配置文件
var Xml_parse = require('./uint/xmlParse.js').XmlParse;


var xml = pathConfig.get_configXml();
var xml1 = pathConfig.get_funConfigXml();
var xml2 = pathConfig.get_173_deviceXml();
//var xml3 = './config/funConfig1.xml';

var xmls = [[xml,0],[xml1,1],[xml2,2]];
//var xmls1 = [[xml,0],[xml1,1],[xml2,2]];
var xmlParse = new Xml_parse();

var zgbReadAttrisArray = [];//保存zgb设备的需要读的属性

var zgbAttrisDictionary = new Array();//zgb所有设备的所有属性
/*****
 * readAttrisDictionary
 * 以设备物理地址和设备簇clusterid和属性attriid为键位的字典
 * 值为 config表里的 [device_id,objectType,objectIndex,attributeType,attributeDataType,null,readAttrisIndex];
 **/

var modbusAttrisArray = [];
var bacnetAttrisArray = [];
//var carAttrisArray = new Array();
var fireAttrisArray = new Array();

var zgbDevicesDictionary = new Array();

var configXmlComplete = 0;

var gatewayTimeIsUpDataed = false;

function packetLength(data)
{
    return data.readUInt16LE(0);
}

/*var buffer1272 = new Buffer(2);
 buffer1272.writeUInt8(127,0);
 buffer1272.writeUInt8(2,1);
 var read1272 = buffer1272.readUInt16LE(0,2);
 console.error(read1272);*/

var startModuleTime = null;

/**
 * 1.先加载完配置文件，
 * 2。加载完成后，再去创建socket 连接2540，连接上后再连2541,
 * 3.然后连接创建socket连接云，
 * 4.然后解析配置文件，准备需要轮询采集的列表，和上传至服务器的设备列表，
 * 5.开始上传设备列表和采集数据,
 * */

//update();


xmlParse.on('complete', function (data) {
    //配置加载完毕，缓存处理完毕
    _led.led_write(1,1);
    configXmlComplete = 1;
    console.error("config.xml data complete----------------------------------------------------------------------------------------");
    var configDataObj
    try{
        configDataObj = configManager.getXmlUpDownData(iotDevice);
        if(configDataObj != null)
        {
            zgbReadAttrisArray = configDataObj.zgbReadAttrisArray;
            zgbAttrisDictionary = configDataObj.zgbAttrisDictionary;
            modbusAttrisArray = configDataObj.modbusAttrisArray;
            bacnetAttrisArray = configDataObj.bacnetAttrisArray;
            //carAttrisArray = configDataObj.carParkAttrisArray;
            fireAttrisArray = configDataObj.fireCheckAttrisArray;
            zgbDevicesDictionary = configDataObj.zgbDevicesDictionary;
        }
    }catch (err){
        //亮故障灯
        _led.led_write(2,1);
        console.error("getXmlUpDownData dealXmlError:",err);
        return;
    }

    if(configDataObj != null)
    {
        initYunClent();

        clearTimeout(startModuleTime);
        startModuleTime = setTimeout(function()
        {
            initZgbClient(configDataObj.zgbAttrisLenght);
            startZGB_DidoUseTime();
            if(pathConfig.get_debug() == false)
            {
                initModbus(configDataObj.modbusAttrisLenght);
                initBacnet(configDataObj.bacnetAttrisLenght);
                initFireCheck(configDataObj.fireAttrisLenght);
            }
            _led.led_write(0,1);
            //update();
        },3000);
    }
});
xmlParse.on('err', function (data) {
    //配置加载完毕，缓存处理完毕
    //configXmlComplete = 1;
    console.info("config.xml data err：" + data);
});
xmlParse.getxmldata(xmls);



upDateSystemTime();

function upDateSystemTime()
{
    childProcess.exec('ntpdate-debian',function(err,stdout,stderr)
    {
        if(err)
        {
            //logger.writeErr("同步网络时间失败");

            setTimeout(function()
            {
                upDateSystemTime();
            },5000)
        }
        else
        {
            setTimeout(function()
            {
                upDateSystemTime();
            },60000)

            if(gatewayTimeIsUpDataed == false)
            {
                gatewayTimeIsUpDataed = true;
                startZGB_DidoUseTime();
            }
            //logger.writeErr("同步网络时间成功");
            //process.exit();
        }
    });
}

//启动zgb dido设备的使用时间统计
function startZGB_DidoUseTime()
{
    if(gatewayTimeIsUpDataed == false && zgbManager!= null){
        setTimeout(function()
        {
            //启动dido统计系统
            //zgbManager.beginDidoUse();
        },1000)
    }

}

//更新完配置后，再次执行更新xml
function updateConfig()
{
    reset();
    //var xmls = [[xml,0],[xml1,1],[xml2,2]];
    //xmlParse.getxmldata(xmls);
}

var testWriteInterval = null;

function initYunClent()
{
    if(yun_client == null)
    {
        yun_client = new connectYun(yun_port,yun_host,yun_hbd,iotDevice);
    }
}

function initZgbClient(len)
{
    //可以传一个参数，是开还是关，关的话要移除所有监听，和重置所有数据
    if(zgbManager == null)
    {
        //if(len == 0)return;
        nwkmgr_client = new connectNwkmgr(nwkmgr_port,gate_host,nwkmgr_hbd);
        gate_client = new connectGateway(gate_port,gate_host,gate_hbd);

        initZgbManager();

        nwkmgr_client.on('connected',function(error)
        {
            zgbManager.zgbNwkmgrReq(zgbManagerCmdId_t.ZGB_GET_DEVICELIST_COMMOND);
            zgbManager.zgbNwkmgrReq(zgbManagerCmdId_t.ZGB_GET_LOCAL_DEVICELIST_COMMOND);
        });
        nwkmgr_client.on('closeed',function(error){

        });
        gate_client.on('connected',function(error)
        {
            //可以在此重置缓存超时的状态-----
            //不管云连没连上，握手已否，都读出来，没连上就缓存起来
            common.resetZgbReadAttris(zgbReadAttrisArray);
            zgbManager.zgbGatewayReq(zgbManagerCmdId_t.ZGB_READ_ATTRIS_COMMOND,zgbReadAttrisArray);
        });
        gate_client.on('closeed',function(error){

        });
    }else{
        zgbManager.setReadAttrisDictionary(zgbAttrisDictionary,zgbDevicesDictionary);
        zgbManager.zgbGatewayReq(zgbManagerCmdId_t.ZGB_READ_ATTRIS_COMMOND,zgbReadAttrisArray);
    }
}

//创建ZGB数据控制器------------
function initZgbManager()
{
    if (zgbManager == null)
    {
        zgbManager = new ZgbManager(nwkmgr_client,gate_client,iotDevice);
        zgbManager.setReadAttrisDictionary(zgbAttrisDictionary,zgbDevicesDictionary);
    }
}
//初始化modbus准备工作
function initModbus(len){
    if(modbusManager == null)
    {
        if(len == 0)return;
        var ModbusManager = require("./modbusManager")
        modbusManager = new ModbusManager(iotDevice);
    }
    modbusManager.setReadAttrisList(modbusAttrisArray);
}
//初始化bacnet准备工作
function initBacnet(len)
{
    if(bacnetManager == null)
    {
        if(len == 0)return;
        var BacnetManager = require("./bacnetManager")
        bacnetManager = new BacnetManager(iotDevice);
    }
    bacnetManager.setReadAttrisList(bacnetAttrisArray);
}
//初始化Fire准备工作
function initFireCheck(len)
{
    if(fireCheckManager == null)
    {
        if(len == 0)return;
        var FireCheckManager = require("./fireCheckManager")
        fireCheckManager = new FireCheckManager(iotDevice);
    }
    //console.dir(fireAttrisArray);
    fireCheckManager.setFireDictionary(fireAttrisArray);
}

//初始化Fire准备工作
/*function initCarParking(len)
 {
 if(carParkManager == null)
 {
 if(len == 0)return;
 var CarParkManager = require("./CarParkingManager")
 carParkManager = new CarParkManager(iotDevice);
 }
 //console.dir(fireAttrisArray);
 carParkManager.setFireDictionary(carAttrisArray);
 }*/

//---------------------------------------------------------------------------------------------------------------
//网关2540端口发回来的数据
nwkmgr_hbd.on('packet', function (packet)
{
    var head = packet.slice(0,4);
    var body = packet.slice(4);
    var resp = zgbManager.dealNwkmgrCallBack(body);
});
//网关2541端口发回来的数据
gate_hbd.on('packet', function (packet)
{
    var head = packet.slice(0,4);
    var body = packet.slice(4);
    var resp = zgbManager.dealGatewayCallBack(body);
    if(resp != null){
        if(head[3] == 17 || head[3] == 22){
            //设备更新属性
            var upDownData = zgbManager.sendAttrisChangeToYun(resp);
            if(upDownData != null && upDownData.length > 0)
            {
                if(head[3] == 22 && common.checkIsReport(upDownData[0].deviceType.toString()) == false)
                {
                    //报告回来的数据，如果不在配置表里使用到的，则不需要去处理
                    return;
                }
                for(var i = 0;i < upDownData.length;i++)
                {
                    iotDevice.x2IotAattribute(upDownData[i].driverId,upDownData[i].deviceId,upDownData[i].objectId,upDownData[i].objectType,upDownData[i].objectIndex,upDownData[i].attributeType,upDownData[i].attributeValue,upDownData[i].attributeValueMin,upDownData[i].attributeValueMax);
                }
                iotDevice.IotGwObjectAttributeMultipleInd();
            }
        }
    }
});
//从云发过来发回来的数据
yun_hbd.on('packet', function (packet)
{
    if(iotDevice.getGatewayAddress() == "0")return;
    var head = zgbCommon.getPacketHead(packet);
    var body = zgbCommon.getPacketBody(packet);
    if(body.length <= 0){
        return;
    }
    _led.led_toggle(1);
    //console.error("from yun :" + head[3]);
    iotDevice.IotGwReqParser(head[3],body);
})
//==========================================================================================================
iotDevice.on("ind",function(cmdId,data)
{
    if(yun_client == null)return;
    if(yun_client.getStatus() == 1){
        //已连上
        var buff = zgbCommon.getIotGatewayDate(data,cmdId);
        yun_client.write(buff);
        _led.led_toggle(1);
    }else{
        //没连上,发不上去，有些信息 可以先保存，连上之后再发上去,主要的设备列表；
        /*if(cmdId == 12)
         {
         var buffs = [];
         for(var i = 0;i < buff.length;i++)
         {
         buffs[i] = buff[i];
         }
         uoLoadWrite.writeAttris("msg=" + buffs);
         console.info("收到设备更新，但云还没连上");
         }*/
    }
});
//云平台写属性协议接口
iotDevice.on("write",function(_writeZgbAttributeQueue,_writeModbusAttributeQueue,_writeBacnetAttributeQueue,unKnow,writeFireOrParkAttributeQueue)
{
    if(zgbManager){
        zgbManager.zgbGatewayReq(zgbManagerCmdId_t.ZGB_WRITE_ATTRIS_COMMOND,_writeZgbAttributeQueue);
    }
    if(modbusManager){
        modbusManager.writeAttris(_writeModbusAttributeQueue);
    }
    if(bacnetManager){
        bacnetManager.writeAttris(_writeBacnetAttributeQueue);
    }
    if(fireCheckManager)
    {
        fireCheckManager.writeAttris(writeFireOrParkAttributeQueue);
    }

});
//云平台请求扫描设备
iotDevice.on(common.iotCmdId_t().IOT_SCAN_DEVICE_EVENT,function(data)
{

    zgbManager.zgbNwkmgrReq(zgbManagerCmdId_t.ZGB_SCAN_DEVICE_COMMOND,data);

});
//云平台请求删除设备
iotDevice.on(common.iotCmdId_t().IOT_DELETE_DEVICE_EVENT,function(data)
{

    zgbManager.zgbNwkmgrReq(zgbManagerCmdId_t.ZGB_DELETE_DEVICE_COMMOND,data);

});

//请求跟新网关程序
iotDevice.on(common.iotCmdId_t().IOT_REQ_UPDATA_GATEWAY_EVENT,function(data)
{
    if(data.reqType == 0){
        //更新
        update();
        //reset();
    }
    if(data.reqType == 1){
        //更新
        reset();
    }
});




/*function update() { 
    
    exec('git pull',function (error, stdout, stderr) 
    { 
         console.info('stdout: ' + stdout); 
         console.info('stderr: ' + stderr); 
         if (error !== null) 
         { 
            console.info('exec error: ' + error); 
         } 
         else 
         { 
             console.info('exec stdout: ' + stdout); 
         } 
    }); 
 }*/


function update() {
    exec('git pull',function (error, stdout, stderr) 
    {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) 
        {
            console.log('exec error: ' + error);
            iotDevice.gwCheckGatewayUpdataRsp(0,false)
        }
        else
        {
             _led.led_write(2, 1);
            iotDevice.gwCheckGatewayUpdataRsp(0, true);
                
            if(stdout.indexOf("Already up-to-date.") == -1)
            {
                //console.log(stdout);
                setTimeout(function () 
                {
                    reset();
                    
                }, 1000);
            }
        }
    });
}

function reset() {
    var child = exec('pm2 restart 0',
        function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
}


//配置文件有更新，收到服务器通知更新配置文件
iotDevice.on(common.iotCmdId_t().IOT_UPLOAD_CONFIG_EVENT,function(data)
{
    var downLoadFs = new DownLoadFs();
    var self = this;

    downLoadFs.download(data.configUrl,data.configName,data.upLoadId);
    downLoadFs.on("upDataConfigComPlete",function(err,uid){
        var status = iotGateway.gwStatus_t.STATUS_FAILURE;
        if(err){
            console.log("down fail");
        }else{
            console.log("down success");
            status = iotGateway.gwStatus_t.STATUS_SUCCESS;
        }
        self.gwUpLoadConfigRsp(status,uid);
        if(!err){
            setTimeout(function(){
                updateConfig();
            },1000)
        }
    });
});
//响应socket接口
//data：数据
iotDevice.on("rsp",function(cmdId,data)
{
    if(yun_client == null)return;
    if(yun_client.getStatus() == 1) {
        var buff = zgbCommon.getIotGatewayDate(data, cmdId);
        yun_client.write(buff);
    }
});


//测试代码===---==--==-=================================================================================================-=-==---------------------------=
//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
var testList = [];
var aaaaaa = null;
var bbbbbbb = 0;

var aa = 0
var bb = 0
var _bb = 0;
//模拟云平台发送数据过来
function dealYunMsgArray()
{
    if(gate_client.getStatus() == 0)
    {
        if(testWriteInterval != null)
        {
            clearInterval(testWriteInterval)
            testWriteInterval = null;
        }
        return;
    }
    if(zgbManager == null){
        return;
    }
    if(configXmlComplete == 1)
    {
        //模拟云平台发过来的数据
        if(aa == 0){
            aa = 1;
        }else{
            aa = 0;
        }

        if(bb == 250){
            _bb = 1;
        }
        if(bb == 0){
            _bb = 0;
        }
        if(_bb == 0) {
            if(bb < 250){
                bb += 10;
            }
        }else{
            if(bb > 0){
                bb -= 10;
            }
        }
        //zgbManager.dealZgbAction(0, 1, 2, 0, 32, new Buffer([bb, 0, 0, 0]))//灯的变亮度
        //zgbManager.dealZgbAction(0, 1, 2, 1, 32, new Buffer([bb, 0, 0, 0]))//灯的变颜色
        //zgbManager.dealZgbAction(0, 2, 1, 0, 16, new Buffer([1,0,0,0]))
        var arr =[9,1,0,16,aa + ""];
        var n = 1;
        for(var i = 0;i < n;i++){
            var packet = {};
            packet.driverId = 0;
            packet.deviceId = arr[i];
            packet.objectId = arr[i+n*1];
            packet.attributeType = arr[i+n*2];
            packet.attributeDataType = arr[i+n*3];
            packet.attributeValue = arr[i+n*4];

            if(bbbbbbb == 0){
                testList.push(packet);
                testList_test(testList);
            }

        }
    }
}

function testList_test(data)
{
    if(aaaaaa == null){
        aaaaaa = setTimeout(function()
        {
            //bbbbbbb = 1;
        },20000)
    }

    zgbManager.writeAttris(data);
}