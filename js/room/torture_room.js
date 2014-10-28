var Torture_room = function(resources){
	var object = new THREE.Object3D();
	
	var floor;							// пол
	var skyBox;							// скай
	
	var texture, material, geometry;
	
	init();
	
	function init(){
		initFloor();
		object.add(floor)
	}
	
	function initFloor() {
		texture = resources.textures.floor_torture_room;
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(10, 10);
		texture.anisotropy = 16;
		
		material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
		geometry = new THREE.PlaneGeometry(10, 10);
		
		floor = new THREE.Mesh(geometry, material);
		floor.rotation.x = 3.14 / 2;
		floor.position.y = -0.2;
	}
	
	this.update = function(renderer, scene){
		
	};
	
	this.getObject = function() {
		return object;
	};
}