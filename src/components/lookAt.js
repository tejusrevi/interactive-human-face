import {limits_rotation} from './limits'
var screenX;
var screenY;
var scene;

var trueonce = true;
var baseGamma;
var baseBeta;
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
        alert('Device Orientation API not supported.');
      }
      
      function deviceOrientationHandler (eventData) {
        var gamma = eventData.gamma;
        var beta = eventData.beta;
        var alpha = eventData.alpha;

        if(trueonce && alpha !== 0){
            baseGamma = gamma;
            baseBeta = beta;
            trueonce = false;
        }
        
        if ( gamma !== null & Math.abs(gamma)<45){
            //portrait
            if(alpha !== 0 && (gamma>baseGamma-90 && gamma<baseGamma+90)){
                if (Math.abs((baseGamma-gamma)/90).toFixed(2)<1)
                screenX = ((baseGamma-gamma)/90).toFixed(2)
                if(Math.abs((baseBeta-beta)/90).toFixed(2)<1)
                screenY = -((baseBeta-beta)/90).toFixed(2)
            }
        }
        if(screenX<=1 && screenY<=1 && screenX>=-1 && screenY>=-1){
          moveHead();
        }
      }
      if(screenX<=1 && screenY<=1 && screenX>=-1 && screenY>=-1){
        moveHead();
      }
}

function moveHead(){
    if(scene.getObjectByName('Sam') !== undefined){
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
}
export {lookAt};