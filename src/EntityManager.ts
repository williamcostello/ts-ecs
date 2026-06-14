// An entity is just a numerical identifier
declare const entityBrand: unique symbol;
export type Entity = number & { [entityBrand]: void };

export class EntityManager {
  private nextId: Entity = this.getInitialId();
  private entities: Set<Entity> = new Set();
  private reusableIds: Entity[] = [];

  private getInitialId(): Entity {
    return 0 as Entity;
  }

  private incrementId(): Entity {
    return this.nextId++ as Entity;
  }

  private getNextId(): Entity {
    return this.reusableIds.length > 0
      ? this.reusableIds.pop()!
      : this.incrementId();
  }

  public createEntity(): Entity {
    const entity = this.getNextId();
    this.entities.add(entity);

    return entity;
  }

  public deleteEntity(entity: Entity): void {
    if (this.entities.delete(entity)) {
      this.reusableIds.push(entity);
    }
  }

  public hasEntity(entity: Entity): boolean {
    return this.entities.has(entity);
  }
}
