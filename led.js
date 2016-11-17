/**
 * Created by Administrator on 2016/7/4.
 */

/*exports.led_write =function (x,state){

}

exports.led_read =function (x){

}

exports.led_toggle =function (x){

}*/


var b = require('bonescript');

var leds = ["P8_18","P8_14","P9_25"];

var led_state=[0,0,0];

function Driver(){
    for(var i in leds) {
        b.pinMode(leds[i], b.OUTPUT);
        b.digitalWrite(leds[i], b.HIGH);
    }
}

Driver();

exports.led_write =function (x,state){
    led_state[x]=state;
    if(state){

        b.digitalWrite(leds[x],b.LOW);
    }
    else{
        b.digitalWrite(leds[x],b.HIGH);
    }
}

exports.led_read =function (x){
    return  led_state[x];
}

exports.led_toggle =function (x){
    led_state[x] = (led_state[x] == 0) ? 1 : 0;
    if(led_state[x]){

        b.digitalWrite(leds[x],b.LOW);
    }
    else{
        b.digitalWrite(leds[x],b.HIGH);
    }
}

