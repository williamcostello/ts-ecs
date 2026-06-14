import type { System } from "@/SystemManager";
import type { ECS } from "@/ECS";
import { Position } from "../components/Position";
import { Velocity } from "../components/Velocity";

export class MovementSystem implements System {
  enabled = true;

  update(ecs: ECS, dt: number) {
    const entities = ecs.getEntitiesWithComponent<Velocity>(Velocity);

    for (const entity of entities) {
      const position = ecs.getComponent<Position>(entity, Position);
      const velocity = ecs.getComponent<Velocity>(entity, Velocity);

      if (velocity && position) {
        position.x += velocity.x * dt;
        position.y += velocity.y * dt;
      }
    }
  }
}
