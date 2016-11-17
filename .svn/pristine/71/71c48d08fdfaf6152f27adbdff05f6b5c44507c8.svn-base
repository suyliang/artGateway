/**
 * Created by Administrator on 2016/3/15.
 */
//这些枚举对应 ClusterID
//智能开关 - 81 -----6-0
global.DEVICE_TYPE1 =  0x0051;
//261 触摸面板
global.DEVICE_TYPE2 =  0x0105;
//258彩色灯
global.DEVICE_TYPE3 =  0x0102;
//12气象站
global.DEVICE_TYPE4 =  0x000C;

//257双色led灯
global.DEVICE_TYPE5 =  0x0101;

//0 单色灯
global.DEVICE_TYPE6 =  0x0000;

//83电表
global.DEVICE_TYPE7 =  0x0053;

//514窗帘
global.DEVICE_TYPE8 =  0x0202;

//256路灯
global.DEVICE_TYPE9 =  0x0100;

//773压力器
global.DEVICE_TYPE10 =  0x0305;

//774震动传感器
global.DEVICE_TYPE11 =  0x0306;

//dido,aiao模块 6
global.DEVICE_TYPE12 =  0x0006;

//770温度传感器
global.DEVICE_TYPE13 =  0x0302;
//8 中继器
global.DEVICE_TYPE14 =  0x0008;



//这些枚举对应 ClusterID-----------------------------------------------------------------------------------------------
//=====================================================================================================================

//智能开关 - 81 -----6-0
global.DEVICE_CID0 =  0;
//开关状态
global.DEVICE_CID6 =  6;
//亮度
global.DEVICE_CID8 =  8;
//颜色
global.DEVICE_CID300 =  0x0300;
//红外线传感器---------------------------------------
//环境 温度 - 0
global.DEVICE_CID402 =  0x0402;
//环境 湿度
global.DEVICE_CID405 =  0x0405;
//环境 亮度
global.DEVICE_CID400 =  0x0400;
//环境 压力 pm2.5
global.DEVICE_CID403 =  0x0403;

//窗帘位置
global.DEVICE_CID102 =  0x0102;
//还有一条开关状态 用的是：clusterId6；
//------------------------------------------

//电表
global.DEVICE_CIDB04 =  0x0B04;
//电表的7个属性值  768,1285,2309,2565,1288,2312,2568
//频率：#define ATTRID_ELECTRICAL_MEASUREMENT_AC_FREQUENCY                                0x0300  // O, R, UINT16
//A相电压：#define ATTRID_ELECTRICAL_MEASUREMENT_RMS_VOLTAGE                              0x0505  // O, R, UINT16
//B相电压：#define ATTRID_ELECTRICAL_MEASUREMENT_RMS_VOLTAGE_PH_B                         0x0905  // O, R, UINT16
//C相电压：#define ATTRID_ELECTRICAL_MEASUREMENT_RMS_VOLTAGE_PH_C                         0x0A05  // O, R, UINT16
//A相电流：#define ATTRID_ELECTRICAL_MEASUREMENT_RMS_CURRENT                              0x0508  // O, R, UINT16
//B相电流：#define ATTRID_ELECTRICAL_MEASUREMENT_RMS_CURRENT_PH_B                         0x0908  // O, R, UINT16
//C相电流：#define ATTRID_ELECTRICAL_MEASUREMENT_RMS_CURRENT_PH_C                         0x0A08  // O, R, UINT16

//频率：#define ATTRID_ELECTRICAL_MEASUREMENT_ACTIVE_POWER                                0x050B  // O, R, UINT16
//A相电压：#define ATTRID_ELECTRICAL_MEASUREMENT_ACTIVE_POWER_PH_B                        0x090B  // O, R, UINT16
//B相电压：#define ATTRID_ELECTRICAL_MEASUREMENT_ACTIVE_POWER_PH_C                        0x0A0B  // O, R, UINT16
//C相电压：#define ATTRID_ELECTRICAL_MEASUREMENT_REACTIVE_POWER                           0x050E  // O, R, UINT16
//A相电流：#define ATTRID_ELECTRICAL_MEASUREMENT_REACTIVE_POWER_PH_B                      0x090E  // O, R, UINT16
//B相电流：#define ATTRID_ELECTRICAL_MEASUREMENT_REACTIVE_POWER_PH_C                      0x0A0E  // O, R, UINT16
//C相电流：#define ATTRID_ELECTRICAL_MEASUREMENT_APPARENT_POWER                           0x050F  // O, R, UINT16

