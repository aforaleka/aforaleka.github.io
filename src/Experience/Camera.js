import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera {
    constructor(experience) {
        this.experience = experience
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this._setInstance()
        this._setControls()
    }

    _setInstance() {
        this.instance = new THREE.PerspectiveCamera(50, this.sizes.width / this.sizes.height, 0.01, 40)
        this.instance.position.set(0, 0, 6)
        this.instance.lookAt(new THREE.Vector3())
        this.scene.add(this.instance)
    }

    _setControls() {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.minDistance = 3
        this.controls.maxDistance = 12
        this.controls.maxAzimuthAngle = Math.PI * 0.1
        this.controls.minAzimuthAngle = - Math.PI * 0.1
        this.controls.maxPolarAngle = Math.PI * 0.55
        this.controls.minPolarAngle = Math.PI * 0.45
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update() {
        this.controls.update()
    }
}