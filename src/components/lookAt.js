import * as THREE from 'three';
import {limits_transformation,limits_rotation} from './limits'
var screenX;
var screenY;
var scene;

function processCoords(coord){
    if (1-coord<0) return -Math.pow((1-coord),2);
    return Math.pow((1-coord),2);
}
function findScreenCoords(mouseEvent){
    var xpos;
    var ypos;
    if (mouseEvent){
      //FireFox
      xpos = mouseEvent.screenX;
      ypos = mouseEvent.screenY;
    }
    else{
      //IE
      xpos = window.event.screenX;
      ypos = window.event.screenY;
    }
    document.getElementById("screenCoords").innerHTML = xpos + ", " + ypos;
    screenX = -processCoords(xpos/(window.innerWidth/2)).toFixed(2);
    screenY = processCoords(ypos/(window.outerHeight/2)).toFixed(2);
    document.getElementById("screenPercent").innerHTML = screenX + ", " + screenY;

    moveHead()
}

function moveHead(){
    if(scene.getObjectByName('Sam') != undefined){
        //Model motion
        var jaw = scene.getObjectByName('jaw');
        var head = scene.getObjectByName('head');
        //vertical
        jaw.rotation.y = (limits_rotation.jaw[1].horizontal[1]*screenX);
        head.rotation.y = (limits_rotation.head[1].horizontal[1]*screenX);

        //horizontalscene.getObjectByName('jaw');

        jaw.rotation.z = 1.5983987668302173 - (limits_rotation.jaw[0].vertical[1]-limits_rotation.jaw[0].vertical[0])*screenY;
        head.rotation.z = 0.12424596820316035 + (limits_rotation.head[0].vertical[1]-limits_rotation.head[0].vertical[0])*screenY;

        //Light Motion
        var light = scene.getObjectByName('pointLight');
        light.position.y = 10*screenX;
        light.position.x = 10*screenY;
    }
}
function lookAt(scn){
    scene = scn;
    document.onmousemove = findScreenCoords;
    console.log(window.innerWidth/2)
    console.log(window.outerHeight/2)
}
export {lookAt};