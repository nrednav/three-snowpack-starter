import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Config
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Canvas & Renderer
const canvas = document.querySelector('#webgl');
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Handle window resizing
window.addEventListener('resize', () => {
  // Update dimensions
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Scene
const scene = new THREE.Scene();

// Lighting
const light = new THREE.DirectionalLight('#ffffff');
light.position.set(0, 5, 5);
scene.add(light);

const ambientLight = new THREE.AmbientLight('#ffffff', 0.25);
scene.add(ambientLight);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.set(0, 0, 3);
scene.add(camera);

// Orbit Controls
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: 'skyblue' });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Render & Animation
const clock = new THREE.Clock();
const render = () => {
  requestAnimationFrame(render);

  // Animation logic
  const elapsedTime = clock.getElapsedTime();
  mesh.rotation.y = elapsedTime;

  orbitControls.update();
  renderer.render(scene, camera);
};

requestAnimationFrame(render);
