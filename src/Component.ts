import { type Entity } from './Entity'

export type Component<T = any> = new (...args: any[]) => T

export class ComponentManager {
    components = new Map<Component, Map<Entity, any>>()

    addComponent<T>(
        entity: Entity,
        componentType: Component<T>,
        component: T
    ): void {
        if (!this.components.has(componentType)) {
            this.components.set(componentType, new Map())
        }

        const componentMap = this.components.get(componentType)!

        if (componentMap.has(entity)) {
            throw new Error(
                `Entity ${entity} already has component ${componentType}`
            )
        }

        componentMap.set(entity, component)
    }

    getComponent<T>(
        entity: Entity,
        componentType: Component<T>
    ): T | undefined {
        return this.components.get(componentType)?.get(entity)
    }

    getEntitiesWithComponent<T>(
        componentType: Component<T>
    ): IterableIterator<Entity> {
        return (
            this.components.get(componentType)?.keys() ?? [][Symbol.iterator]()
        )
    }
}
