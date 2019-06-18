import React from 'react';
import * as THREE from 'three';
const OrbitControls = require("three-orbit-controls")(THREE);

class GradientAnimation extends React.Component {
  constructor(props){
    super(props);

    this.startTime = Date.now();
    this.canvasHolder = null;
    this.uniforms = {
      colorB: {type: 'vec3', value: new THREE.Color(0xACB6E5)},
      colorA: {type: 'vec3', value: new THREE.Color(0x74ebd5)},
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() }
    };
  };

  componentDidMount() {
    const width = this.canvasHolder.clientWidth;
    const height = this.canvasHolder.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 10000);
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.renderer.setSize(width, height);
    this.canvasHolder.appendChild(this.renderer.domElement);

    this.initializeOrbits();
    this.initializeCamera();
    window.addEventListener( 'resize', this.onWindowResize.bind(this), false );

    // Shape
    this.uniforms.resolution.value.x = window.innerWidth;
    this.uniforms.resolution.value.y = window.innerHeight;

    let geometry = new THREE.PlaneGeometry( 4, 4, 32 );
    let material =  new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      fragmentShader: this.props.frag,
      vertexShader: this.props.vert,
      side: THREE.DoubleSide
    })

    let mesh = new THREE.Mesh(geometry, material)
    this.scene.add(mesh)


    // Lights
    const light = new THREE.AmbientLight( 0x404040 ); // soft white light
    this.scene.add( light );

    const spotLight = new THREE.SpotLight();
    const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    // spotLight.add(spotLightHelper);
    this.scene.add(spotLight);

    // set position of spotLight,
    // and helper must be updated when doing that
    spotLight.position.set(100, 200, 100);
    // spotLightHelper.update();

    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  };

  initializeOrbits = () => {
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
  };

  initializeCamera = () => {
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 4;
  };

  animate = () => {
    const elapsedMilliseconds = Date.now() - this.startTime;
    const elapsedSeconds = elapsedMilliseconds / 1000.;
    this.uniforms.time.value = 60. * elapsedSeconds;

    this.renderer.render(this.scene, this.camera)
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  onWindowResize( event ) {
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.uniforms.resolution.value.x = window.innerWidth;
    this.uniforms.resolution.value.y = window.innerHeight;
  }

  render () {
    return (
      <div className="ui" style={{overflow:'hidden'}}>
        <div
          id="canvasHolder"
          style={{ width: "100vw", height: "100vh" }}
          ref={mount => this.canvasHolder = mount}>
        </div>
      </div>
    )
  };
}

export default GradientAnimation;