//频率：#define ATTRID_ELECTRICAL_MEASUREMENT_APPARENT_POWER_PH_B                         0x090F  // O, R, UINT16
//A相电压：#define ATTRID_ELECTRICAL_MEASUREMENT_POWER_FACTOR                             0x0510  // O, R, UINT16
//B相电压：#define ATTRID_ELECTRICAL_MEASUREMENT_POWER_FACTOR_PH_B                        0x0910  // O, R, UINT16
//C相电压：#define ATTRID_ELECTRICAL_MEASUREMENT_POWER_FACTOR_PH_C                        0x0A10  // O, R, UINT16
//A相电流：#define ATTRID_ELECTRICAL_MEASUREMENT_TOTAL_ACTIVE_POWER                       0x0304  // O, R, UINT16
//B相电流：#define ATTRID_ELECTRICAL_MEASUREMENT_TOTAL_REACTIVE_POWER                     0x0305  // O, R, UINT16
//C相电流：#define ATTRID_ELECTRICAL_MEASUREMENT_TOTAL_APPARENT_POWER                     0x0306  // O, R, UINT16

//震动传感器
global.DEVICE_CID404 =  0x0404;


//I/0模块的输入 Ai = 12
global.DEVICE_CID_AI =  0x000C;

//I/0模块的输出 A0 = 13
global.DEVICE_CID_AO =  0x000D;

//I/0模块的输入 di = 15
global.DEVICE_CID_DI =  0x000F;

//I/0模块的输出 d0 = 16
global.DEVICE_CID_DO =  0x0010;




global.DEVICE_AIAO_CIDS =  [0x000C,0x000D];
global.DEVICE_DIDO_CIDS =  [0x000F,0x0010];
global.DEVICE_AIDI_CIDS =  [0x000C,0x000F];

exports.getNameByDriverId = function(type,clusterIds){
    var name = "设备：" + type;
    if(type == global.DEVICE_TYPE1)
    {
        name = "智能开关";
    }
    else if(type == global.DEVICE_TYPE2)
    {
        name = "触摸面板";
    }
    else if(type == global.DEVICE_TYPE3)
    {
        name = "彩色日光灯";
    }
    else if(type == global.DEVICE_TYPE4)
    {
        name = "传感器";
    }
    else if(type == global.DEVICE_TYPE5)
    {
        name = "双色日光灯";
    }
    else if(type == global.DEVICE_TYPE6)
    {
        name = "单色日光灯";
    }
    else if(type == global.DEVICE_TYPE7)
    {
        name = "电表";
    }
    else if(type == global.DEVICE_TYPE8)
    {
        name = "窗帘";
    }
    else if(type == global.DEVICE_TYPE9)
    {
        name = "路灯";
    }
    else if(type == global.DEVICE_TYPE10)
    {
        name = "压力器";
    }
    else if(type == global.DEVICE_TYPE11)
    {
        name = "震动传感器";
    }
    else if(type == global.DEVICE_TYPE12)
    {
        name = "i/o扩展模块";
        if(clusterIds != null)
        {
            if(clusterIds.indexOf(global.DEVICE_CID_AI) != -1 && clusterIds.indexOf(global.DEVICE_CID_AO) != -1)
            {
                name = "aiao扩展模块";
            }
            else if(clusterIds.indexOf(global.DEVICE_CID_DI) != -1 && clusterIds.indexOf(global.DEVICE_CID_DO) != -1)
            {
                name = "dido扩展模块";
            }
            else if(clusterIds.indexOf(global.DEVICE_CID_AI) != -1 && clusterIds.indexOf(global.DEVICE_CID_DI) != -1)
            {
                name = "aidi扩展模块";
            }
            else if(clusterIds.indexOf(global.DEVICE_CID_AO) != -1 && clusterIds.indexOf(global.DEVICE_CID_DO) != -1){
                name = "aodo扩展模块";
            }
        }
    }
    else if(type == global.DEVICE_TYPE13)
    {
        name = "温度传感器";
    }
    else if(type == global.DEVICE_TYPE14)
    {
        name = "中继器";
    }
    return name;
}
//灯的归类--------

