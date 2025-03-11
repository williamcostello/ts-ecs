import { describe, it, expect } from 'vitest'
import { EntityManager } from '@/Entity'

describe('EntityManager', () => {
    describe('create', () => {
        it('creates entities', () => {
            const manager = new EntityManager()
            const id = manager.addEntity()
            expect(id).toBe(0)

            const id2 = manager.addEntity()
            expect(id2).toBe(1)
        })

        it('reuses ids', () => {
            const manager = new EntityManager()
            const id = manager.addEntity()
            manager.deleteEntity(id)
            const id2 = manager.addEntity()
            expect(id2).toBe(id)
        })
    })

    it('hasEntity', () => {
        const manager = new EntityManager()
        const id = manager.addEntity()
        expect(manager.hasEntity(id)).toBe(true)
    })

    it('delete', () => {
        const manager = new EntityManager()
        const id = manager.addEntity()
        manager.deleteEntity(id)
        expect(manager.hasEntity(id)).toBe(false)
    })
})
