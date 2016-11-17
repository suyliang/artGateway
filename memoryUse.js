/**
 * Created by Administrator on 2016/5/16.
 */
var logger = require('./uint/myLog4js').myLog4js;
var self ;
function memoryUse(){
    self = this;
    /*this.total = [];
     for (var j = 0;j < 15;j++)
     {
     this.showMem();
     this.total.push(this.useMem());
     };*/
    this.showMem();
    setInterval(function(){
        self.showMem();
    },120000);
}
memoryUse.prototype.showMem = function()
{
    var mem = process.memoryUsage();
    var format = function(bytes)
    {
        return (bytes/1024/1024).toFixed(2)+'MB';
    };
    //logger.writeDebug('Process: heapTotal '+format(mem.heapTotal) + ' heapUsed ' + format(mem.heapUsed) + ' rss ' + format(mem.rss));
    //返回值包括heapTotal代表已申请到的堆内存，heapUsed当前使用的内存，rss(resident set size)进程的常驻内存。
    //console.info('Process: heapTotal '+format(mem.heapTotal) + ' heapUsed ' + format(mem.heapUsed) + ' rss ' + format(mem.rss));
};

/*memoryUse.prototype.useMem = function () {
 var size = 20*1024*1024;
 var arr = new Array(size);
 for (var i=0;i<size;i++) {
 arr[i] = 0;
 }
 return arr;
 };*/
module.exports = memoryUse;