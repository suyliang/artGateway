/**
 * Created by Administrator on 2016/8/29.
 */

var fs = require("fs");
var iotgateway = require("../proto/iotgateway.js");
var localDataUrl = "./uint/didoUses.txt"
var logger = require('./myLog4js').myLog4js;
var devicesStr = "";
var didoDataObj = {};
var iotDevice;

exports.fsOpenFile = function(_iotDevice)
{
    iotDevice = _iotDevice;
    fs.open(localDataUrl, 'a', function(err, fd)
    {
        if (err) {
            return console.error(err);
        }
        fsReadFile();
        console.log("文件打开成功！");
    });
}
exports.getDiDoObj = function()
{
    return devicesStr;
}

function fsReadFile()
{
    devicesStr = "";
    fs.readFile(localDataUrl, function (err, data)
    {
        if (err)
        {
            //return console.error(err);
        }
        else
        {
            devicesStr = data.toString();
            if(devicesStr != "")
            {
                didoDataObj = JSON.parse(devicesStr);
            }
            if(debug == false) {
                resetTime1();
            }else{
                resetTime();
            }
            //console.log("异步读取------------------: " + devicesStr);
        }
        //callBack(err,devicesStr);
    });
    // 同步读取
    /*var data = fs.readFileSync(localDataUrl);
     console.log("同步读取: " + data.toString());*/
}

var debug = true;
var employer_time_miao = 60000;
var employer_time_fen = 60;
//function writeValue(address,endpointId,value,attrisObj){
exports.writeValue = function(attrisObj)
{
    if(debug == false){
        employer_time_fen = 1440;
    }

    var address = attrisObj.deviceAddress;
    var endpointId = attrisObj.endpointId;
    var value = attrisObj.attributeValue;

    var key = address + "_" + endpointId;

    var newObj = {}
    if(didoDataObj[key] != null)
    {
        newObj = didoDataObj[key];
    }else{

        newObj.all0 = 0;//自开始使用以来，总的未使用时间
        newObj.all1 = 0;//自开始使用以来，总的使用时间
        newObj.bt = Math.round(new Date().getTime()/employer_time_miao);//beginTime ,开端点开始运作的时间戳 用分钟表示
        newObj.ct = Math.round(new Date().getTime()/employer_time_miao);//curTime，当前时间,也是上次的记录的时间 用分钟表示
        newObj.cv = -1;//curValue，当前次统计的类型 0 表示未使用，1表示使用中

        if(debug == false){
            newObj.h = new Date().getHours();//curHour，当前处于那个小时 0 - 23
        }else{
            newObj.h = new Date().getMinutes();//curHour，当前处于那个分钟 0 - 60
        }

        newObj.dt0 = 0; //dataTime0今天未使用的时间，每天0点开始的时候 要清0
        newObj.dt1 = 0;  //dataTime1今天使用的时间,每天0点开始的时候 要清0

        newObj.deviceId = attrisObj.deviceId;//设备id
        newObj.objectId = attrisObj.objectId;//对象id
        newObj.attributeType = attrisObj.attributeType; //属性标识
        newObj.endpointId = attrisObj.endpointId; //端点
        newObj.deviceDes = attrisObj.deviceDes;
        newObj.objectDes = attrisObj.objectDes;
        newObj.deviceMacAddress = attrisObj.deviceMacAddress;

        didoDataObj[key] = newObj;
    }
    var newTime = Math.round(new Date().getTime()/employer_time_miao);//当前改变的时间
    var curValue = newObj["cv"];
    if(curValue == -1){
        curValue = value;
    }
    newObj["all" + curValue] = newObj["all" + curValue] + (newTime - newObj["ct"]);
    newObj["dt" + curValue] = newObj["dt" + curValue] + (newTime - newObj["ct"]);

    if(newObj["dt" + curValue] > employer_time_fen)
    {
        newObj["dt" + curValue] = employer_time_fen;//一个小时不超过60分钟
    }
    newObj["ct"] = newTime;
    newObj["cv"] = value;

}

