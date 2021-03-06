/**
 * Created by Administrator on 2016/11/16.
 */
//清除日记文件功能
//在主文件中导入一次，启动这个线程

var pathConfig = require("../pathConfig.js");
var fs = require("fs");


var logsArray = new Array();
//var isUnlinking = false;
var removeCount = 12;//超过多少个文件
var removeTime = 1800000;//半小时
var objConfig = JSON.parse(fs.readFileSync(pathConfig.get_log4js_json(), "utf8"));

var baseDir = "";

init();

function init()
{
    if (objConfig.appenders)
    {
        if (pathConfig.get_debug() == true)
        {
            baseDir = pathConfig.get_debug_logs_path();
        } else{
            baseDir = objConfig["customBaseDir"];
        }
    }
    setInterval(checkIsUnlinking,removeTime);
}
function checkIsUnlinking()
{
    logsArray = new Array()
    explorer(baseDir);

    setTimeout(function()
    {
        if(logsArray != null)
        {
            for(var pathKey in logsArray)
            {
                //console.info(pathKey + "===========" + logsArray[pathKey].txt_length);
                var moveTxt = pathKey + "/" + logsArray[pathKey].txt_time + '.txt';
                if(logsArray[pathKey].txt_length > removeCount)
                {

                    fs.unlink(moveTxt, function()
                    {
                        console.info('unlink success') ;
                    }) ;
                }
            }
        }
    },10000);
}

//checkIsUnlinking()

function explorer(path){

    fs.readdir(path, function(err, files){
        //err 为错误 , files 文件名列表包含文件夹与文件
        if(err)
        {
            console.info('error:\n' + err);
            logsArray = null;
            return;
        }
        files.forEach(function(file)
        {
            var pathStr = path + '/' + file;
            fs.stat(pathStr, function(err, stat)
            {
                if(err){console.info(err); return;}

                if(stat.isDirectory()){
                    // 如果是文件夹遍历
                    explorer(pathStr);
                    if(logsArray[pathStr] == null)
                    {
                        logsArray[pathStr] = {
                            txt_length:0,
                            txt_time:0
                        };
                    }
                }else{
                    // 读出所有的文件
                    //console.info('文件名:' + path + '/' + file);
                    if(logsArray[path] != null)
                    {
                        var txtTime = parseInt(file.substring(0,file.length - 3));
                        //console.info(txtTime)
                        if(logsArray[path].txt_time > 0)
                        {
                            if(logsArray[path].txt_time > txtTime)
                            {
                                logsArray[path].txt_time = txtTime;
                            }
                        }
                        else
                        {
                            logsArray[path].txt_time = txtTime;
                        }
                        logsArray[path].txt_length ++;
                        //console.info('文件名:' + logsArray[path].txt_time);
                    }
                }
            });
        });
    });
}


// 删除文件
/*
 fs.unlink('bb.txt', function(){
 console.log('success') ;
 }) ;
 // 修改文件名称
 fs.rename('bb.txt','bigbear.txt',function(err){
 console.log('rename success') ;
 });
 // 查看文件状态
 fs.stat('bb.txt', function(err, stat){
 console.log(stat);
 });
 // 判断文件是否存在
 fs.exists('bb.txt', function( exists ){
 console.log( exists ) ;
 }) ;*/