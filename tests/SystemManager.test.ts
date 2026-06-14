import { describe, expect, it, vi } from "vitest";
import { type System, SystemManager } from "@/SystemManager";
import type { ECS } from "@/ECS";

const mockEcs = {} as ECS;

function makeSystem(enabled = true): System {
  return { enabled, update: vi.fn() };
}

describe("SystemManager", () => {
  describe("addSystem", () => {
    it("adds systems", () => {
      const manager = new SystemManager();
      const system = makeSystem();

      manager.addSystem(system);
      manager.update(mockEcs, 0);

      expect(system.update).toHaveBeenCalledOnce();
    });

    it("supports multiple systems", () => {
      const manager = new SystemManager();
      const systemA = makeSystem();
      const systemB = makeSystem();

      manager.addSystem(systemA);
      manager.addSystem(systemB);
      manager.update(mockEcs, 0);

      expect(systemA.update).toHaveBeenCalledOnce();
      expect(systemB.update).toHaveBeenCalledOnce();
    });
  });

  describe("update", () => {
    it("passes ecs and dt to each system", () => {
      const manager = new SystemManager();
      const system = makeSystem();

      manager.addSystem(system);
      manager.update(mockEcs, 16);

      expect(system.update).toHaveBeenCalledWith(mockEcs, 16);
    });

    it("calls systems in the order they were added", () => {
      const manager = new SystemManager();
      const order: number[] = [];

      manager.addSystem({ enabled: true, update: () => order.push(1) });
      manager.addSystem({ enabled: true, update: () => order.push(2) });
      manager.addSystem({ enabled: true, update: () => order.push(3) });

      manager.update(mockEcs, 0);

      expect(order).toEqual([1, 2, 3]);
    });

    it("does nothing when no systems are registered", () => {
      const manager = new SystemManager();
      expect(() => manager.update(mockEcs, 0)).not.toThrow();
    });

    it("skips disabled systems", () => {
      const manager = new SystemManager();
      const active = makeSystem(true);
      const inactive = makeSystem(false);

      manager.addSystem(active);
      manager.addSystem(inactive);
      manager.update(mockEcs, 0);

      expect(active.update).toHaveBeenCalledOnce();
      expect(inactive.update).not.toHaveBeenCalled();
    });
  });
});
