import { describe, expect, it, vi } from "vitest";
import { ECS } from "@/ECS";
import { type System } from "@/SystemManager";

describe("ECS", () => {
  it("updates systems", () => {
    const ecs = new ECS();

    const mockUpdate = vi.fn();

    class TestSystem implements System {
      enabled = true;

      update(ecs: ECS, dt: number) {
        mockUpdate(ecs, dt);
      }
    }

    ecs.addSystem(new TestSystem());
    ecs.updateSystems(0);
    expect(mockUpdate).toHaveBeenCalled();
  });
});
