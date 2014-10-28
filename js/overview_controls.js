THREE.OverviewControls = function ( camera ) {

	var scope = this; // Необходимо для доступа к окружению из обработчиков событий

	camera.rotation.set( 0, 0, 0 );

	var pitchObject = new THREE.Object3D();
	pitchObject.add( camera );

	var yawObject = new THREE.Object3D();
	yawObject.position.y = 0;
	yawObject.add( pitchObject );

	var velocity   = new THREE.Vector3(0, 0, 0); 	// Направление скорости
	
	var moveForward  = false;
	var moveBackward = false;
	var moveLeft     = false;
	var moveRight    = false;
	
	// Константы
	var PI_2 = Math.PI / 2;
	var mouseSensitivity = 0.004; 					// Чувствительность мыши
	var speed = 0.005;								// Скорость

	var onMouseMove = function(event) 
	{
		if (scope.enabled === false) return;

		var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		yawObject.rotation.y -= movementX * mouseSensitivity;
		pitchObject.rotation.x -= movementY * mouseSensitivity;

		pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, pitchObject.rotation.x));
	};
	
	var onKeyDown = function(event) 
	{
		switch (event.keyCode) 
		{
			case 38: // up
			case 87: // w
				moveForward = true;
				break;

			case 37: // left
			case 65: // a
				moveLeft = true; break;

			case 40: // down
			case 83: // s
				moveBackward = true;
				break;

			case 39: // right
			case 68: // d
				moveRight = true;
				break;
		}
	};
	
	var onKeyUp = function(event) 
	{
		switch(event.keyCode) 
		{
			case 38: // up
			case 87: // w
				moveForward = false;
				break;

			case 37: // left
			case 65: // a
				moveLeft = false;
				break;

			case 40: // down
			case 83: // a
				moveBackward = false;
				break;

			case 39: // right
			case 68: // d
				moveRight = false;
				break;
				
			case 16: // shift
				isRunning = false;
				break;
		}
	};
	
	this.update = function (delta) {
		var dr = speed * delta;
		
		// Постоянно уменьшаем скорость, чтобы останавливаться
		velocity.x += (-velocity.x) * 0.08 * delta;
		velocity.z += (-velocity.z) * 0.08 * delta;

		// Если жмем кнопки бега, то поддерживаем скорость на одном уровне
		if (moveForward) velocity.z -= dr;
		if (moveBackward) velocity.z += dr;

		if (moveLeft) velocity.x -= dr;
		if (moveRight) velocity.x += dr;
		
		yawObject.translateX(velocity.x); 
		yawObject.translateZ(velocity.z);
	};
	
	document.addEventListener('mousemove', onMouseMove, false);
	document.addEventListener('keyup', onKeyUp, false);
	document.addEventListener('keydown', onKeyDown, false);

	this.getObject = function () {
		return yawObject;
	};
};