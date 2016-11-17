/**
 * Created by Administrator on 2016/7/13.
 */

var process = require('child_process');

var events = require('events');
var util = require('util');
var pathConfig = require('../pathConfig');

var bacnetCommon = require('./bacnetCommon');
var self;

function BacnetAction(){
    self = this;
}
util.inherits(BacnetAction, events.EventEmitter);

var bacnetData = new Object();
bacnetData.deviceAddress = -1;
bacnetData.instanceType = -1;
bacnetData.instanceIndex = -1;
bacnetData.error = -1;
bacnetData.data = -1;

//device_instance:bacnet设备实例1-65535
//object_type:bacnet对象类型 0-AI 1-AO 2-AV 3-BI 4-BO 5-BV
//object_instance:对象实例 0-65535
//stdout:返回值（A的返回浮点值，B的返回布尔值）
//error:返回失败
BacnetAction.prototype.readBacnet = function(device_instance,object_type,object_instance)
{
    var bacnetExePath = pathConfig.get_bacnetExe_path("read")
    process.exec( bacnetExePath + device_instance + " " + object_type + " " + object_instance + " 85",
        function (error, stdout, stderr)
        {
            if (error !== null) {
                //console.log("readBacnet_error type::" + object_type +"======index:" + object_instance);
                //console.log(error);
            }else{
                //console.log("================stdout：" + stdout);
            }
            bacnetData.deviceAddress = device_instance;
            bacnetData.instanceType = object_type;
            bacnetData.instanceIndex = object_instance;
            bacnetData.error = error;
            bacnetData.data = stdout;
            self.emit(bacnetCommon.cmdId_t.READ_BACNET_IND,bacnetData);
        });

    /*setTimeout(function(){
        bacnetData.deviceAddress = device_instance;
        bacnetData.instanceType = object_type;
        bacnetData.instanceIndex = object_instance;
        bacnetData.error = null;
        bacnetData.data = device_instance + "|" + object_instance;
        self.emit(bacnetCommon.cmdId_t.READ_BACNET_IND,bacnetData);
    },100)*/

}

//device_instance:bacnet设备实例1-65535
//object_type:bacnet对象类型 1-AO 2-AV  4-BO 5-BV
//object_instance:对象实例 0-65535
//data_type:数据类型 1-布尔 4-浮点
//data_value:数据值
//stdout:返回成功
//error:返回失败
BacnetAction.prototype.writeBacnet = function(device_instance,object_type,object_instance,data_type,data_value)
{
    var bacnetExePath = pathConfig.get_bacnetExe_path("write")
    process.exec( bacnetExePath + device_instance + " " + object_type + ' ' + object_instance + " 85 16 -1 " + data_type + " " + data_value,
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log(error);
            }else{
                //console.log(stdout);
            }
            bacnetData.deviceAddress = device_instance;
            bacnetData.instanceType = object_type;
            bacnetData.instanceIndex = object_instance;
            bacnetData.error = error;
            bacnetData.data = stdout;
            self.emit(bacnetCommon.cmdId_t.WRITE_BACNET_IND,bacnetData);
        });

    /*setTimeout(function(){
        bacnetData.deviceAddress = device_instance;
        bacnetData.instanceType = object_type;
        bacnetData.instanceIndex = object_instance;
        bacnetData.error = null;
        bacnetData.data = device_instance + "|" + object_instance;;
        self.emit(bacnetCommon.cmdId_t.WRITE_BACNET_IND,bacnetData);
    },3000)*/
}

module.exports = BacnetAction;
//写浮点数2.3到设备123的AO1
//writeBacnet('123','1','1','4','2.0');
//读设备123的AO1的值
//readBacnet('123','1','1');

