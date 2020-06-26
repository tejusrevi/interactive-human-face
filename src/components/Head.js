import * as THREE from 'three';
import React from 'react';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {lookAt} from './lookAt'

var scene = new THREE.Scene();
var light;
var ambientLight;
var camera;
var renderer;
var controls;
var loader;

function getLights(){
    light = new THREE.PointLight(0x131c25,5,10,0);
    light.position.z = 4;
    light.name = 'pointLight';
    scene.add(light)
    ambientLight = new THREE.AmbientLight(0xb3c1ff,1);
    scene.add(ambientLight);
}

function getCamera(){
    camera = new THREE.PerspectiveCamera(
        45, 
        window.innerWidth / window.innerHeight,
        0.1, 
        1000 
    );
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 2;
    scene.add(camera);
}

function getRenderer(){
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor('rgb(19,28,36)');
    //controls = new OrbitControls( camera, renderer.domElement );
}

function loadModel(){
    loader = new GLTFLoader();

    var headMaterial = new THREE.MeshPhongMaterial({
        color: 0x2a3c4f,
        wireframe: true,
        skinning: true
    });
    loader.load(
        'models/head.gltf',
        function ( object ) {
            object.scene.traverse( function ( child ) {
                if ( child.isMesh ) {
                    child.material = headMaterial;
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.geometry.center()
                }  
            } );
            scene.add(object.scene)
        },
        function ( xhr ) {
        },
        function ( error ) {
            console.log( error);
        }
    );
}

var trueonce = true;

function update(){
    //controls.update();
    if (!(scene.getObjectByName('jaw') == undefined)){
        console.log(scene.getObjectByName('jaw').rotation.z)
        console.log(scene.getObjectByName('head').rotation.z)
        if(scene.getObjectByName('Sam') != undefined && trueonce){
            //folder.add(scene.getObjectByName('jaw').position,'y',0,1.8);
            //folder.add(scene.getObjectByName('mouthL').position,'x',0.5,1.5);
            //folder.add(scene.getObjectByName('mouthR').position,'x',0.5,1.5);

            folder.add(scene.getObjectByName('head').rotation,'z',-1,2);
            folder.add(scene.getObjectByName('jaw').rotation,'z',0,2);

            trueonce =false;
        }
        
    }
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setPixelRatio( window.devicePixelRatio + 0.5 );
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    renderer.render(scene, camera);
    requestAnimationFrame(update);
}
var folder;
function init(){
    getLights();
    getCamera();
    getRenderer();
    loadModel();
    document.getElementById('webgl').appendChild(renderer.domElement);
    lookAt(scene);

    const datGui  = new dat.GUI({ autoPlace: true });
    folder = datGui.addFolder(`Cube`);
    folder.add(light.position,'x',-10,10);
    folder.add(light.position,'y',-10,10);
    folder.add(light.position,'z',-10,10);
    folder.add(light,'intensity',0.1,10);

    //folder.add(camera.position,'x',-5,5);
    //folder.add(camera.position,'y',-10,10);
    //folder.add(camera.position,'z',-10,10);
    update();
}
const Head = (props) => {
    return(
        <div>
            {init()}
        </div>
    )
}

export default Head;