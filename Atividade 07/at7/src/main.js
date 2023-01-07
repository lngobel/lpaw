import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { createSkyBox } from './skybox';

window.addEventListener('resize', ()=>{
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}, false)

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()

let aspecto = window.innerWidth / window.innerHeight
const camera = new THREE.PerspectiveCamera(
  75, //campo de visao vertical
  aspecto, //aspecto da imagem (Largura/Altura)
  0.5, //Plano proximo
  100//Plano distante
);

camera.position.z = 12
camera.position.y = 2
camera.position.x = -6
const controls = new OrbitControls(camera, renderer.domElement);

//Luz
var light = new THREE.AmbientLight(0xffffff, 10);
scene.add(light);

//Ponto de Luz
var plight = new THREE.PointLight(0xffffff, 15);
plight.position.set(1, -2, 2);
scene.add(plight);
let model
const modelPath = 'models/Alfredo/'
const objFile = 'alfredo2.obj'
const mtlFile = 'alfredo2.mtl'

const manager = new THREE.LoadingManager();
manager.onProgress = function (item, loaded, total) {
  console.log(item, loaded, total);
};


const mtlLoader = new MTLLoader(manager);
const objLoader = new OBJLoader();

mtlLoader.setPath(modelPath)
  .load(mtlFile, (materials) => {
    materials.preload()
    objLoader.setMaterials(materials)
    objLoader.setPath(modelPath).load(objFile, (object) => {
      object.traverse(child =>child.material = new THREE.MeshStandardMaterial({color: 0x010001 }));
      model = object
      scene.add(model)
      createSkyBox('forest', 100)
        .then(sky=> {
          sky.position.y = 50
          console.log('forest created')
          scene.add(sky)
          animate()
        })
        .catch(error => console.log(error));
    })
  })

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);

  window.addEventListener('mousemove', event => {
    if (!event.buttons) {
      let ww = window.innerWidth
      let mx = event.clientX
      if (model) model.rotation.y += (mx - ww / 2) / ww / 5000
    }
  })
}