import { describe, expect, it } from "vitest";
import { ComponentManager } from "@/ComponentManager";
import { Entity } from "@/EntityManager";

class ComponentA {
  value = 0;
}

class ComponentB {
  value = 0;
}

describe("ComponentManager", () => {
  describe("addComponent", () => {
    it("adds components", () => {
      const manager = new ComponentManager();
      const entity = 0 as Entity;

      manager.addComponent(entity, new ComponentA());
      manager.addComponent(entity, new ComponentB());

      expect(manager.getComponent(entity, ComponentA)).toBeDefined();
      expect(manager.getComponent(entity, ComponentB)).toBeDefined();
    });

    it("throws when adding same component twice", () => {
      const manager = new ComponentManager();
      const entity = 0 as Entity;

      manager.addComponent(entity, new ComponentA());
      expect(() =>
        manager.addComponent(entity, new ComponentA()),
      ).toThrowError();
    });
  });

  describe("getComponent", () => {
    it("gets component", () => {
      const manager = new ComponentManager();
      const entity = 0 as Entity;

      manager.addComponent(entity, new ComponentA());

      const component = manager.getComponent(entity, ComponentA);
      expect(component).toBeDefined();
    });

    it("can get undefined component", () => {
      const manager = new ComponentManager();
      const entity = 0 as Entity;

      const component = manager.getComponent(entity, ComponentA);
      expect(component).toBeUndefined();
    });
  });

  describe("getEntitiesWithComponent", () => {
    it("gets entities with requested component", () => {
      const manager = new ComponentManager();

      const entityA = 0 as Entity;
      manager.addComponent(entityA, new ComponentA());

      const entityB = 1 as Entity;
      manager.addComponent(entityB, new ComponentA());

      const entities = manager.getEntitiesWithComponent(ComponentA);
      expect(entities).toBeDefined();
      expect(entities.next().value).toBe(0);
      expect(entities.next().value).toBe(1);
    });

    it("returns empty iterator when no entities with requested component", () => {
      const manager = new ComponentManager();

      const entities = manager.getEntitiesWithComponent(ComponentA);
      const next = entities.next();

      expect(entities).toBeDefined();
      expect(next.done).toBe(true);
      expect(next.value).toBeUndefined();
    });
  });

  describe("hasComponent", () => {
    it("returns true if entity has component", () => {
      const manager = new ComponentManager();
      const entity = 0 as Entity;

      manager.addComponent(entity, new ComponentA());

      expect(manager.hasComponent(entity, ComponentA)).toBe(true);
    });

    it("returns false if entity does not have component", () => {
      const manager = new ComponentManager();
      const entity = 0 as Entity;

      expect(manager.hasComponent(entity, ComponentA)).toBe(false);
    });
  });

  describe("removeComponent", () => {
    it("removes component from entity", () => {
      const manager = new ComponentManager();
      const entity = 0 as Entity;

      manager.addComponent(entity, new ComponentA());
      expect(manager.hasComponent(entity, ComponentA)).toBe(true);

      manager.removeComponent(entity, ComponentA);
      expect(manager.hasComponent(entity, ComponentA)).toBe(false);
    });
  });

  describe("removeAllComponents", () => {
    it("removes all components from an entity", () => {
      const manager = new ComponentManager();
      const entity = 0 as Entity;

      manager.addComponent(entity, new ComponentA());
      manager.addComponent(entity, new ComponentB());

      expect(manager.getComponent(entity, ComponentA)).toBeDefined();
      expect(manager.getComponent(entity, ComponentB)).toBeDefined();

      manager.removeAllComponentsForEntity(entity);

      expect(manager.getComponent(entity, ComponentA)).toBeUndefined();
      expect(manager.getComponent(entity, ComponentB)).toBeUndefined();
    });
  });
});
