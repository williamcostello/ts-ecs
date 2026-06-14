import { describe, expect, it } from "vitest";
import { EntityManager } from "@/EntityManager";

describe("EntityManager", () => {
  describe("create", () => {
    it("creates entities", () => {
      const manager = new EntityManager();
      const id = manager.createEntity();
      expect(id).toBe(0);

      const id2 = manager.createEntity();
      expect(id2).toBe(1);
    });

    it("reuses ids", () => {
      const manager = new EntityManager();
      const id = manager.createEntity();
      manager.deleteEntity(id);
      const id2 = manager.createEntity();
      expect(id2).toBe(id);
    });
  });

  it("has entities", () => {
    const manager = new EntityManager();
    const id = manager.createEntity();
    expect(manager.hasEntity(id)).toBe(true);
  });

  it("deletes entities", () => {
    const manager = new EntityManager();
    const id = manager.createEntity();
    manager.deleteEntity(id);
    expect(manager.hasEntity(id)).toBe(false);
  });

  // describe("queryEntities", () => {
  //   it("queries entities by components", () => {
  //     const manager = new EntityManager();
  //     const compA = class A {};
  //     const compB = class B {};
  //
  //     const entity1 = manager.addEntity();
  //     const entity2 = manager.addEntity();
  //     // @ts-ignore
  //     const entity3 = manager.addEntity();
  //
  //     manager.componentManager.addComponent(entity1, compA, new compA());
  //     manager.componentManager.addComponent(entity1, compB, new compB());
  //     manager.componentManager.addComponent(entity2, compA, new compA());
  //
  //     const noQuery = manager.queryEntities();
  //     expect(noQuery).toEqual([entity1, entity2, entity3]);
  //
  //     const withA = manager.queryEntities(compA);
  //     expect(withA).toEqual([entity1, entity2]);
  //
  //     const withB = manager.queryEntities(compB);
  //     expect(withB).toEqual([entity1]);
  //
  //     const withAB = manager.queryEntities(compA, compB);
  //     expect(withAB).toEqual([entity1]);
  //   });
  // });
});
