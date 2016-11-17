/**
 * Created by Administrator on 2016/5/4.
 */
var fs = require("fs");

// 异步读取../data/protofiles/gateway.js"
//var txtUrl = '../data/localDataFiles/'
var localDataUrl = "uint/aaaaa.csv"
//../data/localDataFiles/localData.txt
var sensorCycles = [];
var devicesObj = "";

fsOpenFile();
function fsOpenFile()
{
    fs.open(localDataUrl, 'r+', function(err, fd)
    {
        if (err) {
            return console.error(err);
        }
        console.log("文件打开成功！");
        //fsReadsensorCycle();
    });
}
exports.getSensorCycle = function()
{
    return sensorCycles;
}
exports.getDevicesObj = function()
{
    return devicesObj;
}

exports.fsReadFile = function(callBack)
{
    fsReadsensorCycle(callBack);
}

function fsReadsensorCycle(callBack)
{
    devicesObj = "";
    fs.readFile(localDataUrl, function (err, data)
    {
        if (err)
        {
            //return console.error(err);
        }else{
            if(data != "")
            {
                devicesObj = data.toString();
                //console.log("异步读取------------------: " + devicesObj);
            }
        }
        callBack(err,devicesObj);
    });

    // 同步读取
    /*var data = fs.readFileSync(localDataUrl);
     console.log("同步读取: " + data.toString());

     console.log("程序执行完毕。");*/
}


exports.getSensorValue = function(address)
{
    for(var i = 0;i < sensorCycles.length;i++)
    {
        if(address == sensorCycles[i].address)
        {
            return sensorCycles[i].cur_value;
        }
    }
    return 0;
}