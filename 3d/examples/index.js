import * as THREE from "../build/three.module.js";
import { OrbitControls } from "./jsm/controls/OrbitControls.js";
import { KMZLoader } from "./jsm/loaders/KMZLoader.js";
import { GLTFLoader } from "./jsm/loaders/GLTFLoader.js";

var camera, scene, renderer;
export default function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x444444);

  var light = new THREE.DirectionalLight(0x999999);
  light.position.set(1, 1.0, 1).normalize();
  scene.add(light);

  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    500
  );

  camera.position.y = 50;
  camera.position.z = 50;
  camera.position.x = -50;
  scene.add(camera);

  var grid = new THREE.GridHelper(50, 50, 0x555555, 0x555555);
  scene.add(grid);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  const page = new URL(window.location.href).searchParams.get("file");
  $.getJSON(`../../data/${page}.json`, (data) => {
    data.magazzino.forEach((element) => {
      const loader2 = new GLTFLoader().setPath("models/gltf/Cilindro/");
      loader2.load(
        `cilindroP${element.isSelected ? "_selected" : ""}.gltf`,
        (gltfEl) => {
          //console.log("qui: ", gltfEl);
          gltfEl.scene.position.x = element.x / 2 - 25.5;
          gltfEl.scene.position.z =
            element.y / 2 !== 0 ? element.y / 2 - 25.5 : 0.5;
          scene.add(gltfEl.scene);
          render();
        }
      );
    });
  });

  const loader = new GLTFLoader().setPath("models/gltf/Muletto/");
  loader.load(`muletto.gltf`, (gltfEl) => {
    //console.log("qui: ", gltfEl);
    gltfEl.scene.position.z = 5;
    gltfEl.scene.position.x = -23;
    scene.add(gltfEl.scene);
    render();
  });

  var controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", render);
  controls.update();

  window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();
}

function render() {
  renderer.render(scene, camera);
}
