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
      xpos = mouseEvent.clientX;
      ypos = mouseEvent.clientY;
    }
    else{
      //IE
      xpos = window.event.clientX;
      ypos = window.event.clientY;
    }
    screenX = -processCoords(xpos/(window.innerWidth/2)).toFixed(2);
    screenY = processCoords(ypos/(window.innerHeight/2)).toFixed(2);
    

    if ('DeviceOrientationEvent' in window) {
        window.addEventListener('deviceorientation', deviceOrientationHandler, false);
      } else {
        document.getElementById('logoContainer').innerText = 'Device Orientation API not supported.';
      }
      
      function deviceOrientationHandler (eventData) {
        var gamma = eventData.gamma;
        var beta = eventData.beta;
        var alpha = eventData.alpha;

        
        if ( gamma != null & Math.abs(gamma)<45){
            document.getElementById("alpha").innerHTML = alpha.toFixed(2)//+"-"+beta.toFixed(2)+"-"+gamma.toFixed(2)
            //portrait
            document.getElementById("screenPercent").innerHTML = "portrait"
            //if((alpha>-90 && alpha<90) && (beta>0 && beta<180)){
                screenY = -processCoords((Math.abs(90+alpha)/4)/22.5).toFixed(2);
                //screenY = -processCoords((beta/4)/22.5).toFixed(2);
            //}
            
            
            
            

        }
        else if (gamma != null & gamma>=45){
            //landscape-r
            document.getElementById("screenPercent").innerHTML = "landscape-r";
            if((alpha>-90 && alpha<90) && (beta>0 && beta<180)){
                screenY = -processCoords((Math.abs(90+alpha)/4)/22.5).toFixed(2);
                screenX = -processCoords((beta/4)/22.5).toFixed(2);
            }
            
        }
        else if (gamma != null & gamma<=-45){
            document.getElementById("screenPercent").innerHTML = "landscape-l";
            if((alpha>-90 && alpha<90) && (beta>0 && beta<180)){
                screenY = -processCoords((Math.abs(90+alpha)/4)/22.5).toFixed(2);
                screenX = -processCoords((beta/4)/22.5).toFixed(2);
            }
            
        }
        moveHead()
        document.getElementById("screenCoords").innerHTML = screenX + ", " + screenY;
        
      }
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
        light.position.y = 2*screenX;
        light.position.x = 2*screenY;
    }
}
function lookAt(scn){
    scene = scn;
    document.onmousemove = findScreenCoords;
    console.log(window.innerWidth/2)
    console.log(window.outerHeight/2)
}
export {lookAt};