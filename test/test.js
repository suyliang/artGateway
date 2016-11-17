/**
 * Created by Anson on 2016/3/10.
 */
//module.exports = require("protobufjs").newBuilder({})["import"]({

/*var gateway = require("../proto/iotgateway.js");
var iot = require("../IotDevice.js");

var IOT =new iot;

//上传socket接口
//data：数据
IOT.on("ind",function(cmdId,data){
    console.info(data);
    if(cmdId==gateway.CmdId_t.GW_OBJECT_ATTRIBUTE_MULTIPLE_IND)
    {
        package1 = new gateway.GwObjectAttributeMultipleInd.decode(data);

    }
});

//云平台写属性协议接口
//data：数组 ["protocolId","address","objectType","objectId","attributeType","attributeValue"];
IOT.on("write",function(data){
    console.info(data.splice(data.length-1, 1));
});

//响应socket接口
//data：数据
IOT.on("rsp",function(cmdId,data){
    console.info(data);
});

IOT.IotHandshake(34555,3333333545);//握手
IOT.IotBeat();//心跳包
IOT.IotGwGatewayInfoInd(3,1,"工业网关");//上传网关信息

//创建设备
IOT.IotDeviceAdd(0,2,"智能插座");
//创建对象
IOT.IotObjectAdd(2,5,2,"开关");
//创建属性
IOT.IotAattributeAdd(2,5,2,gateway.AttributeType_t.ATTRIBUTE_PRESENT_VALUE,gateway.AttributeDataTypes_t.DATATYPE_BOOLEAN);

IOT.IotGwDeviceListInd();//上传设备列表


//模拟云平台写属性
var package = new gateway.GwWriteObjectAttributeMultipleReq;

var deviceObjectAttributeList=[];
deviceObjectAttributeList.push(new gateway.DeviceObjectAttributeList_t);
deviceObjectAttributeList[0].protocolId=0;
deviceObjectAttributeList[0].address=2;
deviceObjectAttributeList[0].objectList.push(new gateway.ObjectAttributeList_t);
deviceObjectAttributeList[0].objectList[0].objectType=5;
deviceObjectAttributeList[0].objectList[0].objectId=2;
deviceObjectAttributeList[0].objectList[0].attributeList.push(new gateway.AttributeList_t);
deviceObjectAttributeList[0].objectList[0].attributeList[0].attributeType=gateway.AttributeType_t.ATTRIBUTE_PRESENT_VALUE;
deviceObjectAttributeList[0].objectList[0].attributeList[0].attributeValue=new Buffer([1,0,0,0]);


package.deviceObjectAttributeList=deviceObjectAttributeList;
var time = new Date().getTime();
package.timestamp=time;
var buffer = package.encode().toBuffer();

//解析云平台发过来的数据
IOT.IotGwReqParser(gateway.CmdId_t.GW_WRITE_OBJECT_ATTRIBUTE_MULTIPLE_REQ,buffer);

//设备更新属性
var value=new Buffer([1,0,0,0]);
IOT.x2IotAattribute(0,2,5,2,gateway.AttributeType_t.ATTRIBUTE_PRESENT_VALUE,value);
IOT.IotGwObjectAttributeMultipleInd();//上传属性，有改变就上传，周期调用

var package1;
setTimeout(function () {
    var package = new gateway.GwObjectAttributeMultipleIndRsp;
    package.status = gateway.gwStatus_t.STATUS_SUCCESS;
    console.info(Number(package1.timestamp.toString()));
    package.timestamp = package1.timestamp;
    var buffer = package.encode().toBuffer();
    IOT.IotGwReqParser(gateway.CmdId_t.GW_OBJECT_ATTRIBUTE_MULTIPLE_IND_RSP, buffer);
    //console.info(IOT.IotReadAattribute(0, 2, 5, 2, gateway.AttributeType_t.ATTRIBUTE_PRESENT_VALUE));
},200);*/

var arr = [4031,4033,4035,4055,4057,4061,4071,4073]
var lastValue = "";
var str = "";
var p = ""
if(arr.length == 1){

}
for(var i = 1;i < arr.length ;i++)
{
    if(i > 1 ){
        p = ","
    }
    if(arr[i] - arr[i-1] == 2 )
    {
        if(arr[i-1] == lastValue)
        {
            str += "|" + arr[i];
        }else{
            str += p + arr[i-1] + "|" + arr[i];
        }
    }else{
        str += p + arr[i];
    }
    lastValue = arr[i];
}
console.error(str);
var readArr = str.split(",");

for(var j = 0;j < readArr.length;j++){
    var _readArr = readArr[j].split("|");
    var obj = {};
    obj.data = _readArr[0];
    obj.length = _readArr.length;
    console.dir(obj);
}
