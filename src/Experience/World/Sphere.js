import * as THREE from 'three'
import Plasma from '../Plasma.js'
import { vertex, fragment } from '.././Shaders/sphere.glsl.js'

export default class Sphere {
    constructor(experience) {
        this.experience = experience

        this.isDarkMode = this.experience.isDarkMode
        this.scene = this.experience.scene
        this.sizes = this.experience.sizes
        this.time = this.experience.time
        this.mouse = this.experience.mouse
        this.camera = this.experience.camera

        this.beta = 2.;

        this._setGeometry()
        this._setTexture()
        this._setMaterial()
        this._setMesh()
    }

    _setGeometry() {
        const sphereSize = this.sizes.width <= 768 ? 1 : 2
        this.geometry = new THREE.SphereGeometry(sphereSize, 720, 720)
    }

    _setTexture() {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.length = 256
        this.canvas.width = this.length * 2
        this.canvas.height = this.length

        this.plasma = new Plasma(this.ctx, this.length)
        this.texture = new THREE.CanvasTexture(this.canvas)
    }

    _setMaterial() {
        this.material = new THREE.ShaderMaterial({
            side: THREE.FrontSide,
            uniforms: {
                uTime: { type: 'f', value: 0 },
                uMouse: { type: 'f', value: 0 },
                uTexture: { type: 't', value: this.texture },
                uBrightness: { type: 'f', value: this.isDarkMode ? 0.6 : 0.5 }
            },
            vertexShader: vertex,
            fragmentShader: fragment,
            wireframe: true,
        })
    }

    _setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.meshV = new THREE.Vector3()
        this.meshP = new THREE.Vector3(0, 0, -30)
        this.mesh.position.copy(this.meshP);
        this.scene.add(this.mesh)
    }

    update() {
        const time = this.time.elapsedTime

        this.texture.needsUpdate = true; // important
        this.plasma.update(time)

        // animate sphere towards camera
        this.meshV.subVectors(new THREE.Vector3(), this.meshP).multiplyScalar(0.05)
        this.meshP.add(this.meshV)
        this.mesh.position.copy(this.meshP)
        this.mesh.rotation.y = - Math.PI * 2

        this.beta -= (this.beta - this.mouse.speed) * 0.006
        this.mouse.speed *= 0.98;

        this.material.uniforms.uTime.value = time;
        this.material.uniforms.uMouse.value = Math.max(this.beta, 0.06)

        // face mouse
        const target = new THREE.Vector3()
        target.x += (this.mouse.mouse.x - target.x)
        target.y += (this.mouse.mouse.y - target.y)
        target.z = this.camera.instance.position.z
        this.mesh.lookAt(target)
    }
}