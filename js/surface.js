/**
*	@min - ������ �������
*	@max - ������� �������
*	@return - ���������� ��������� ����� �� ���������
*/
var getRandomInt = function(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

var surface;												// ������ ������ Surface	

/**
 * ������ ������. ������� ������ ThreeJS � ������ ����������.
 * � ��� ���������� �������� DOM �������� ��� ���������,
 * �������� �������� ����, ���������� �� ��������� � ����������.
 */
var Surface = function()
{
	var scene, camera, renderer;							// �����, ������ � ������
	var controls;											// ������ ���������� �������
	var prevTime;                                           // ���������� �����
	var resources;                                          // �������
	
	var room;												// ������� �������
	var enable_room;										// ��������� �� ������������ �������
	loadResources();

	/**
	*	��������� ������� � ��������� �� � ������� resources
	*   �� ��������� �������� ��������� ������ init(); � animate();
	*/
	function loadResources() {
		resources = new Resources();
		
		// �������� ��� ����
		resources.addTexture('image/floor_torture_room.jpg');

		// �������� ��� ���������
		resources.addTexture('image/sky_box/grimmnight_rt.jpg');
		resources.addTexture('image/sky_box/grimmnight_lf.jpg');
		resources.addTexture('image/sky_box/grimmnight_up.jpg');
		resources.addTexture('image/sky_box/grimmnight_dn.jpg');
		resources.addTexture('image/sky_box/grimmnight_bk.jpg');
		resources.addTexture('image/sky_box/grimmnight_ft.jpg');
		
		resources.load(function() {
			init();
			animate();
		});
	}

	/**
	*	������������� ������ � ����
	*/
	function init() {
		initControls();
		initRenderer();
		initWorldObjects();
		initScene();

		addEventListeners();

		prevTime = performance.now();
	}

	/**
	*	���������� � ����� ��� ��������� � ��������� ����
	*/
	function animate() {
		requestAnimationFrame( animate );

		// � ���������� delta �������� �����, �� ������� ����������� ������� update
		var time = performance.now();
		var delta = ( time - prevTime ) / 1000;

		// ������� ������� �� ����������, ��������� �� delta
		update(delta);

		prevTime = time;

		if(enable_room) room.update(renderer, scene);
		
		renderer.render( scene, camera );
	}

	/**
	*	������������� �����, ��� ������� � ������� � �����������
	*/
	function initControls() {
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 7);

		controls = new THREE.OverviewControls(camera);  // ������� ������ ���������� �������
	}

	/**
	*	������������� ���������
	*/
	function initRenderer() {
		renderer = new THREE.WebGLRenderer({'antialias':true});

		// ����������� ��������
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.shadowMapEnabled = true;
		renderer.shadowMapSoft = true;
		renderer.gammaInput = true;
		renderer.gammaOutput = true;
		renderer.physicallyBasedShading = true;
		renderer.shadowMapCullFace = THREE.CullFaceBack;

		// ��������� DOM ������� �� ��������, � ������� ����� ����������� ���������
		$(document.body).prepend(renderer.domElement);
	}

	/**
	*	��� �������������� ������� ����
	*/
	function initWorldObjects() {
		room = new Mirror_room(resources);
		enable_room = true;
	}

	this.reInitWorld = function(number_room){
		enable_room = false;
		scene.remove(room.getObject());
		
		switch(number_room){
			case '1':
				room = new Mirror_room(resources);	
			break;
			case '2':
				room = new Torture_room(resources);
			break;
		}
		scene.add(room.getObject());
		enable_room = true;
	};
	
	/**
	*	������� ����� � ���������� � ��� ���, ��� �����
	*/
	function initScene() {
		scene = new THREE.Scene();

		scene.add(controls.getObject()); // ��������� ������ � �����
		scene.add(room.getObject());	
	}

	/**
	*	��� ������� ���, ��� ������� �� ������� ���������� ����� (delta)
	*/
	function update(delta) {
		controls.update(delta);
		controls.collision(room.getFloorObjects());
	}

	function addEventListeners() {
		window.addEventListener( 'resize', onWindowResize, false );
	}

	// ����������� ������ � ����������� �� ������� ��������
	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );
	}
};

$(document).ready(function(){
	surface = new Surface();
});

function controlPage($scope){
	$scope.room = 0;
	$scope.change = function(){
		surface.reInitWorld($scope.room);
	};
}