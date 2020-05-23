import * as THREE from "three";

// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';
import body from './modules/body.js';
import rules from './modules/rules.js';
import introElements from './modules/intro.js';
import game from './modules/game.js';
import prizes from './modules/prizes.js';


// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
body();
rules();

game.init();
prizes.init();
const fullPageScroll = new FullPageScroll();
fullPageScroll.init();
introElements.forEach((element) => element.init());


function lightsTask() {
  const initialWidth = window.innerWidth;
  const initialHeight = window.innerHeight;

  const canvas = document.querySelector(`#lessonCanvas`);
  const renderer = new THREE.WebGLRenderer({canvas});
  renderer.setClearColor(0x000000, 0);

  const params = {
    fov: 35,
    aspect: initialWidth / initialHeight,
    near: 0.1,
    far: 750
  };
  const camera = new THREE.PerspectiveCamera(params.fov, params.aspect, params.near, params.far);
  camera.position.z = 750;

  const scene = new THREE.Scene();

  const prepareLight = () => {
    const cameraPosition = camera.position.z;

    const light = new THREE.Group();

    const directionaLight = new THREE.DirectionalLight(new THREE.Color(`rgb(255,255,255)`), 0.84);

    const directionalY = Math.pow(Math.abs(Math.pow(Math.pow(Math.pow(2, 3 / 2) / (Math.pow(3, 1 / 2) + cameraPosition), 2) - cameraPosition, 2) - cameraPosition), 1 / 2);
    directionaLight.position.set(0, directionalY, cameraPosition);

    light.add(directionaLight);

    const pointLight1 = new THREE.PointLight(new THREE.Color(`rgb(246,242,255)`), 0.6, 975, 2);
    pointLight1.position.set(785, 350, 710);

    light.add(pointLight1);

    const pointLight2 = new THREE.PointLight(new THREE.Color(`rgb(245,254,255)`), 0.95, 975, 2);
    pointLight1.position.set(730, 800, 985);

    light.add(pointLight2);

    return light;
  };

  scene.add(prepareLight());

  const radius = 100;
  const widthSegments = 30;
  const heightSegments = 20;
  const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

  const material = new THREE.MeshPhongMaterial({color: 0x44aa88});

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  const resizeRenderer = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const needResize = canvas.width !== width || canvas.height !== height;

    if (needResize) {
      renderer.setSize(width, height, false);
    }

    return needResize;
  };

  function render() {
    if (resizeRenderer()) {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

lightsTask();
