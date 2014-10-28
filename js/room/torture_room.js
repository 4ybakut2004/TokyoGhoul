var Torture_room = createRoom({
	init: function(self, resources) {
		initFloor();

		function initFloor() {
			var texture = resources.textures.floor_torture_room;
			texture.wrapS = THREE.RepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set(10, 10);
			texture.anisotropy = 16;

			var material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
			var geometry = new THREE.PlaneGeometry(10, 10);
			
			var floor = new THREE.Mesh(geometry, material);
			floor.rotation.x = 3.14 / 2;
			floor.position.y = -0.2;

			self.floor = floor;
		}
	},

	addObjects: function(self, object) {
		object.add(self.floor);
	},

	setCollisionObjects: function(self, floorObjects) {
		floorObjects.push(self.floor);
	}
});