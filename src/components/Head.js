import * as THREE from 'three';
import React from 'react';
import * as dat from 'dat.gui';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {OBJLoader2} from 'three/examples/jsm/loaders/OBJLoader2'
var scene = new THREE.Scene();
var head;

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
var ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);
renderer.setClearColor('rgb(19,28,36)');
renderer.setSize(window.innerWidth, window.innerHeight);

//var controls = new OrbitControls( camera, renderer.domElement );

var loader = new OBJLoader2();

var headMaterial = new THREE.MeshBasicMaterial({
    color: 0x1a588d,
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
                num ++;
                if(num%2 == 0) child.material = headMaterial;  
            }   
        } );
        //var material = new THREE.MeshBasicMaterial();
        //var mesh = new THREE.Mesh( object, material );
        object.name = 'head';
        head = object;
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
folder.add(camera.position,'x',0,2);
folder.add(camera.position,'y',0,2);
folder.add(camera.position,'z',0,4);

function update(){
    //controls.update();

    if (!(head == undefined)){
        head.rotation.y = head.rotation.y + 0.01;
        console.log(head.rotation.y)
    }
    renderer.render(scene, camera);
    requestAnimationFrame(update);
}
document.getElementById('webgl').appendChild(renderer.domElement)
const Head = (props) => {
    return(
        <div>
            {update()}
            Hi
        </div>
    )
}

export default Head;