import { System } from '@/System'
import type { ECS } from '@/ECS'
import { Position } from '../components/Position'
import { Velocity } from '../components/Velocity'

export class MovementSystem extends System {
    update(ecs: ECS, dt: number) {
        const entities =
            ecs.componentManager.getEntitiesWithComponent<Position>(Velocity)

        for (const entity of entities) {
            const position = ecs.componentManager.getComponent<Position>(
                entity,
                Position
            )

            const velocity = ecs.componentManager.getComponent<Velocity>(
                entity,
                Velocity
            )

            if (velocity && position) {
                position.x += velocity.x * dt
                position.y += velocity.y * dt
            }
        }
    }
}
