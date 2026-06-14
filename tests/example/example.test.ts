import { describe, expect, it } from "vitest";
import { ECS } from "@/ECS";
import { MovementSystem } from "./systems/MovementSystem";
import { Position } from "./components/Position";
import { Velocity } from "./components/Velocity";

describe("example", () => {
  it("moves entities", () => {
    const ecs = new ECS();
    ecs.addSystem(new MovementSystem());

    const entity = ecs.createEntity();

    ecs.addComponent(entity, new Position(0, 0));
    ecs.addComponent(entity, new Velocity(1, 1));

    const position = ecs.getComponent(entity, Position);

    expect(position).toBeDefined();
    expect(ecs.getComponent(entity, Velocity)).toBeDefined();

    ecs.updateSystems(1);

    expect(position).toEqual(new Position(1, 1));
  });
});
