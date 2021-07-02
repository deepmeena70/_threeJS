import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const canvasThree = document.getElementById("canvas-three");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: false });
renderer.setSize(innerWidth, innerHeight);
canvasThree.appendChild(renderer.domElement);


const geometry = new THREE.CylinderGeometry(5, 5, 80, 20, 10, true);
const material = new THREE.MeshBasicMaterial({ color: 0xffee });
const mesh = new THREE.SkinnedMesh(geometry, material);
const controls = new OrbitControls(camera, renderer.domElement);
scene.add(mesh);

const bone = [];
for (let i = 0; i < 10; i++) {
    bone.push(new THREE.Bone());
}

const position = geometry.attributes.position;
const vertex = new THREE.Vector3();

const skinIndices = [];
const skinWeights = [];
const sizing = {
    segmentHeight: 50,
    halfHeight: 25,

};

for (let i = 0; i < position.count; i++) {

    vertex.fromBufferAttribute(position, i);

    // compute skinIndex and skinWeight based on some configuration data

    const y = (vertex.y + sizing.halfHeight);

    const skinIndex = Math.floor(y / sizing.segmentHeight);
    const skinWeight = (y % sizing.segmentHeight) / sizing.segmentHeight;

    skinIndices.push(skinIndex, skinIndex + 1, 0, 0);
    skinWeights.push(1 - skinWeight, skinWeight, 0, 0);

}

geometry.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(skinIndices, 4));
geometry.setAttribute('skinWeight', new THREE.Float32BufferAttribute(skinWeights, 4));

const skeleton = new THREE.Skeleton(bone);

const rootBone = skeleton.bones[0];
mesh.add(rootBone);
mesh.bind(skeleton);

// skeleton.bones[0].rotation.x = -5;
skeleton.bones[0].rotation.x = 5;



camera.position.set(0, 20, 100);
controls.update();

const animate = function() {
    requestAnimationFrame(animate);

    controls.update();
    renderer.render(scene, camera);
};

animate();