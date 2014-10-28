/**
 * Загружает асинхронно ресурсы.
 * После загрузки выполняет переданную в метод load функцию.
 */

var Resources = function() {
	this.texturesUrls = [];   // Ссылки на изображения
	this.modelsUrls   = [];   // Ссылки на модельки

	this.textures = {};       // Загруженные текстуры
	this.models   = {};       // Загруженные из моделей объекты

	var loadedCount = 0;      // Количество загруженных ресурсов. Если станет равно количеству объявленных, то запустится callback

	var scope = this;
	var callback = function() {}; // Функция, которая должна выполниться после загрузки ресурсов

	// Добавляет текстуру в список загружаемых
	this.addTexture = function(url) {
		scope.texturesUrls.push(url);
	};

	// Добавляет модель в список загружаемых
	this.addModel = function(url) {
		scope.modelsUrls.push(url);
	};

	// Загружает добавленные в массивы для загрузок элементы.
	// После выполнения запускает функцию callback.
	this.load = function(cb) {
		if(cb) {
			callback = cb;	
		}

		var resourcesCount = scope.texturesUrls.length + scope.modelsUrls.length;

		if(resourcesCount === 0) {
			callback();
			return;
		}

		for(var i = 0; i < scope.texturesUrls.length; i++) {
			loadTexture(scope.texturesUrls[i]);
		}

		for(var i = 0; i < scope.modelsUrls.length; i++) {
			loadModel(scope.modelsUrls[i]);
		}
	};

	// Загружает текстуру и пытается запустить callback
	function loadTexture(url) {
		var name = createName(url);
		scope.textures[name] = THREE.ImageUtils.loadTexture(url, undefined, runCallback);
	}

	// Загружает модель и пытается запустить callback
	function loadModel(url) {
		var name = createName(url);

		var loader = new THREE.JSONLoader(true);
		loader.load(url, function(geometry, materials) {
			var material = new THREE.MeshFaceMaterial(materials);
			for(var i = 0; i < materials.length; i++)
			{
				materials[i].alphaTest = 0.5;
				materials[i].side = THREE.DoubleSide;
				//materials[i].map.anisotropy = 16;
			}
			var model = new THREE.Mesh(geometry, material);
            model.scale.set(0.1, 0.1, 0.1);
            scope.models[name] = model;

            runCallback();
        });
	}

	// Возвращает имя файла без пути и расширения
	// Типа как андроид именует ресурсы)))
	// По этим именам потом можно будет обращаться в хэше загруженных ресурсов
	function createName(url) {
		return url.match(/([^\\/]+)\.([^\\/]+)$/)[1];
	}

	// Проверяет, если загружены все ресурсы, то запусить callback
	function runCallback() {
		loadedCount++;

		var resourcesCount = scope.texturesUrls.length + scope.modelsUrls.length;

		if(loadedCount == resourcesCount) {
			callback();
		}
	}
};