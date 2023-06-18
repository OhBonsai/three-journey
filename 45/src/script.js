import * as THREE from 'three'
import {gsap} from "gsap";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import imgUrl from '../static/textures/door/color.jpg'
import {color} from "three/nodes";
import * as dat from 'lil-gui';
import math from "dat.gui/src/dat/color/math.js";

const size = {
    width: window.innerWidth,
    height: window.innerHeight,
}

const gui = new dat.GUI()


const scene = new THREE.Scene()

const count = 1000
const positionArray = new Float32Array(count * 3 * 3)
for (let  i=0; i<count*3*3; i++ ){
    positionArray[i] = Math.random()
}

const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager)
const t1 = textureLoader.load("/textures/door/alpha.jpg")
const t2 = textureLoader.load("/textures/door/ambientOcclusion.jpg")
// const t3 = textureLoader.load("/textures/door/color.jpg")
// const t3 = textureLoader.load("/textures/checkerboard-1024.png")
// const t3 = textureLoader.load("/textures/checkerboard-8.png")
const t3 = textureLoader.load("/textures/minecraft.png")
const t4 = textureLoader.load("/textures/door/height.jpg")
const t5 = textureLoader.load("/textures/door/metalness.jpg")
const t6 = textureLoader.load("/textures/door/normal.jpg")


loadingManager.onStart = ()=>{
    console.log("onstart")
}

loadingManager.onLoad = ()=>{
    console.log("onload")
}






// t3.repeat.x = 2
// t3.repeat.x = 3
// t3.wrapS = THREE.RepeatWrapping
// t3.wrapT = THREE.RepeatWrapping
// t3.offset.x = 0.5;
// t3.offset.y = 0.5;

// t3.rotation = Math.PI * .25
// t3.center.x = 0.5
// t3.center.y = 0.5

t3.generateMipmaps = false
t3.minFilter = THREE.NearestFilter
t3.magFilter = THREE.NearestFilter

const geometry = new THREE.SphereGeometry(2, 32, 32)
console.log(geometry.attributes)
const material =  new THREE.MeshBasicMaterial({
    map: t3,
    // wireframe: true,
    // color: "white",
})
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2,2, 4, 4,4),
    // geometry,
   material,
)

cube2.rotation.y = Math.PI  * 0.25;
cube2.rotation.z =  Math.PI  * 0.25;

const camera = new THREE.PerspectiveCamera(75, size.width / size.height)
scene.add(camera)
camera.position.z = 5;

scene.add(cube2)
var canvas = document.querySelector("canvas");
const renderer = new THREE.WebGL1Renderer({
    canvas: canvas
})

const control = new OrbitControls(camera, canvas);
// control.enableDamping = true;
// control.enabled = false
renderer.setSize(size.width, size.height)

function tick() {
    requestAnimationFrame(tick)
    control.update()
    renderer.render(scene, camera)
}


window.addEventListener('resize', () => {
    console.log('window hase been resized')
    size.width = window.innerWidth
    size.height = window.innerHeight

    renderer.setSize(size.width, size.height)
    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})


window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen()
        console.log('go')
    } else {
        console.log('leave')
        document.exitFullscreen()
    }
})

tick()


const parameters = {
    color: 0xff0000,
    spin: ()=>{
        gsap.to(cube2.rotation, {duration: 2, y: cube2.rotation.y + Math.PI})
    }
}


gui.add(cube2.position, 'x').min(-3).max(3).step(0.2).name("你好")
gui.add(cube2, 'visible')
gui.add(material, 'wireframe')
gui.addColor(material, 'color')
gui.add(parameters, "spin")