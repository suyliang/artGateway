//var gindex = require("./gatewayIndex.js");

var exec = require('child_process').exec;
//var exec = require('child_process').exec;


update();

function update() 
{
    exec('git pull',function (error, stdout, stderr) 
    {
            console.log('index-stdout: ' + stdout);
            console.log('index-stderr: ' + stderr);
            if (error !== null) {
                console.log('index-exec error: ' + error);
                //iotDevice.gwCheckGatewayUpdataRsp(0,false)
            }
            else
            {
                if(stdout != "Already up-to-date")
                {
                    
                }
            }
        });
        
}