/**
 * Created by Administrator on 2016/7/5.
 */

//config.xml配置文件在网关上的绝对路径
var path_config = '/var/lib/cloud9/gatewayConfig/config.xml';
//funConfig.xml配置文件在网关上的绝对路径
var path_funConfig = '/var/lib/cloud9/gatewayConfig/funConfig.xml';
//173_device.xml.配置文件在网关上的绝对路径
var path_173_device = '/var/lib/cloud9/artGateway/config/173_device.xml';

//写入配置文件
var path_funConfig_folder = '/var/lib/cloud9/gatewayConfig/';

//config.xml 配置文件在本地调试时的相对路径
var debug_configXml = '../gatewayConfig/config.xml';
//funConfig.xml 配置文件在本地调试时的相对路径
var debug_funConfigXml = '../gatewayConfig/funConfig.xml';
//173_device.xml 配置文件在本地调试时的相对路径
var debug_173_deviceXml = './config/173_device.xml';

//log4js_json  配置文件在本地调试时的绝对路径 这个文件主要是配置写入和保存日记的一些参数
var path_log4js_json = '/var/lib/cloud9/artGateway/uint/log4js.json';
//本地的相对路径
var debug_log4js_json = 'uint/log4js.json';

//log4js_json  配置文件在本地调试时的绝对路径 这个文件主要是配置写入和保存日记（是保存如果和服务器断开了连接后，暂时保存下来的）一些参数
var path_upLoadjs_json = '/var/lib/cloud9/artGateway/upLoadInfos/upLoadjs.json';
var debug_upLoadjs_json = 'upLoadInfos/upLoadjs.json';

//保存到本地的日记文件的路径，调试模式下的
var debug_logs_path = 'E:/autoDriver/logs/';


//保存到本地的日记文件的路径，调试模式下的
var debug_bacnet_read_path = 'E:/autoDriver/artGateway/bacnet/bacrp.exe ';
var debug_bacnet_write_path = 'E:/autoDriver/artGateway/bacnet/bacwp.exe ';

var bacnet_read_path = '/var/lib/cloud9/artGateway/bacnet/bacrp ';
var bacnet_write_path = '/var/lib/cloud9/artGateway/bacnet/bacwp ';

var modbus_path = '/var/lib/cloud9/artGateway/modbus/';

//设置当前模式为调试还是正式的
var debug = false;

exports.get_debug = function ()
{
    return  debug;
}

exports.get_configXml = function ()
{
    var str = "";
    if(debug == true){
        str = debug_configXml;
    }else{
        str = path_config;
    }
    return  str;
}

exports.get_funConfigXml = function ()
{
    var str = "";
    if(debug == true)
    {
        str = debug_funConfigXml;
    }
    else
    {
        str = path_funConfig;
    }
    return  str;
}

exports.get_configFolder = function ()
{
    var str = "";
    if(debug == true){

    }else{
        str = path_funConfig_folder;
    }
    return  str;
}


exports.get_173_deviceXml = function ()
{
    var str = "";
    if(debug == true)
    {
        str = debug_173_deviceXml;
    }else{
        str = path_173_device;
    }
    return  str;
}


exports.get_log4js_json = function ()
{
    var str = "";
    if(debug == true)
    {
        str = debug_log4js_json;
    }else{
        str = path_log4js_json;
    }
    return  str;
}

exports.get_upLoadjs_json = function ()
{
    var str = "";
    if(debug == true)
    {
        str = debug_upLoadjs_json;
    }else{
        str = path_upLoadjs_json;
    }
    return  str;
}
exports.get_bacnetExe_path = function (type)
{
    var str = "";
    if(debug == true)
    {
        if(type == "read"){
            str = debug_bacnet_read_path;
        }else{
            str = debug_bacnet_write_path;
        }
    }else{
        if(type == "read"){
            str = bacnet_read_path;
        }else{
            str = bacnet_write_path;
        }
    }
    return  str;
}

exports.get_modbus_path = function (type)
{
    var str = "";
    if(debug == true)
    {

        str = "";

    }else{

        str = modbus_path;
    }
    return  str;
}

exports.get_debug_logs_path = function ()
{
    return  debug_logs_path;
}

exports.get_debug_upload_logs_path = function ()
{
    return  debug_logs_path;
}

exports.get_debug_upload_logs_path = function ()
{
    return  debug_logs_path;
}

