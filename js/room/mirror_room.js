var Mirror_room = function(resources){
	var object = new THREE.Object3D();
	
	var floor;							// зеркальный пол
	var mirrorCubeCamera;				// камеры отзеркаливания
	var skyBox;							// скай
	
	var texture, material, geometry;
	
	init();
	
	function init(){
		initFloor();
		
		skyBox = new SkyBox(resources);
		object.add(skyBox.getObject());
	}
	
	function initFloor() {
		geometry = new THREE.BoxGeometry(10, 10, 0.0005);
		mirrorCubeCamera = new THREE.CubeCamera( 0.001, 10, 1024 );
		object.add( mirrorCubeCamera );
		material = new THREE.MeshBasicMaterial( { envMap: mirrorCubeCamera.renderTarget } );
		floor = new THREE.Mesh( geometry, material );
		floor.position.y = -0.2;
		floor.rotation.x = 3.14 / 2;
		mirrorCubeCamera.position = floor.position;
		object.add(floor);
	}
	
	this.update = function(renderer, scene){
		floor.visible = false;
		mirrorCubeCamera.updateCubeMap( renderer, scene );
		floor.visible = true;
	};
	
	this.getObject = function() {
		return object;
	};
}