import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import * as lil from 'lil-gui';

let canvas =  document.getElementById('webgl');
let camera, scene, renderer;
let planeMesh, sphereMesh, boxMesh, torusMesh
let material
let control
let ambientLight, pointLight, directionLight, hemisphereLight, rectAreaLight, spotLight
let hemiHelper, pointHelper, directionHelper, rectHelper, spotHelper
let gui = new lil.GUI()


init()
animate()
setDebugger()

function init() {

    camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, .1, 100)
    camera.position.z = 5

    scene = new THREE.Scene()

    renderer = new THREE.WebGLRenderer({antialias: true, canvas: canvas});
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.useLegacyLights = false

    material = new THREE.MeshBasicMaterial({color: 'red', side: THREE.DoubleSide})
    material = new THREE.MeshStandardMaterial({roughness: .4})

    planeMesh = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), material)
    planeMesh.position.y = -1
    planeMesh.rotation.x = -Math.PI * 0.5;

    sphereMesh = new THREE.Mesh(new THREE.SphereGeometry(), material)
    sphereMesh.position.set(-1.5, 1, 0)
    sphereMesh.scale.set(.6, .6, .6)

    boxMesh = new THREE.Mesh(new THREE.BoxGeometry(), material)
    boxMesh.position.set(0, 1, 0)

    torusMesh = new THREE.Mesh(new THREE.TorusGeometry(), material)
    torusMesh.position.set(1.5, 1, 0)
    torusMesh.scale.set(.5, .5, .5)


    ambientLight = new THREE.AmbientLight(0xffffff, .5)
    directionLight = new THREE.DirectionalLight(0x00ff00, .5)
    hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
    pointLight = new THREE.PointLight(0xffffff, .5)
    pointLight.position.set(2,5,0)
    rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1)
    rectAreaLight.lookAt(new THREE.Vector3())
    spotLight = new THREE.SpotLight(0x78ff00, .5, 10, Math.PI * .1, .25, 1)

    hemiHelper = new THREE.HemisphereLightHelper(hemisphereLight, 1)


    scene.add(camera)
    scene.add(planeMesh, boxMesh, torusMesh, sphereMesh)
    scene.add(ambientLight, directionLight, hemisphereLight, pointLight, rectAreaLight, spotLight)
    scene.add(hemiHelper)

    control = new OrbitControls(camera, canvas)
    window.addEventListener('resize', onWindowResize)
}

function animate() {
    requestAnimationFrame(animate)
    control.update()

    boxMesh.rotation.x += 0.005;
    boxMesh.rotation.y += 0.01;

    torusMesh.rotation.x += 0.005;
    torusMesh.rotation.y += 0.01;


    renderer.render(scene, camera)

}


function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}


function setDebugger() {

    const folder = gui.addFolder('Material')
    folder.addColor(material, 'color')
    folder.add(material, 'wireframe')
    folder.add(material, 'side', {
        "front": THREE.FrontSide,
        "back": THREE.BackSide,
        "double": THREE.DoubleSide,
    })
    folder.add(material, 'metalness').min(0.0).max(1).step(0.01)
    folder.add(material, 'roughness').min(0.2).max(1).step(0.01)


    const lightFolder = gui.addFolder('Light')
    lightFolder.add(ambientLight, 'visible').name('ambientVisible')
    lightFolder.addColor(ambientLight, 'color').name('ambientColor')
    lightFolder.add(ambientLight, 'intensity').name('ambientIntensity').min(.0).max(1).step(0.01)

    lightFolder.add(directionLight, 'visible').name('directVisible')
    lightFolder.addColor(directionLight, 'color').name('directColor')
    lightFolder.add(directionLight, 'intensity').name('directIntensity').min(.0).max(1).step(0.01)

    lightFolder.add(hemisphereLight, 'visible').name('hemVisible')
    lightFolder.addColor(hemisphereLight, 'color').name('skyColor')
    lightFolder.addColor(hemisphereLight, 'groundColor').name('groundColor')
    lightFolder.add(hemisphereLight, 'intensity').name('hemiIntensity').min(.0).max(1).step(0.01)

    lightFolder.add(pointLight, 'visible').name('pointVisible')
    lightFolder.addColor(pointLight, 'color').name('pointColor')
    lightFolder.add(pointLight, 'intensity').name('pointIntensity').min(.0).max(1).step(0.01)
    lightFolder.add(pointLight, 'distance').name('pointDistance').min(3).max(20).step(.1)

    lightFolder.add(rectAreaLight, 'visible').name('reac')
    lightFolder.addColor(rectAreaLight, 'color').name('c')
    lightFolder.add(rectAreaLight, 'intensity').name('i').min(.0).max(1).step(0.01)

    lightFolder.add(spotLight, 'visible').name('spot')
    lightFolder.addColor(spotLight, 'color').name('c')
    lightFolder.add(spotLight, 'intensity').name('i').min(.0).max(1).step(0.01)
}