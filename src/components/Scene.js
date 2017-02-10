import * as THREE from 'three';

/**
 * Class for the global Scene.
 */
export default class Scene {
  constructor(width, height) {
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

    this.camera.translateZ(90);

    this.light = new THREE.AmbientLight( 0xFFFFFF );
    this.light.position.set(0, 0, 100);
    this.scene.add(this.light);

    document.getElementById('three-container').appendChild(this.renderer.domElement);
  }

  add(element) {
    this.scene.add(element);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}