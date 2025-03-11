import type { ECS } from './ECS'

export abstract class System {
    abstract update(ecs: ECS, dt: number): void
}
