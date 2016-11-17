/**
 * Created by Administrator on 2016/8/2.
 */

var events = require('events');
var util = require('util');
//var pathConfig = require('../pathConfig');

var fireData = require('./fireCheckData');

var process = require('child_process');

var dataLen = 11;

function fireCheckAction()
{
    var self = this;

    var sp = process.spawn('/var/lib/cloud9/artGateway/fireCheck/zone');
    sp.stdout.on('data',function(data)
    {
        //console.log(data);
        //console.log("%s",data);
        //console.log(data.length);

        var j = 0;
        for(var i = 0;i < data.length;i++)
        {
            if(i % dataLen == 0){

                if(data.length - i < dataLen)return;

                j = i;
                var buffer = new Buffer(dataLen);
            }

            buffer[i-j] = data[i];

            if((i - j) == (dataLen - 1)){

                var dataString = buffer.toString(null,0,dataLen);
                //console.log(dataString);

                var dataArray = dataString.split(" ");
                var value = "1";
                var address = "0";

                var _address = dataArray[0] + dataArray[1];

                for(var k = 0;k < _address.length;k++)
                {
                    if(_address.charAt(k) != "0")
                    {
                        address = _address.slice(k,_address.length);
                        break;
                    }
                }
                var cmdType = parseInt(dataArray[2],16);

                if(cmdType == fireData.TYPE_ELECTRICITY)
                {
                    //2为火灾报警，发1
                    value = parseInt(dataArray[3],16);
                }
                if(cmdType == 4)
                {
                    //如果是地磁系统的心跳包 则把状态更新到 地磁的状态中去
                    cmdType = 3
                }
                if(address != "0")
                {
                    self.emit(fireData.REPORT_EVENT,address,cmdType,value);
                }
                //var value1 = parseInt("64",16)
                //console.log(address + "-------------------" + cmdType + "---------------------" + value)
            }
        }
    });


    sp.stdout.on('exit',function(code,signal){
        console.log(code);
        process.exit();
    });
}
util.inherits(fireCheckAction, events.EventEmitter);




//address:设备地址
//cmdType:指令类型 0
//value:数据

/*fireCheckAction.prototype.report = function(data)
 {

 var dataArray = data.split(" ");
 var address = dataArray[0];
 var cmdType = dataArray[1];
 var value = dataArray[2];

 this.emit(fireData.REPORT_EVENT,address,cmdType,value);
 }*/

module.exports = fireCheckAction;

