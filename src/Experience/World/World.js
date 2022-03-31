import * as THREE from 'three'
import Environment from './Environment.js'
import Sphere from './Sphere.js'

export default class World {
    constructor(experience) {
        this.experience = experience

        // Setup
        this.environment = new Environment(experience)
        this.time = this.experience.time

        this.sphere = new Sphere(experience)
    }

    update() {
        this.sphere && this.sphere.update()
    }
}