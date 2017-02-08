import * as THREE from 'three';
var glsl = require('glslify');

/**
 * Class for the the THREE.js morphing Plane.
 */
export default class Sphere {
  constructor(radius, segmentWidth, segmentHeight, rgbColor, colorBreakValues) {
    this.sphereGeometry = new THREE.SphereGeometry(radius, segmentWidth, segmentHeight);

    const phongShader = THREE.ShaderLib['phong'];

    this.uniforms = THREE.UniformsUtils.merge([
      phongShader.uniforms,
      {
        color_rgb: {type: 'vec3', value: new THREE.Vector3(rgbColor.r / 255, rgbColor.g / 255, rgbColor.b / 255)},
        color_break_values: {type: 'vec2', value: new THREE.Vector2(colorBreakValues.min, colorBreakValues.max)},
        u_amplitude: {type: '1f', value: 10},
        u_frequency: {type: '1f', value: 0.04},
        u_time: {type: '1f', value: 0}
      }
    ]);

    this.sphereMaterial = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: glsl.file('../shaders/sphere.vert'),
      fragmentShader: glsl.file('../shaders/sphere.frag'),
      side: THREE.DoubleSide,
      transparent: true,
      lights: true,
      shininess: 50,
      wireframe: false,
    });

    this.sphere = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial);
  }

  update(dt) {
    this.uniforms.u_time.value += dt / 3000;
  }

  getThreeObject() {
    return this.sphere;
  }
}