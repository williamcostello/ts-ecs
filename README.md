# ts-ecs

An ECS (Entity Component System) implementation written in TypeScript.

## Concepts

- **Entity** - a numeric identifier representing an object in the world
- **Component** - a plain class holding data attached to an entity
- **System** - a class with an `update` method that operates on entities with specific components
- **Event** - a transient component-like class used to signal something that happened during a frame

## Setup

All interaction goes through the `ECS` class.

```ts
import { ECS } from "ts-ecs";

const ecs = new ECS();
```

## Entities

```ts
const entity = ecs.createEntity();

ecs.hasEntity(entity);     // true
ecs.deleteEntity(entity);  // removes entity and all its components
```

## Components

Components are plain classes. Any class instance can be used as a component.

```ts
class Position {
  constructor(public x: number, public y: number) {}
}

class Velocity {
  constructor(public x: number, public y: number) {}
}

ecs.addComponent(entity, new Position(0, 0));
ecs.addComponent(entity, new Velocity(1, 1));

ecs.getComponent(entity, Position);              // Position instance
ecs.hasComponent(entity, Position);              // true
ecs.removeComponent(entity, Position);
ecs.removeAllComponentsForEntity(entity);
```

## Systems

A system implements the `System` interface and operates on entities each frame via `update`.

```ts
import type { ECS } from "ts-ecs";
import type { System } from "ts-ecs";

class MovementSystem implements System {
  enabled = true;

  update(ecs: ECS, dt: number) {
    for (const entity of ecs.getEntitiesWithComponent(Velocity)) {
      const position = ecs.getComponent(entity, Position);
      const velocity = ecs.getComponent(entity, Velocity);

      if (position && velocity) {
        position.x += velocity.x * dt;
        position.y += velocity.y * dt;
      }
    }
  }
}

ecs.addSystem(new MovementSystem());
ecs.updateSystems(dt); // calls update on all enabled systems
```

Setting `system.enabled = false` causes `updateSystems` to skip that system.

## Events

Events are plain classes emitted by systems and consumed by other systems within the same frame. All events are cleared automatically after `updateSystems` completes.

```ts
class CollisionEvent {
  constructor(public other: Entity) {}
}

// In a physics system: emit events
ecs.addEvent(entity, new CollisionEvent(otherEntity));

// In a response system: read events
for (const entity of ecs.getEntitiesWithEvent(CollisionEvent)) {
  const collisions = ecs.getEvents(entity, CollisionEvent);

  for (const event of collisions) {
    console.log(entity, "collided with", event.other);
  }
}
```

Multiple events of the same type can be added to the same entity in a single frame. System registration order determines which systems see events emitted earlier in the same frame.
