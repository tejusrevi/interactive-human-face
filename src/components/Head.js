import * as THREE from 'three';
import React from 'react';
import * as dat from 'dat.gui';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import { render } from '@testing-library/react';
var scene = new THREE.Scene();

var light = new THREE.PointLight(0x131c25,1,10,0);

scene.add(light)
var camera = new THREE.PerspectiveCamera(
    45, // field of view
    window.innerWidth / window.innerHeight, // aspect ratio
    1, // near clipping plane
    1000 // far clipping plane
);
camera.position.x = 0;
camera.position.y = 0.6;
camera.position.z = 2;
scene.add(camera);
var renderer = new THREE.WebGLRenderer();
var ambientLight = new THREE.AmbientLight(0xb3c1ff,0.5);
scene.add(ambientLight);
renderer.setClearColor('rgb(19,28,36)');

//var controls = new OrbitControls( camera, renderer.domElement );

var loader = new OBJLoader();

var headMaterial = new THREE.MeshPhongMaterial({
    color: 0x2a3c4f,
    wireframe: true
});

var num = 1;
loader.load(
	// resource URL
	'models/head.obj',
	// called when resource is loaded
	function ( object ) {
        object.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.material = headMaterial;
            }   
        } );
        //var material = new THREE.MeshBasicMaterial();
        //var mesh = new THREE.Mesh( object, material );
        object.name = 'head';
		scene.add(object)
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

function update(){
    //controls.update();

    if (!(scene.getObjectByName('head') == undefined)){
        var head = scene.getObjectByName('head');
        head.rotation.y = head.rotation.y + 0.001;
    }

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setPixelRatio( window.devicePixelRatio + 0.5 );
    renderer.setSize(window.innerWidth, window.innerHeight)
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