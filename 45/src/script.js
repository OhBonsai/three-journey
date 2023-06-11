import * as THREE from 'three'
const size = {
    width: 800,
    height: 600,
}

const scene = new THREE.Scene()
const group = new THREE.Group(
)
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: "red"}),
)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: "blue"}),
)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: "yellow"}),
)

cube1.position.x = -2
cube3.position.x = 2;

group.add(cube1)
group.add(cube2)
group.add(cube3)

group.scale.y = 2;;
group.rotation.set(0, Math.PI * 2 , 0 )

const camera = new THREE.PerspectiveCamera(75, size.width/size.height)
scene.add(camera)
camera.position.z = 5;







const renderer = new THREE.WebGL1Renderer({
    canvas: document.getElementById("webgl")
})


renderer.setSize(size.width, size.height)
renderer.render(scene, camera)