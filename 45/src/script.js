import * as THREE from 'three'
import {gsap} from "gsap";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

const size = {
    width: window.innerWidth,
    height: window.innerHeight,
}

const scene = new THREE.Scene()

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: "green"}),
)

const camera = new THREE.PerspectiveCamera(75, size.width/size.height)
scene.add(camera)
camera.position.z = 5;

scene.add(cube2)
var target = document.getElementById("webgl");
const renderer = new THREE.WebGL1Renderer({
    canvas: target
})

const cursor = {
    x: 0,
    y: 0,
}

window.addEventListener("mousemove", (event)=>{
    cursor.x = event.clientX / size.width - 0.5
    cursor.y = event.clientY / size.height - 0.5
})

const control = new OrbitControls(camera, target);
// control.enableDamping = true;
// control.enabled = false
renderer.setSize(size.width, size.height)
const vars1 ={
    x: 3,
    duration: 3,
    delay: 0.5,
    // repeat: 1,
    ease: "power2.inOut",
}
// gsap.to(cube2.position, vars1)

function tick() {
//
//     camera.position.x = Math.sin(cursor.x) * 5;
//     camera.position.z = Math.cos(cursor.x)
//     camera.position.y = - cursor.y * 5
//     camera.lookAt(cube2.position)
    requestAnimationFrame(tick)
    control.update()
renderer.render(scene, camera)
}


window.addEventListener('resize', ()=>{
    console.log('window hase been resized')
    size.width = window.innerWidth
    size.height = window.innerHeight

    renderer.setSize(size.width, size.height)
    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})


window.addEventListener('dblclick', ()=>{
    if (!document.fullscreenElement) {
        target.requestFullscreen()
        console.log('go')
    } else {
        console.log('leave')
        document.exitFullscreen()
    }
})

tick()



