
/**
 * User: syl
 * Time: 16-3-10 10:04
 */



var net = require('net');
//var HeadBodyBuffers = require('./uint/head_body_buffers').HeadBodyBuffers;

/*function packetLength(data) {
    return data.readUInt32BE(0);
}*/
//连接网关的客户端
var yun_server = net.createServer(
    function(connection) { //'connection' listener
    console.log('yunService:new socket connected ');
    //connection.setTimeout(2*60*1000);
    //connection.setNoDelay(true);
    /*var hdb = new HeadBodyBuffers(4, packetLength);
    hdb.on('packet', function (packet) {
        var head = packet.slice(0, 4);
        var body = packet.slice(4);
        console.logs("from client:body:", body.toString(), body.length);
        connection.write(packet);
    });*/

    connection.on('end', function() {
        console.log('socket '+ connection +" closed ");
    });

    connection.on('data',function(data){
        //hdb.addBuffer(data);
        if(data.length >= 4){
            connection.write(data);
        }else{
            //console.logs('收到心跳包：');
            console.log(data);
        }
    });

    connection.on('timeout',function(){
        connection.end();
    })

    connection.on('error',function(error){
        console.error(error);
        connection.end();
    })
});
yun_server.listen(11000, function() {
    console.log('server start');
});

yun_server.on('error',function(error){
    console.error(error);
})


/*//连接网关的客户端
var gateway_server = net.createServer(
    function(connection) { //'connection' listener
        console.logs('gatewayService:new socket connected ');
        //connection.setTimeout(2*60*1000);
        //connection.setNoDelay(true);
        /!*var hdb = new HeadBodyBuffers(4, packetLength);
        hdb.on('packet', function (packet) {
            var head = packet.slice(0, 4);
            var body = packet.slice(4);
            console.logs("from client:body:", body.toString(), body.length);
            connection.write(packet);
        });*!/

        connection.on('end', function() {
            console.logs('socket '+ connection +" closed ");
        });

        connection.on('data',function(data){
            connection.write(data);
            //connection.write(packet);
            //hdb.addBuffer(data);
        });

        connection.on('timeout',function(){
            connection.end();
        })

        connection.on('error',function(error){
            console.error(error);
            connection.end();
        })
    });
gateway_server.listen(11001, function() {
    console.logs('server start');
});

gateway_server.on('error',function(error){
    console.error(error);
})*/


//module.exports = connectGateway;