var intevalCount = 0;
var curHour;
function resetTime()
{
    initTime();
    curHour = new Date().getMinutes();
    setInterval(function()
    {
        var checkHour = new Date().getMinutes();
        if(curHour != checkHour)
        {
            var newTime = Math.round(new Date().getTime()/employer_time_miao);//当前改变的时间

            console.info("一分钟保存一次-----------------------------")
            var string = JSON.stringify(didoDataObj);
            console.info("didoStr::" + string);
            fs.writeFile(localDataUrl,string,function(e){//会先清空原先的内容
                if(e){
                    throw e;
                }else{
                    console.info("写入成功----------")
                }
            })

            if(checkHour % 5 == 0){
                //下一个5分钟了---------------- 5分钟统计一次,发送一次数据
                var useList = [];
                for(var key in didoDataObj)
                {

                    //这里需要做处理吗：把一个小时内的数据最终统计一次-------------<<<<<<<<<
                    var cur_value = didoDataObj[key]["cv"];
                    if(cur_value == -1) continue;
                    didoDataObj[key]["dt" + cur_value] = didoDataObj[key]["dt" + cur_value] + (newTime - didoDataObj[key]["ct"])
                    //------------------------------------------------------------->>>>>>>>>..

                    didoDataObj[key].h = checkHour;
                    //发送数据---------------------
                    if(curHour == 59 && checkHour == 0)
                    {
                        //0时了，数据重置一次
                        didoDataObj[key].ct = Math.round(new Date().getTime()/employer_time_miao);//curTime，当前时间,也是上次的记录的时间
                        didoDataObj[key].dt0 = 0;
                        didoDataObj[key].dt1 = 0;
                    }
                }

            }
        }
        curHour = checkHour;
    },2000);

 }

function initTime(){
    for(var key in didoDataObj)
    {
        if(debug == false) {
            didoDataObj[key].h = new Date().getHours();
        }else{
            didoDataObj[key].h = new Date().getMinutes();
        }
        didoDataObj[key].cv = -1; //curValue，当前次统计的类型 0 表示未使用，1表示使用中
        didoDataObj[key].dt0 = 0; //dataTime0今天未使用的时间，每天0点开始的时候 要清0
        didoDataObj[key].dt1 = 0;  //dataTime1今天使用的时间,每天0点开始的时候 要清0
        didoDataObj[key].ct = Math.round(new Date().getTime()/employer_time_miao);//curTime，当前时间,也是上次的记录的时间
    }
}


function resetTime1()
{
    initTime();
    curHour = new Date().getHours();
    setInterval(function()
    {
        var checkHour = new Date().getHours();
        if(curHour != checkHour)
        {
            var newTime = Math.round(new Date().getTime()/employer_time_miao);//当前改变的时间
            //进入了下个小时段-----发送一次数据
            var useList = [];
            for(var key in didoDataObj)
            {
                logger.writeDebug("到整点了-----------------------------------------------------------------");
                logger.writeDebug(JSON.stringify(didoDataObj[key]));
                logger.writeDebug("------------------------------------------------------------------------");
                //这里需要做处理吗：把一个小时内的数据最终统计一次-------------<<<<<<<<<
                var cur_value = didoDataObj[key]["cv"];
                if(cur_value == -1) continue;
                didoDataObj[key]["dt" + cur_value] = didoDataObj[key]["dt" + cur_value] + (newTime - didoDataObj[key]["ct"])
                //------------------------------------------------------------->>>>>>>>>

                var info = new iotgateway.DidoUseDataInfo_t();

                 info.ieeeAddress = didoDataObj[key].deviceMacAddress;
                 info.deviceId = didoDataObj[key].deviceId;
                 info.objectId = didoDataObj[key].objectId;
                 info.attributeType = didoDataObj[key].attributeType;
                 info.endpointId = didoDataObj[key].endpointId;
                 info.deviceDes = didoDataObj[key].deviceDes;
                 info.objectDes = didoDataObj[key].objectDes;
                 info.cur_hour = didoDataObj[key].h;
                 info.dayUse = didoDataObj[key].dt1;


                 useList.push(info);

                didoDataObj[key].h = checkHour;

                if(curHour == 23 && checkHour == 0)
                {
                    //0时了，数据重置一次
                    didoDataObj[key].ct = Math.round(new Date().getTime()/employer_time_miao);//curTime，当前时间,也是上次的记录的时间
                    didoDataObj[key].dt0 = 0;
                    didoDataObj[key].dt1 = 0;
                }
            }

            iotDevice.GwDidoUseDataListInd(useList);
        }
        curHour = checkHour;

        intevalCount ++;
        if(intevalCount % 30 == 0)
        {
            intevalCount = 0;
            //30秒保存更新一次缓存
            var string = JSON.stringify(didoDataObj);
            console.info("didoStr::" + string);
            fs.writeFile(localDataUrl,string,function(e){//会先清空原先的内容
                if(e){
                    throw e;
                }else{
                    console.info("写入成功----------")
                }
            })
        }
    },2000);

}
