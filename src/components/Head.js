import * as THREE from 'three';
import React from 'react';
import * as dat from 'dat.gui';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { render } from '@testing-library/react';
var scene = new THREE.Scene();

var light = new THREE.PointLight(0x131c25,1,10,0);
var head;
scene.add(light)
var camera = new THREE.PerspectiveCamera(
    45, // field of view
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1, // near clipping plane
    1000 // far clipping plane
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);
var renderer = new THREE.WebGLRenderer();
var ambientLight = new THREE.AmbientLight(0xb3c1ff,1);
scene.add(ambientLight);
renderer.setClearColor('rgb(19,28,36)');

//var controls = new OrbitControls( camera, renderer.domElement );

var loader = new GLTFLoader();

var headMaterial = new THREE.MeshPhongMaterial({
    color: 0x2a3c4f,
    wireframe: true,
    skinning: true
});


loader.load(
	// resource URL
	'models/head.gltf',
	// called when resource is loaded
	function ( object ) {
        
        object.scene.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.material = headMaterial;
                child.castShadow = true;
                child.receiveShadow = true;
                child.geometry.center()
            }  
        } );
        console.log(camera)
        head = object.scene.children[3];

		scene.add(object.scene)
	},
	// called when loading is in progresses
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( error);
	}
);
const datGui  = new dat.GUI({ autoPlace: true });
var folder = datGui.addFolder(`Cube`);
folder.add(light.position,'x',-5,5);
folder.add(light.position,'y',-10,10);
folder.add(light.position,'z',-10,10);
folder.add(light,'intensity',0.1,10);

folder.add(camera.position,'x',-5,5);
folder.add(camera.position,'y',-10,10);
folder.add(camera.position,'z',-10,10);
var trueonce = true;

function update(){
    //controls.update();

    if (!(scene.getObjectByName('jaw') == undefined)){
        
        if(scene.getObjectByName('Sam') != undefined && trueonce){
            console.log(scene.getObjectByName('eyetrack'))
            folder.add(scene.getObjectByName('jaw').rotation,'z',1.6,1.8);
            folder.add(scene.getObjectByName('eyetrack').position,'z',0,3);
            trueonce =false;
        }
        //head.rotation.y = head.rotation.y + 0.001;
    }



    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setPixelRatio( window.devicePixelRatio + 0.5 );
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    renderer.render(scene, camera);
    requestAnimationFrame(update);
}
document.getElementById('webgl').appendChild(renderer.domElement)
const Head = (props) => {
    return(
        <div>
            {update()}
        </div>
    )
}

export default Head;