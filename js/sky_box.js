var SkyBox = function(resources) {
    var tex1 = resources.textures.grimmnight_rt;
	var tex2 = resources.textures.grimmnight_lf;
	var tex3 = resources.textures.grimmnight_up;
	var tex4 = resources.textures.grimmnight_dn;
	var tex5 = resources.textures.grimmnight_bk;
	var tex6 = resources.textures.grimmnight_ft;

	var skyBox = new THREE.Mesh(new THREE.BoxGeometry(6, 6, 6, 7, 7, 7),
								new THREE.MeshFaceMaterial([
										new THREE.MeshBasicMaterial({map: tex1, overdraw: true}),
										new THREE.MeshBasicMaterial({map: tex2, overdraw: true}),
										new THREE.MeshBasicMaterial({map: tex3, overdraw: true}),
										new THREE.MeshBasicMaterial({map: tex4, overdraw: true}),
										new THREE.MeshBasicMaterial({map: tex5, overdraw: true}),
										new THREE.MeshBasicMaterial({map: tex6, overdraw: true})
									]));

	skyBox.scale.x = - 1;
	skyBox.rotation.y = 3.14 / 2 + 3.14;
	
	this.getObject = function() {
		return skyBox;
	};

	this.update = function(position) {
		skyBox.position.x = position.x;
		skyBox.position.y = position.y;
		skyBox.position.z = position.z;
	};
};