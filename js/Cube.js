class Cube extends THREE.Object3D {

	constructor () {
		super();

		this.rotationValue =  -3 * Math.PI / 4;
		this.scaleValue = 0.2;

		this.size = 150;
		this.transforms = {
			rotation : -3 * Math.PI / 4,
			scale : 0.2
		};
		
		// -- Material
		this.material = new THREE.MeshLambertMaterial({ color : 0x242425 }); 

		// -- Geometry
		this.geometry = new THREE.BoxGeometry( this.size, this.size, this.size );

		//  -- Mesh
		this.mesh = new THREE.Mesh( this.geometry, this.material );
		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;

		this.rotation.y = this.transforms.rotation;

		this.scale.set(this.transforms.scale, this.transforms.scale, this.transforms.scale);

		this.add(this.mesh);

		// this.tl = new TimelineMax();
		// this.tl.to(this.transforms, 2, { rotation : -Math.PI / 4, scale : 1, ease : Sine.easeInOut }, 0);
	}

	update () {
		// this.scale.set(this.transforms.scale, this.transforms.scale, this.transforms.scale);
		// this.rotation.y = this.transforms.rotation;

		this.scale.set(this.scaleValue, this.scaleValue, this.scaleValue);
		this.rotation.y = this.rotationValue;
	}

}

export default Cube;