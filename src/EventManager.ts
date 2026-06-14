import type { Entity } from "./EntityManager";

export type EventCtor<T = any> = new (...args: any[]) => T;

export class EventManager {
  private events: Map<EventCtor, Map<Entity, unknown[]>> = new Map();

  public addEvent<T extends object>(entity: Entity, event: T): void {
    const ctor = event.constructor as EventCtor<T>;

    if (!this.events.has(ctor)) {
      this.events.set(ctor, new Map());
    }

    const entityMap = this.events.get(ctor)!;

    if (!entityMap.has(entity)) {
      entityMap.set(entity, []);
    }

    entityMap.get(entity)!.push(event);
  }

  public getEvents<T>(entity: Entity, ctor: EventCtor<T>): T[] {
    return (this.events.get(ctor)?.get(entity) as T[]) ?? [];
  }

  public getEntitiesWithEvent<T>(ctor: EventCtor<T>): IterableIterator<Entity> {
    return this.events.get(ctor)?.keys() ?? [][Symbol.iterator]();
  }

  public flush(): void {
    this.events.clear();
  }
}
