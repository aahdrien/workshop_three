// ------ IMPORTS --------
import * as THREE from 'three';
import * as TOOLS from './utils/tools.class.js';

import Scene from './components/Scene';
import Sphere from './components/Sphere';

// ------ THREEJS --------
const framerateUI = new TOOLS.FrameRateUI();

let lastDate = Date.now(), dt;
let halfClientWidth = window.innerWidth / 2, halfClientHeight = window.innerHeight / 2;

// ------- EVENTS --------
window.addEventListener('resize', onWindowResize, false);

// -------- MAIN ---------
let scene = new Scene(window.innerWidth, window.innerHeight);
let sphere = initSphere(scene, 16, 256, 256, {r: 33, g: 166, b: 173}, {min: -0.5, max: 0.2});
let sphere2 = initSphere(scene, 18, 256, 256, {r: 242, g: 64, b: 58}, {min: 0.2, max: 0.4});
let sphere3 = initSphere(scene, 20, 256, 256, {r: 253, g: 172, b: 18}, {min: 0.4, max: 1.0});

const datGUI = new dat.GUI();
let guiSphereFolder = datGUI.addFolder('Small Sphere');
guiSphereFolder.add(sphere, 'frequency', 0.001, 0.5);
guiSphereFolder.addColor(sphere, 'color');
guiSphereFolder.add(sphere, 'speed', 500, 5000);

let guiSphere2Folder = datGUI.addFolder('Medium Sphere');
guiSphere2Folder.add(sphere2, 'frequency', 0.001, 0.5);
guiSphere2Folder.addColor(sphere2, 'color');
guiSphere2Folder.add(sphere2, 'speed', 500, 5000);

let guiSphere3Folder = datGUI.addFolder('Big Sphere');
guiSphere3Folder.add(sphere3, 'frequency', 0.001, 0.5);
guiSphere3Folder.addColor(sphere3, 'color');
guiSphere3Folder.add(sphere3, 'speed', 500, 5000);


render();

// ------ FUNCTIONS ------
function render() {
  dt = Date.now() - lastDate;
  lastDate = Date.now();

  framerateUI.update();

  sphere.update(dt);
  sphere2.update(dt);
  sphere3.update(dt);
  scene.render();

  requestAnimationFrame(render);
}

function initSphere(scene, radius, width, segmentWidth, segmentHeight, colorBreakValues) {
  let sphere = new Sphere(radius, width, segmentWidth, segmentHeight, colorBreakValues);
  let sphereThreeObject = sphere.getThreeObject();

  scene.add(sphereThreeObject);

  return sphere;
}

// --- EVENTS FUNCTIONS --
function onWindowResize() {
  halfClientWidth = window.innerWidth / 2;
  halfClientHeight = window.innerHeight / 2;

  scene.camera.aspect = window.innerWidth / window.innerHeight;
  scene.camera.updateProjectionMatrix();

  scene.renderer.setSize(window.innerWidth, window.innerHeight);

  progressBar.setNewScreenWidth(window.innerWidth);
}