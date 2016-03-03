import raf from 'raf';
import Cube from './Cube';

class App {

	constructor () {
		this.wW = window.innerWidth;
		this.wH = window.innerHeight;

		// -- Bindings
		this.resize = this.resize.bind(this);
		this.update = this.update.bind(this);

		// -- Events
		window.addEventListener('resize', this.resize);

		this.init();
	}

	init () {
		// -- Scene
		this.scene = new THREE.Scene();

		// -- Renderer
		this.renderer = new THREE.WebGLRenderer({ antialias : true, alpha : true });
		this.renderer.setClearColor(0x000000, 1);
		this.renderer.autoClearColor = true;
		this.renderer.setSize(this.wW, this.wH);
		this.renderer.shadowMap.enabled = true;
		this.container = document.getElementById('root');
		this.canvas = this.renderer.domElement;
		this.container.appendChild( this.canvas );

		// -- Camera
		this.camera = new THREE.PerspectiveCamera(45, this.wW / this.wH, 1, 2000);
		this.camera.position.y = 400;
		this.camera.position.z = 700;

		// -- Lights
		this.light = new THREE.DirectionalLight(0xffffff, 1);
		this.light.position.set(0, 100, 400);
		this.light.castShadow = true;
		this.scene.add(this.light);

		this.pointlight = new THREE.PointLight(0xffffff, 2, 2000);
		this.pointlight.position.set(1000, 1000, 0);
		this.scene.add(this.pointlight);

		this.addCubes();
		this.addGui();
		this.addControls();

		this.update();
	}

	addCubes () {
		this.cube = new Cube();
		this.scene.add(this.cube);

		this.cube2 = new Cube();
		this.cube2.position.x = Math.sqrt(this.cube2.size*this.cube2.size + this.cube2.size*this.cube2.size);
		this.scene.add(this.cube2);

		this.cube3 = new Cube();
		this.cube3.position.x = (Math.sqrt(this.cube3.size*this.cube3.size + this.cube3.size*this.cube3.size)) / 2;
		this.cube3.position.y = -this.cube3.size;
		this.cube3.position.z = (Math.sqrt(this.cube3.size*this.cube3.size + this.cube3.size*this.cube3.size)) / 2;
		this.scene.add(this.cube3);

		this.cubes = [ this.cube, this.cube2, this.cube3 ];

		TweenMax.staggerTo(this.cubes, 2, { scaleValue : 1, rotationValue : -Math.PI/4, ease : Sine.easeInOut }, 0.2);
	}

	addGui () {
		this.gui = new dat.GUI();
		this.gui.add(this.camera.position, 'x', 0, 1000).name('positionX');
		this.gui.add(this.camera.position, 'y', 0, 1000).name('positionY');
		this.gui.add(this.camera.position, 'z', 0, 1000).name('positionZ');
		this.gui.add(this.pointlight.position, 'x', 0, 1000).name('positionX');
		this.gui.add(this.pointlight.position, 'y', 0, 1000).name('positionY');
		this.gui.add(this.pointlight.position, 'z', 0, 1000).name('positionZ');
		this.gui.add(this.camera.rotation, 'x', -2 * Math.PI, 2 * Math.PI).name('rotationX');
		this.gui.add(this.camera.rotation, 'y', -2 * Math.PI, 2 * Math.PI).name('rotationY');
		this.gui.add(this.camera.rotation, 'z', -2 * Math.PI, 2 * Math.PI).name('rotationZ');
	}

	addControls () {
		this.controls = new THREE.TrackballControls( this.camera );
		this.controls.noZoom = true;
		this.controls.noPan = true;
		this.controls.noRoll = true;
		this.controls.noRotate = true;
		this.controls.dynamicDampingFactor = .15;
		this.controls.minDistance = 0;
		this.controls.maxDistance = 1500;
	}

	update () {
		for (var i = 0; i < this.cubes.length; i++) {
			this.cubes[i].update();
		}


		this.controls.update();
		this.renderer.render(this.scene, this.camera);

		raf(this.update);
	}

	resize (){
		this.wW = window.innerWidth;
		this.wH = window.innerHeight;

		this.camera.aspect = this.wW / this.wH;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize(this.wW, this.wH);
	}

}

export default App;