/*exports.getClusterIdByDriverTypes = function(type){
    var clusterIds = [];
    if(type == global.DEVICE_TYPE1)
    {
        //智能开关 81
        clusterIds.push(6);
    }
    else if(type == global.DEVICE_TYPE2)
    {
        //触摸面板 261
        clusterIds = [6];
    }
    else if(type == global.DEVICE_TYPE3)
    {
        //彩色灯 - 258
        clusterIds = [6,8,0x0300];
        //6-开关,8-亮度,0x0300---颜色
    }
    else if(type == global.DEVICE_TYPE4)
    {
        //12传感器
        //6,0x0400-亮度,0x0402-温度,0x0403-pm2.5,0x0405-湿度
        clusterIds = [0x0400,0x0402,0x0405,0x0403];
    }
    else if(type == global.DEVICE_TYPE5)
    {
        //257双色led灯
        //6-开关,8-亮度,0x0300---颜色
        clusterIds = [6,8,0x0300];
    }
    else if(type == global.DEVICE_TYPE6)
    {
        //0 单色灯
        clusterIds = [6];
    }
    else if(type == global.DEVICE_TYPE7)
    {
        //电表数据 83
        clusterIds = [0x0B04];
    }
    else if(type == global.DEVICE_TYPE8)
    {
        //窗帘位置 514
        clusterIds = [0x0102];
    }
    else if(type == global.DEVICE_TYPE9)
    {
        //灯-开关,灯-亮度, 路灯256
        clusterIds = [8];
    }
    else if(type == global.DEVICE_TYPE10)
    {
        //403 压力 环境 pm2.5 //773压力器
        clusterIds = [0x0403];
    }
    else if(type == global.DEVICE_TYPE11)
    {
        //404 震动传感器 774震动传感器
        clusterIds = [0x0404];
    }
    else if(type == global.DEVICE_TYPE12)
    {
        //0x000F-I/0模块的输入 di，0x0010-I/0模块的输出 d0  设备id = 6
        //clusterIds = [0x000F,0x0010];
    }
    return clusterIds;
}

exports.getAttrisByDriverType = function(type){
    var attris = null;
    if(type == global.DEVICE_CID0)
    {
        attris = [0x0010];
    }
    if(type == global.DEVICE_CID6)
    {
        attris = [0];
    }
    else if(type == global.DEVICE_CID8)
    {
        attris = [0];
    }
    else if(type == global.DEVICE_CID300)
    {
        attris = [0];
    }
    else if(type == global.DEVICE_CID402)
    {
        attris = [0];
    }
    else if(type == global.DEVICE_CID403)
    {
        //attris = [0,1,2];
        attris = [0];
    }
    else if(type == global.DEVICE_CID400)
    {
        attris = [0];
    }
    else if(type == global.DEVICE_CID405)
    {
        attris = [0];
    }
    else if(type == global.DEVICE_CIDB04)
    {
        attris = [0x0300,0x0505,0x0905,0x0A05,0x0508,0x0908,0x0A08];
    }
    else if(type == global.DEVICE_CID102)
    {
        attris = [0x0008];
    }
    else if(type == global.DEVICE_CID404)
    {
        attris = [0x0000];
    }
    else if(type == global.DEVICE_CID010)
    {
        attris = [0x0055];
    }
    else if(type == global.DEVICE_CID00F)
    {
        attris = [0x0055];
    }
    return attris;
}*/
//module.exports = enumDeviceTypes;
