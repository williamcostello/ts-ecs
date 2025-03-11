import { ComponentManager } from './Component'
import { EntityManager } from './Entity'
import type { System } from './System'

export class ECS {
    entityManager = new EntityManager()
    componentManager = new ComponentManager()
    private systems: System[] = []

    addSystem(system: System) {
        this.systems.push(system)
    }

    update(dt: number) {
        for (const system of this.systems) {
            system.update(this, dt)
        }
    }
}
