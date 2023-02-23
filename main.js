import './style.css';

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#app'),
});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);
camera.position.setX(-3);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
    color: 0xFF6347, 
    // wireframe: true,
});
const torus = new THREE.Mesh(geometry, material);
torus.position.z = -20;

const pointLight =  new THREE.PointLight(0xffffff);
pointLight.position.set(10,10,10);
const ambienLight = new THREE.AmbientLight(0xffffff);

scene.add(torus, pointLight, ambienLight);

const lightHelper = new THREE.PointLightHelper(pointLight);

// scene.add(lightHelper);

const gridHelper = new THREE.GridHelper(200, 50);

// scene.add(gridHelper);

// const controls = new OrbitControls(camera, renderer.domElement);


const addStars = ()=>{
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({color: 0xffffff});
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);

    scene.add(star);
}

Array(200).fill().forEach(addStars);

const spaceTexture = new THREE.TextureLoader().load('./public/space_bg.jpeg');
scene.background = spaceTexture;

const moonTexture = new THREE.TextureLoader().load('./public/moon.jpeg');
const moonNormalTexture = new THREE.TextureLoader().load('./public/normal.jpeg');

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: moonNormalTexture,
    }),
);

scene.add(moon);
moon.position.z = 0;
moon.position.setX(-10);

console.log(camera.position)
const moveCamera = ()=>{
    const t = document.body.getBoundingClientRect().top;
  
    camera.position.z = t * -0.1;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.001;

    // moon.position.z = t * 0.1;
}
moveCamera();
document.body.onscroll = moveCamera;

const animate = ()=>{
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    torus.rotation.z += 0.01;

    moon.rotation.x += 0.01;
    moon.rotation.y += 0.01;
    moon.rotation.z += 0.01;

    // controls.update();
    renderer.render(scene, camera);
}
animate();