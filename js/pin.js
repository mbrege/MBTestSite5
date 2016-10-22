var container = document.getElementById('container1');
var camera, scene, renderer;
var mouseX = 0, mouseY = 0;
//operates the mouse
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
init();
animate();
function init() {
	camera = new THREE.PerspectiveCamera( 100, 200/200, 1, 10000 );
	camera.position.z = 2100;

  // scene
	scene = new THREE.Scene();
	var ambient = new THREE.AmbientLight( 0xffffff );
	scene.add( ambient );
	var directionalLight = new THREE.DirectionalLight( 0xf9f6d6, 0.9  );
	directionalLight.position.set( 0, 0, 10 );
	// directionalLight.castShadow = true;
	scene.add( directionalLight );
	// texture
	var manager = new THREE.LoadingManager();
	manager.onProgress = function ( item, loaded, total ) {
		console.log( item, loaded, total );
	};

	var texture = new THREE.TextureLoader().load( "gold.png" );
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set( 1, 1 );
	var shinyMaterial = new THREE.MeshStandardMaterial({
		"color": 0xAFA9A1,
		"roughness": 0.02,
		"metalness": 0.2,
		"emissive": 1,
		"reflectivity": 100,
		"map": texture,
		"transparency": false,
		"opacity": 1
		//"envMap": src="gold.jpg",
		//"envMap": cubeCamera.renderTarget,

	});



	var onProgress = function ( xhr ) {
		if ( xhr.lengthComputable ) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( Math.round(percentComplete, 2) + '% downloaded' );
		}
	};

	var onError = function ( xhr ) {
		console.log(xhr);
	};

	var loader = new THREE.ImageLoader( manager );
	loader.load( 'gold.png', function ( image ) {
		texture.image = image;
		texture.needsUpdate = true;
	} );

	// model
	var loader = new THREE.OBJLoader( manager );

	loader.load('pin.obj', function(object){
		object.traverse(function(child){
			if ( child instanceof THREE.Mesh ) {
				child.material = shinyMaterial;
			}
		});
		object.position.y = -20;
		scene.add( object );
	}, onProgress, onError );


  //
	renderer = new THREE.WebGLRenderer({alpha:true});
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( 200, 200 );
	container1.appendChild( renderer.domElement );
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
	camera.position.x += ( mouseX - camera.position.x ) * 0.09;
	camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
	camera.lookAt( scene.position );
	renderer.render( scene, camera );
}
