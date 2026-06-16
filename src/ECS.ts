import { type Component, type ComponentCtor, ComponentManager } from "./ComponentManager";
import { type Entity, EntityManager } from "./EntityManager";
import { type EventCtor, EventManager } from "./EventManager";
import { type System, SystemManager } from "./SystemManager";

export class ECS {
  private entityManager: EntityManager = new EntityManager();
  private componentManager: ComponentManager = new ComponentManager();
  private systemManager: SystemManager = new SystemManager();
  private eventManager: EventManager = new EventManager();

  public createEntity(): Entity {
    return this.entityManager.createEntity();
  }

  public deleteEntity(entity: Entity): void {
    this.entityManager.deleteEntity(entity);
    this.componentManager.removeAllComponentsForEntity(entity);
  }

  public hasEntity(entity: Entity): boolean {
    return this.entityManager.hasEntity(entity);
  }

  public addComponent<T extends Component>(entity: Entity, component: T): void {
    this.componentManager.addComponent(entity, component);
  }

  public getComponent<T>(
    entity: Entity,
    componentType: ComponentCtor<T>,
  ): T | undefined {
    return this.componentManager.getComponent(entity, componentType);
  }

  public getEntitiesWithComponent<T>(
    componentType: ComponentCtor<T>,
  ): IterableIterator<Entity> {
    return this.componentManager.getEntitiesWithComponent(componentType);
  }

  public hasComponent<T>(
    entity: Entity,
    componentType: ComponentCtor<T>,
  ): boolean {
    return this.componentManager.hasComponent(entity, componentType);
  }

  public removeComponent<T>(
    entity: Entity,
    componentType: ComponentCtor<T>,
  ): void {
    this.componentManager.removeComponent(entity, componentType);
  }

  public removeAllComponentsForEntity(entity: Entity): void {
    this.componentManager.removeAllComponentsForEntity(entity);
  }

  public addEvent<T extends object>(entity: Entity, event: T): void {
    this.eventManager.addEvent(entity, event);
  }

  public getEvents<T>(entity: Entity, ctor: EventCtor<T>): T[] {
    return this.eventManager.getEvents(entity, ctor);
  }

  public getEntitiesWithEvent<T>(ctor: EventCtor<T>): IterableIterator<Entity> {
    return this.eventManager.getEntitiesWithEvent(ctor);
  }

  public addSystem(system: System): void {
    this.systemManager.addSystem(system);
  }

  public updateSystems(dt: number): void {
    this.systemManager.update(this, dt);
    this.eventManager.flush();
  }
}
