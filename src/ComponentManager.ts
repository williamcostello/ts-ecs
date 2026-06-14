import { Entity } from "@/EntityManager";

export type ComponentCtor<T = any> = new (...args: any[]) => T;
export type Component = object;

export class ComponentManager {
  private components: Map<ComponentCtor, Map<Entity, unknown>> = new Map();

  public addComponent<T extends Component>(entity: Entity, component: T): void {
    const componentType = component.constructor as ComponentCtor<T>;

    if (!this.components.has(componentType)) {
      this.components.set(componentType, new Map());
    }

    const componentMap = this.components.get(componentType)!;

    if (componentMap.has(entity)) {
      throw new Error(
        `Entity ${entity} already has component ${componentType}`,
      );
    }

    componentMap.set(entity, component);
  }

  public getComponent<T>(
    entity: Entity,
    componentType: ComponentCtor<T>,
  ): T | undefined {
    return this.components.get(componentType)?.get(entity) as T;
  }

  public getEntitiesWithComponent<T>(
    componentType: ComponentCtor<T>,
  ): IterableIterator<Entity> {
    return this.components.get(componentType)?.keys() ?? [][Symbol.iterator]();
  }

  public hasComponent<T>(
    entity: Entity,
    componentType: ComponentCtor<T>,
  ): boolean {
    return this.components.get(componentType)?.has(entity) ?? false;
  }

  public removeComponent<T>(
    entity: Entity,
    componentType: ComponentCtor<T>,
  ): void {
    this.components.get(componentType)?.delete(entity);
  }

  public removeAllComponentsForEntity(entity: Entity): void {
    for (const componentMap of this.components.values()) {
      componentMap.delete(entity);
    }
  }
}
