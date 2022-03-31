import * as THREE from 'three'

export default class Environment {
    constructor(experience) {
        this.experience = experience
        this.scene = this.experience.scene
    }
}