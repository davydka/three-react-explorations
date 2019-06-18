import React from 'react';
import * as THREE from 'three';
const OrbitControls = require("three-orbit-controls")(THREE);

class App extends React.Component {
  constructor(props){
    super(props);

    this.canvasHolder = null;
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

    // Shape
    // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const geometry = new THREE.SphereGeometry( 1, 16, 16 );
    const material = new THREE.MeshLambertMaterial({
      color: 0xFF00FF,
      emissive: 0x2a2a2a,
      emissiveIntensity: .55,
      polygonOffset: true,
      polygonOffsetFactor: 1, // positive value pushes polygon further away
      polygonOffsetUnits: 1
    });
    this.shape = new THREE.Mesh( geometry, material );
    this.shape.rotation.y = 0.5;
    this.scene.add( this.shape );
    // wireframe
    const geo = new THREE.WireframeGeometry( this.shape.geometry ); // or WireframeGeometry
    const mat = new THREE.LineBasicMaterial( { color: 0x00ffff, linewidth: 1 } );
    const wireframe = new THREE.LineSegments( geo, mat );
    this.shape.add( wireframe );

    /**/
    this.shape.geometry.vertices.map( vertex => {
      vertex.x = vertex.x + Math.random();
      // console.log(vertex);
    });
    this.shape.geometry.verticesNeedUpdate = true;
    /**/

    // Lights
    const light = new THREE.AmbientLight( 0x404040 ); // soft white light
    this.scene.add( light );

    const spotLight = new THREE.SpotLight();
    const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    spotLight.add(spotLightHelper);
    this.scene.add(spotLight);

    // set position of spotLight,
    // and helper must be updated when doing that
    spotLight.position.set(100, 200, 100);
    spotLightHelper.update();

    if (!this.frameId) {
      // window.TweenMax.ticker.fps(60);
      // window.TweenMax.ticker.addEventListener('tick', this.animate);
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
    /**/
    this.shape.geometry.vertices.map( vertex => {
      vertex.x = vertex.x + Math.random();
      if( vertex.x < 0.2) {
        vertex.x = vertex.x + 0.8;
      }
      if( vertex.x > 1.2) {
        vertex.x = vertex.x - 0.8;
      }
      // console.log(vertex);
    });
    this.shape.geometry.verticesNeedUpdate = true;
    /**/

    this.renderer.render(this.scene, this.camera)
    this.frameId = window.requestAnimationFrame(this.animate);
  };

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

export default App;
