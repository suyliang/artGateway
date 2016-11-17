/**
 * Created by Administrator on 2016/4/1.
 */
var events = require('events');
var util = require('util');
var self;
var ModbusCommon = require('./modbusCommon');
var modbusCommon = new ModbusCommon();
var pathConfig = require('../pathConfig');
var process = require('child_process');

function modbusAction(){
    self = this;
}
util.inherits(modbusAction, events.EventEmitter);
//slaveid ：设备地址
//register_type：寄存器类型 0-ReadCoils 1-ReadDiscreteInputs 3-ReadHoldingRegisters 4-ReadInputRegisters
//register_addr：寄存器地址0-65535
//length：长度 0-255
//返回：[1 2 3 4] 高位在前,12 34
//例子：readModbus(1,4,4001,2);

modbusAction.prototype.readModbus = function(slaveid,register_type,register_addr, length)
{
    //console.error("read req>>>>>>>>>>" + slaveid+ "---" + register_addr +"-----" + length )
    //var str = slaveid + "----" + register_type + "----" + register_addr + "----" + length;
    var path = pathConfig.get_modbus_path();
    process.exec( path + 'modbus_read_rtu '+slaveid+' '+register_type+' '+register_addr+' '+length,
        function (error, stdout, stderr) {
            if (stderr != "" || stdout == "") {
                console.log("modbus read err:::::" + error + "-----" + stderr);
                 //错误
            }else{
                //console.log("modbus read success::::::" + str + "-----" + stdout);  //数据
            }
            var readData = {};
            readData.err = error;
            //readData.err = null;
            readData.stderr = stderr;
            readData.addr = slaveid;
            readData.registerAddr = register_addr;
            readData.readlength = length;
            readData.data = stdout;
            //readData.data = "[66 72 0 0]";
            self.emit(modbusCommon.cmdId_t().READ_MODBUS_IND,readData);
        });
}
modbusAction.prototype.writeModbus = function(slaveid,register_type,register_addr, data)
{
    //console.error("read req>>>>>>>>>>" + slaveid+ "---" + register_addr +"-----" + length )
    //var str = slaveid + "----" + register_type + "----" + register_addr + "----" + length;
    var path = pathConfig.get_modbus_path();
    process.exec( path + 'modbus_write_rtu '+slaveid+' '+register_type+' '+register_addr+' '+data,
        function (error, stdout, stderr) {
            if (error !== null) {
                //console.log("modbus read err:::::" + str + "-----" + stderr); //错误
            }else{
                //console.log("modbus read success::::::" + str + "-----" + stdout);  //数据
            }
            var readData = {};
            readData.err = error;
            //readData.err = null;
            readData.stderr = stderr;
            readData.addr = slaveid;
            readData.registerAddr = register_addr;
            readData.data = stdout;
            //readData.data = "[66 72 0 0]";
            self.emit(modbusCommon.cmdId_t().WRITE_MODBUS_IND,readData);
        });
}

//readModbus(1,4,1, 2);

module.exports = modbusAction;