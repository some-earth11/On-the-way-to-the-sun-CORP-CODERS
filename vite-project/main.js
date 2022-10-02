import './style.css'
import * as THREE from 'three'

import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';
import {
  GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader';

// document.querySelector('#app').innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `

//scene
const scene = new THREE.Scene();
const id = document.getElementById("dist");
setInterval(() => {
  if (id.textContent > 0) {
    (id.textContent) -= 323
  }
}, 100)

//camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


//render
const render = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),

});


//render controls
render.setPixelRatio(window.devicePixelRatio);
render.setSize(window.innerWidth, window.innerHeight);

//camera position
camera.position.setX(10);
camera.position.setY(0);
camera.position.setZ(720);



//render the scene and camera
render.render(scene, camera);


//torus geometry
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0x454377
});
const torus = new THREE.Mesh(geometry, material);



// var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
// hemiLight.color.setHSV( 0.6, 0.75, 0.5 );
// hemiLight.groundColor.setHSV( 0.095, 0.5, 0.5 );
// hemiLight.position.set( 0, 500, 0 );
// scene.add( hemiLight );

// var dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
// dirLight.position.set( -1, 0.75, 1 );
// dirLight.position.multiplyScalar( 50);
// dirLight.name = "dirlight";
// // dirLight.shadowCameraVisible = true;

// scene.add( dirLight );

// dirLight.castShadow = true;
// dirLight.shadowMapWidth = dirLight.shadowMapHeight = 1024*2;

// var d = 300;

// dirLight.shadowCameraLeft = -d;
// dirLight.shadowCameraRight = d;
// dirLight.shadowCameraTop = d;
// dirLight.shadowCameraBottom = -d;

// dirLight.shadowCameraFar = 3500;
// dirLight.shadowBias = -0.0001;
// dirLight.shadowDarkness = 0.35;



//add torus to scene
// scene.add(torus)

// hemiLight = new THREE.HemisphereLight( 0x0000ff, 0x00ff00, 0.6 ); 
// scene.add(hemiLight);
//point light
const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(0, 10, 200);


//ambinet light
const ambientLight = new THREE.AmbientLight(0x404040);


//add light to scene
scene.add(pointLight, ambientLight);


//controls
const controls = new OrbitControls(camera, render.domElement);

//lighHelper
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 100);
// scene.add(lightHelper,gridHelper);


//add star
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshStandardMaterial({
    color: 0x808080
  });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(1000));

  star.position.set(x, y, z);


  //star position animate
  function animate() {
    requestAnimationFrame(animate);
    star.position.x += 0.005;
    star.position.y += 0.005;
    star.position.z += 0.005;
    // render.render(scene, camera);
    // controls.update();
  }

  scene.add(star);

  animate();

}

let animateBlender = new GLTFLoader();

let animateMesh;
animateBlender.load('./New folder/unit.gltf', (gltf) => {
  animateMesh = gltf.scene;
  animateMesh.position.set(0, 0, 700)
  scene.add(animateMesh);
})


const myInterval = setInterval(() => {
  // console.log()
  let dans = animateMesh.position.z
  let dans1 = camera.position.z;
  camera.position.set(10, 10, dans1 -= 0.15)
  animateMesh.position.set(0, 0, dans -= 0.15)
  // animateMesh.rotation.set(0,0,animateMesh.position.X-=1)
  let rans = animateMesh.rotation.z
  // console.log(rans)
  animateMesh.rotation.z -= 0.003

  if (animateMesh.position.z === 0) {
    console.log("Stop")
    // clearInterval(0)
  }

  // return
}, 10)






setInterval(makeStars(), 10);

function makeStars() {
  Array(1600).fill().forEach(addStar);
}


//space texture
const spaceTexture = new THREE.TextureLoader().load('star.jpg');
//set background
scene.background = spaceTexture;


//make a new texture
const aryanTexture = new THREE.TextureLoader().load('aryan.png');
//map the material in a box as a mesh
const aryan = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({
    map: aryanTexture,
  }),
);

// scene.add(aryan);


//sun texture
const sunTexture = new THREE.TextureLoader().load('sun.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');
//map sun texture to a mesh
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(30, 300, 300),
  new THREE.MeshBasicMaterial({
    map: sunTexture,
    normalMap: normalTexture,
  })
)

scene.add(sun);

//position of sun
// sun.position.z = 30;
// sun.position.setX(-10);


// move the camera
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  sun.rotation.x += 0.05;
  sun.rotation.y += 0.075;
  sun.rotation.z += 0.05;

  aryan.rotation.y += 0.05
  aryan.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * 0.0004;
}

//move the camera on scrolling
// document.body.onscroll = moveCamera


// render.render(scene, camera);
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  // aryan.rotation.x += 0.001;
  aryan.rotation.y += 0.005;
  // aryan.rotation.z += 0.001;

  sun.rotation.x += 0.0009;
  sun.rotation.y += 0.0009;
  sun.rotation.z += 0.0009;
  sun
  render.render(scene, camera);
  controls.update();
}

animate();