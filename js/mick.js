var container = document.getElementById('container2'), stats;

var camera, scene, renderer;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


init();
animate();


function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 45, 200 / 200, 1, 1000 );
	camera.position.z = 15;

	// scene

	scene = new THREE.Scene();

	var ambient = new THREE.AmbientLight( 0x444444 );
	scene.add( ambient );

	var directionalLight = new THREE.DirectionalLight( 0xffeedd );
	directionalLight.position.set( 0, 0, 1 ).normalize();
	scene.add( directionalLight );

	// model

	var onProgress = function ( xhr ) {
		if ( xhr.lengthComputable ) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( Math.round(percentComplete, 2) + '% downloaded' );
		}
	};

	var onError = function ( xhr ) { };


	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.load( 'mick2.mtl', function( materials ) {


		materials.preload();

		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials( materials );
		objLoader.load( 'mick2.obj', function ( object ) {
			// object.traverse(function(child){
			// 	if ( child instanceof THREE.Mesh ) {
			// 		child.material = shinyMaterial;
			// 	}
			// });
			object.position.y = - 3;
			// object.rotateX
			scene.add( object );
// NEED TO ADD NORMAL MATERIAL W/ THE MTL MAP. I SHOULD EASILY BE ABLE TO MAKE A CHILD MATERIAL PROPERTY... //
// ALSO NEED TO HAVE THE MODEL ROTATE //

	// mesh = new THREE.Mesh( object, new THREE.MeshNormalMaterial( { overdraw: 0.5 } ) );
	// 		scene.add( mesh );

		}, onProgress, onError );

	});

	//
	renderer = new THREE.WebGLRenderer({alpha:true});
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( 270, 270 );
	container2.appendChild( renderer.domElement );
	window.addEventListener( 'mousemove', onDocumentMouseMove, false );
	window.addEventListener( 'mousemove', onDocumentTouchMove, false );
}

function onDocumentMouseMove( event ) {
	mouseX = event.offsetX - windowHalfX;
	mouseY = event.offsetY - windowHalfY;
}

function onDocumentTouchMove( event ) {
	mouseX = event.offsetX - windowHalfX;
	mouseY = event.offsetY - windowHalfY;

}
//
function animate() {
	requestAnimationFrame( animate );
	render();
}
function render() {
	renderer.render( scene, camera );
}
