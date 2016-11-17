/**
 * Created by Administrator on 2016/4/1.
 */
var events = require('events');
var util = require('util');
var self;
var ModbusCommon = require('./modbusCommon');
var modbusCommon = new ModbusCommon();

var Modbus = require("modbusrtu").Modbus;
var modbus;

//https://github.com/Serge78rus/node-modbusrtu
function modbusAction(){
    self = this;
    //open modbus
    modbus = new Modbus(
        "/dev/ttyO4", //communication serial device
        {
            baud: 9600, //communication speed
            fmt: "8n1", //data bits, parity and stop bits
            timeout: 1000, //response timeout
            pause: 200, //pause between response and next request
            retry: 1 //retry counts
        },              //communication options (default: 9600, 8N2)
        function(err) {
            if (!err) {
                // Code for using modbus object
            } else{
                console.error("Modbus constructor error: " + err);
            }
            self.emit(modbusCommon.cmdId_t().INIT_MODBUS_IND,err);
        }
    );
}
util.inherits(modbusAction, events.EventEmitter);

/*
 写方法：
 设备地址:1-255    寄存器类型:（0-3)  寄存器地:0-65535  数组（Uint16的数组）
 返回：状态信息
 */
modbusAction.prototype.ModbusWriteRegister = function(addr,registerType,registerAddr,data){
    switch (registerType){
        case 0:
            modbus.writeCoils(
                addr, //slave address
                registerAddr, //first coil address
                data,   //[1,0] array of boolean values to write
                function(err) {
                    if (err) {
                        //返回状态
                    }
                    self.emit(modbusCommon.cmdId_t().WRITE_MODBUS_IND,err,registerType);
                });
            break;
        case 4:
            modbus.writeRegs(
                addr, //slave addres
                registerAddr, //first holding register address
                data,//[17,34]array of unsigned integer values to write
                function(err) {
                    if (err) {
                        //返回状态
                    }
                    self.emit(modbusCommon.cmdId_t().WRITE_MODBUS_IND,err,registerType);
                });
            break;
    }
}

/*
 读方法：
 设备地址:1-255    寄存器类型:（0-3)  寄存器地:0-65535   长度:1-255
 返回：状态信息（数组）
 */

//var modbusReadRegisterCount = 0;
modbusAction.prototype.ModbusReadRegister = function(addr,registerType,registerAddr,length){
    //console.error("read req>>>>>>>>>>" + addr + "---" + registerAddr)
    //modbusReadRegisterCount++;
    //console.error("i just do ModbusReadRegister oncemore,count:" ,modbusReadRegisterCount);
    switch (registerType){
        case 0:
            modbus.readCoils(
                addr, //slave address
                registerAddr, //first coil address
                length, //number of coils to read
                function(err, data) {
                    if (!err) {
                        //Code for using boolean array "data", contains coils status
                    } else {
                        //返回错误
                    }
                    var readData = {};
                    readData.err = err;
                    readData.data = data;
                    //readData.deviceAddr = addr;
                    readData.registerType = registerType;
                    self.emit(modbusCommon.cmdId_t().READ_MODBUS_IND,readData);
                });
            break;
        case 1:
            modbus.readDiscrInps(
                addr, //slave addres
                registerAddr, //first discrete input address
                length, //number of inputs to read
                function(err, data) {
                    if (!err) {
                        //Code for using boolean array "data", contains inputs status
                    } else {

                    }
                    var readData = {};
                    readData.err = err;
                    readData.data = data;
                    readData.registerType = registerType;
                    self.emit(modbusCommon.cmdId_t().READ_MODBUS_IND,readData);
                });
            break;
        case 4:
            modbus.readHoldRegs(
                addr, //slave addres
                registerAddr, //first holding register address
                length, //number of registers to read
                function(err, data) {
                    if (!err) {
                        //Code for using unsigned integer array "data", contains holding registers values
                    } else {

                    }
                    var readData = {};
                    readData.err = err;
                    readData.data = data;
                    readData.registerType = registerType;
                    self.emit(modbusCommon.cmdId_t().READ_MODBUS_IND,readData);
                });
            break;
        case 3:
            modbus.readInpRegs(
                addr, //slave addres
                registerAddr, //first input register address
                length, //number of registers to read
                function(err, data) {
                    if (!err) {
                        //Code for using unsigned integer array "data", contains input registers values
                    } else {

                    }
                    var readData = {};
                    readData.err = err;
                    readData.data = data;
                    readData.registerType = registerType;
                    readData.registerAddr = registerAddr;
                    readData.addr = addr;
                    self.emit(modbusCommon.cmdId_t().READ_MODBUS_IND,readData);
                });
    }
}

module.exports = modbusAction;