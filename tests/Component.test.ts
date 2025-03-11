import { describe, it, expect } from 'vitest'
import { ComponentManager } from '@/Component'

class TestComponent {
    value = 0
}

describe('ComponentManager', () => {
    describe('addComponent', () => {
        it('adds components', () => {
            const manager = new ComponentManager()
            const entity = 0

            manager.addComponent(entity, TestComponent, new TestComponent())

            expect(manager.components.get(TestComponent)).toBeDefined()
        })

        it('throws when adding same component twice', () => {
            const manager = new ComponentManager()
            const entity = 0

            manager.addComponent(entity, TestComponent, new TestComponent())
            expect(() =>
                manager.addComponent(entity, TestComponent, new TestComponent())
            ).toThrowError()
        })
    })

    describe('getComponent', () => {
        it('gets component', () => {
            const manager = new ComponentManager()
            const entity = 0

            manager.addComponent(entity, TestComponent, new TestComponent())

            const component = manager.getComponent(entity, TestComponent)
            expect(component).toBeDefined()
        })

        it('can get undefined component', () => {
            const manager = new ComponentManager()
            const entity = 0

            const component = manager.getComponent(entity, TestComponent)
            expect(component).toBeUndefined()
        })
    })

    describe('getEntitiesWithComponent', () => {
        it('gets entities with requested component', () => {
            const manager = new ComponentManager()

            manager.addComponent(0, TestComponent, new TestComponent())
            manager.addComponent(1, TestComponent, new TestComponent())

            const entities = manager.getEntitiesWithComponent(TestComponent)
            expect(entities).toBeDefined()
            expect(entities.next().value).toBe(0)
            expect(entities.next().value).toBe(1)
        })

        it('returns empty iterator when no entities with requested component', () => {
            const manager = new ComponentManager()

            const entities = manager.getEntitiesWithComponent(TestComponent)
            const next = entities.next()

            expect(entities).toBeDefined()
            expect(next.done).toBe(true)
            expect(next.value).toBeUndefined()
        })
    })
})
