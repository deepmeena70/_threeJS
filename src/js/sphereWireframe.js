import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const canvasThree = document.getElementById("canvas-three");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(innerWidth, innerHeight);
if (canvasThree != null || canvasThree != undefined) {

    canvasThree.appendChild(renderer.domElement);
}


const geometry = new THREE.SphereGeometry(40, 12, 12);
const wireframe = new THREE.WireframeGeometry(geometry);
const mesh = new THREE.LineSegments(wireframe);
const controls = new OrbitControls(camera, renderer.domElement);
scene.add(mesh);

camera.position.set(0, 20, 100);
controls.update();

const animate = function() {
    requestAnimationFrame(animate);

    // mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
};

animate();