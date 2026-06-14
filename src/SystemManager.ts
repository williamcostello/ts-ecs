import type { ECS } from "./ECS";

export interface System {
  enabled: boolean;
  update(ecs: ECS, dt: number): void;
}

export class SystemManager {
  private systems: System[] = [];

  public addSystem(system: System): void {
    this.systems.push(system);
  }

  public update(ecs: ECS, dt: number): void {
    for (const system of this.systems) {
      if (system.enabled) {
        system.update(ecs, dt);
      }
    }
  }
}
