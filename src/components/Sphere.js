import * as THREE from 'three';
var glsl = require('glslify');

/**
 * Class for the the THREE.js morphing Plane.
 */
export default class Sphere {
  constructor(radius, segmentWidth, segmentHeight, rgbColor, colorBreakValues) {
    this.sphereGeometry = new THREE.SphereGeometry(radius, segmentWidth, segmentHeight);

    const phongShader = THREE.ShaderLib['phong'];

    this.frequency = 0.04;
    this.color = [rgbColor.r, rgbColor.g, rgbColor.b];
    this.speed = 3000;

    this.uniforms = THREE.UniformsUtils.merge([
      phongShader.uniforms,
      {
        color_rgb: {type: 'vec3', value: new THREE.Vector3(this.color[0] / 255, this.color[1] / 255, this.color[2] / 255)},
        color_break_values: {type: 'vec2', value: new THREE.Vector2(colorBreakValues.min, colorBreakValues.max)},
        u_amplitude: {type: '1f', value: 10},
        u_frequency: {type: '1f', value: this.frequency},
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
      wireframe: false,
    });

    this.sphere = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial);
  }

  update(dt) {
    this.uniforms.u_time.value += dt / this.speed;
    this.uniforms.u_frequency.value = this.frequency;
    this.uniforms.color_rgb.value = new THREE.Vector3(this.color[0] / 255, this.color[1] / 255, this.color[2] / 255);
  }

  getThreeObject() {
    return this.sphere;
  }
}