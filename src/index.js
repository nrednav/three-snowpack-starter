import * as THREE from 'three';

// Config
const sizes = {
  width: 800,
  height: 600,
};

// Canvas & Renderer
const canvas = document.querySelector('#webgl');
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);

// Scene
const scene = new THREE.Scene();

// Lighting
const light = new THREE.DirectionalLight('#ffffff');
light.position.set(0, 5, 5);
scene.add(light);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: 'red' });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Render
const render = () => {
  requestAnimationFrame(render);

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;

  renderer.render(scene, camera);
};

requestAnimationFrame(render);
