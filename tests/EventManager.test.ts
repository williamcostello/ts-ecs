import { describe, expect, it } from "vitest";
import { EventManager } from "@/EventManager";
import { Entity } from "@/EntityManager";

class EventA {
  constructor(public other: Entity) {}
}

class EventB {
  constructor(public amount: number) {}
}

describe("EventManager", () => {
  describe("addEvent", () => {
    it("adds an event for an entity", () => {
      const manager = new EventManager();
      const entity = 0 as Entity;

      manager.addEvent(entity, new EventA(1 as Entity));

      const events = manager.getEvents(entity, EventA);
      expect(events).toHaveLength(1);
    });

    it("allows multiple events of the same type on the same entity", () => {
      const manager = new EventManager();
      const entity = 0 as Entity;

      manager.addEvent(entity, new EventA(1 as Entity));
      manager.addEvent(entity, new EventA(2 as Entity));

      const events = manager.getEvents(entity, EventA);
      expect(events).toHaveLength(2);
    });

    it("allows different event types on the same entity", () => {
      const manager = new EventManager();
      const entity = 0 as Entity;

      manager.addEvent(entity, new EventA(1 as Entity));
      manager.addEvent(entity, new EventB(10));

      expect(manager.getEvents(entity, EventA)).toHaveLength(1);
      expect(manager.getEvents(entity, EventB)).toHaveLength(1);
    });
  });

  describe("getEvents", () => {
    it("returns events with correct data", () => {
      const manager = new EventManager();
      const entity = 0 as Entity;
      const other = 1 as Entity;

      manager.addEvent(entity, new EventA(other));

      const events = manager.getEvents(entity, EventA);
      expect(events[0].other).toBe(other);
    });

    it("returns empty array when entity has no events of that type", () => {
      const manager = new EventManager();
      const entity = 0 as Entity;

      const events = manager.getEvents(entity, EventA);
      expect(events).toEqual([]);
    });

    it("does not return events of a different type", () => {
      const manager = new EventManager();
      const entity = 0 as Entity;

      manager.addEvent(entity, new EventB(10));

      const events = manager.getEvents(entity, EventA);
      expect(events).toEqual([]);
    });
  });

  describe("getEntitiesWithEvent", () => {
    it("returns entities that have the event type", () => {
      const manager = new EventManager();
      const entityA = 0 as Entity;
      const entityB = 1 as Entity;

      manager.addEvent(entityA, new EventA(entityB));
      manager.addEvent(entityB, new EventA(entityA));

      const entities = [...manager.getEntitiesWithEvent(EventA)];
      expect(entities).toContain(entityA);
      expect(entities).toContain(entityB);
    });

    it("returns empty iterator when no entities have the event type", () => {
      const manager = new EventManager();

      const entities = manager.getEntitiesWithEvent(EventA);
      expect(entities.next().done).toBe(true);
    });

    it("does not return entities that only have a different event type", () => {
      const manager = new EventManager();
      const entity = 0 as Entity;

      manager.addEvent(entity, new EventB(10));

      const entities = [...manager.getEntitiesWithEvent(EventA)];
      expect(entities).toHaveLength(0);
    });
  });

  describe("flush", () => {
    it("clears all events after flush", () => {
      const manager = new EventManager();
      const entity = 0 as Entity;

      manager.addEvent(entity, new EventA(1 as Entity));
      manager.flush();

      expect(manager.getEvents(entity, EventA)).toEqual([]);
    });

    it("clears events across all entities and types", () => {
      const manager = new EventManager();
      const entityA = 0 as Entity;
      const entityB = 1 as Entity;

      manager.addEvent(entityA, new EventA(entityB));
      manager.addEvent(entityB, new EventB(5));
      manager.flush();

      expect(manager.getEvents(entityA, EventA)).toEqual([]);
      expect(manager.getEvents(entityB, EventB)).toEqual([]);
    });

    it("allows new events to be added after flush", () => {
      const manager = new EventManager();
      const entity = 0 as Entity;

      manager.addEvent(entity, new EventA(1 as Entity));
      manager.flush();
      manager.addEvent(entity, new EventA(2 as Entity));

      const events = manager.getEvents(entity, EventA);
      expect(events).toHaveLength(1);
      expect(events[0].other).toBe(2 as Entity);
    });
  });
});
