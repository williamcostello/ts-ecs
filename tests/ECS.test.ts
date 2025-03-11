import { describe, it, expect, vi } from 'vitest'
import { ECS } from '@/ECS'
import { System } from '@/System'

describe('ECS', () => {
    it('updates systems', () => {
        const ecs = new ECS()

        const mockUpdate = vi.fn()

        class TestSystem extends System {
            update(ecs: ECS, dt: number) {
                mockUpdate(ecs, dt)
            }
        }

        ecs.addSystem(new TestSystem())
        ecs.update(0)
        expect(mockUpdate).toHaveBeenCalled()
    })
})
