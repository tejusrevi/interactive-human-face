import * as THREE from 'three';
import React from 'react';
import { ObjectLoader} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {OBJLoader2} from 'three/examples/jsm/loaders/OBJLoader2'
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(50,1,0.01,1000);
camera.position.x = 5;
scene.add(camera);
var renderer = new THREE.WebGLRenderer();
var ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);
renderer.setClearColor('rgb(19,28,36)');
renderer.setSize(window.innerWidth, window.innerHeight);

var controls = new OrbitControls( camera, renderer.domElement );

var loader = new OBJLoader2();
loader.addMaterials(new THREE.MeshBasicMaterial())
loader.load(
	// resource URL
	'models/head.obj',
	// called when resource is loaded
	function ( object ) {
        object.traverse( function ( child ) {

            if ( child.isMesh ) {
        
                var wireframeGeomtry = new THREE.WireframeGeometry( child.geometry );
                var wireframeMaterial = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
                var wireframe = new THREE.LineSegments( wireframeGeomtry, wireframeMaterial );
                child.add(wireframe);
        
            }
            
        } );
        //var material = new THREE.MeshBasicMaterial();
        //var mesh = new THREE.Mesh( object, material );
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

function update(){
    renderer.render(scene,camera);
        requestAnimationFrame(update)
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