var process = require('child_process');


//slaveid ：设备地址
//register_type：寄存器类型 0-ReadCoils 1-ReadDiscreteInputs 3-ReadHoldingRegisters 4-ReadInputRegisters
//register_addr：寄存器地址0-65535
//length：长度 0-255
//返回：[1 2 3 4] 高位在前,12 34
//例子：readModbus(1,4,4001,2);

function readModbus(slaveid,register_type,register_addr, length)
{
    process.exec('./modbusrtu '+slaveid+' '+register_type+' '+register_addr+' '+length,
	  function (error, stdout, stderr) {
		if (error !== null) {
		  console.log(stderr); //错误
		}else{
	      console.log(stdout);  //数据
	    }
	});
}


readModbus(1,4,1, 2);
