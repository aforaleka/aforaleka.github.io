import * as THREE from 'three'
import EventEmitter from './EventEmitter.js'

export default class Time extends EventEmitter {
    constructor(experience) {
        super()
        this.experience = experience

        // Setup
        this.stats = this.experience.stats
        this.clock = new THREE.Clock()
        this.elapsedTime = 0

        window.requestAnimationFrame(() => {
            this.tick()
        })
    }

    tick() {
        this.stats && this.stats.begin()
        this.elapsedTime = this.clock.getElapsedTime()

        this.trigger('tick')

        window.requestAnimationFrame(() => {
            this.tick()
        })
        this.stats && this.stats.end()
    }
}