var process = require('child_process');

var sp=process.spawn('./zone');




sp.stdout.on('data',function(data){
    console.log(data);
});


sp.stdout.on('exit',function(code,signal){
    console.log(code);
    process.exit();
});
