export type Entity = number

export class EntityManager {
    private nextId = 0
    private entities = new Set<Entity>()
    private reusableIds: Entity[] = []

    private getNextId(): number {
        return this.reusableIds.length > 0
            ? this.reusableIds.pop()!
            : this.nextId++
    }

    addEntity(): Entity {
        const entity = this.getNextId()
        this.entities.add(entity)
        return entity
    }

    deleteEntity(entity: Entity): void {
        if (this.entities.delete(entity)) {
            this.reusableIds.push(entity)
        }
    }

    hasEntity(entity: Entity): boolean {
        return this.entities.has(entity)
    }
}
