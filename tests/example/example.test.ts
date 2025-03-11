import { ECS } from '@/ECS'
import { MovementSystem } from './systems/MovementSystem'
import { Position } from './components/Position'
import { Velocity } from './components/Velocity'
import { describe, it, expect } from 'vitest'

describe('example', () => {
    it('moves entities', () => {
        const ecs = new ECS()
        ecs.addSystem(new MovementSystem())

        ecs.componentManager.addComponent(0, Position, new Position(0, 0))
        ecs.componentManager.addComponent(0, Velocity, new Velocity(1, 1))

        const position = ecs.componentManager.getComponent(0, Position)

        expect(position).toBeDefined()
        expect(ecs.componentManager.getComponent(0, Velocity)).toBeDefined()

        ecs.update(1)

        expect(position).toEqual(new Position(1, 1))
    })
})
