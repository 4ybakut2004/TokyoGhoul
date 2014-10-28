var Mirror_room = createRoom({
	init: function(self, resources) {
		initFloor();
		self.skyBox = new SkyBox(resources);

		function initFloor() {
			var geometry = new THREE.BoxGeometry(10, 10, 0.0005);
			self.mirrorCubeCamera = new THREE.CubeCamera( 0.001, 10, 1024 );
			var material = new THREE.MeshBasicMaterial( { envMap: self.mirrorCubeCamera.renderTarget } );
			var floor = new THREE.Mesh( geometry, material );
			floor.position.y = -0.2;
			floor.rotation.x = 3.14 / 2;
			self.mirrorCubeCamera.position = floor.position;
			self.floor = floor;
		}
	},

	addObjects: function(self, object) {
		object.add(self.mirrorCubeCamera);
		object.add(self.floor);
		object.add(self.skyBox.getObject());
	},

	setCollisionObjects: function(self, floorObjects) {
		floorObjects.push(self.floor);
	},

	update: function(self, renderer, scene){
		self.floor.visible = false;
		self.mirrorCubeCamera.updateCubeMap( renderer, scene );
		self.floor.visible = true;
	}
});