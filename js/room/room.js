function createRoom(params) {
	var room = function(resources) {
		var object = new THREE.Object3D();
		var floorObjects = [];
		var self = this;

		var updateFunction = params.update || function() {};
		var initFunction = params.init || function() {};
		var setCollisionObjectsFunction = params.setCollisionObjects || function() {};
		var addObjectsFunction = params.addObjects || function() {};

		init();
		addObjects();
		setCollisionObjects();

		function init() {
			initFunction(self, resources);
		}

		function addObjects() {
			addObjectsFunction(self, object);
		}

		function setCollisionObjects() {
			setCollisionObjectsFunction(self, floorObjects);
		}

		this.update = function(renderer, scene) {
			updateFunction(self, renderer, scene);
		};
		
		this.getObject = function() {
			return object;
		};

		this.getFloorObjects = function() {
			return floorObjects;
		};
	};

	return room;
}

