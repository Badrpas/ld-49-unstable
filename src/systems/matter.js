import Matter from 'matter-js';
import { System } from 'eaciest';
import { xor } from '../utils/selectors';

const {
  Engine,
  Runner,
  Render,
  Events,
  Bodies,
  Composite,
  Body,
  World,
} = Matter;

export const CollisionList = 'collision_list';
export const NewCollisionList = 'new_collision_list';
export const ExitCollisionList = 'exit_collision_list';


/** @returns {Set<Entity>} */
export const getCollisionList = (e) => {
  return e[CollisionList] || (e[CollisionList] = new Set);
};
/** @returns {Set<Entity>} */
export const getStartCollisionList = (e) => {
  return e[NewCollisionList] || (e[NewCollisionList] = new Set);
};
/** @returns {Set<Entity>} */
export const getEndCollisionList = (e) => {
  return e[ExitCollisionList] || (e[ExitCollisionList] = new Set);
};

export const on_collision_start = (a, b) => {
  getCollisionList(a).add(b);
  getCollisionList(b).add(a);
  getStartCollisionList(a).add(b);
  getStartCollisionList(b).add(a);
};

export const on_collision_end = (a, b) => {
  getCollisionList(a).delete(b);
  getCollisionList(b).delete(a);
  getEndCollisionList(a).add(b);
  getEndCollisionList(b).add(a);
};


export const BodyLink = 'BodyLink';
export const getEntityBody = (obj) => obj[BodyLink];


export class MatterSystem extends System {

  constructor () {
    super(['pos', 'shape', xor('rigid', 'static')]);
  }

  initialize () {
    this.engine = Engine.create({
      gravity: { x: 0, y: 0 },
    });
    this.world = this.engine.world;



    Events.on(this.engine, 'collisionStart', this.onCollisionStart);
    Events.on(this.engine, 'collisionEnd', this.onCollisionEnd);

    super.initialize();
  }

  update (dt) {
    const start = Date.now();
    let _start = start;
    for (const entity of this.entities) {
      const body = getEntityBody(entity);
      Body.setPosition(body, entity.pos);
    }
    const first = Date.now() - _start;
    _start = Date.now();

    Engine.update(this.engine, dt * 1000);

    if (window.debug_matter) {
      if (!this.renderer) {
        this.renderer = Render.create({
          // canvas: window.document.querySelector('canvas'),
          element: window.document.body,
          options: {
            pixelRatio: 2
          },
        });
        this.renderer.engine = this.engine;
      }

      Render.world(this.renderer);
    }

    const engine_update = Date.now() - _start;
    _start = Date.now();

    for (const entity of this.entities) {
      const body = getEntityBody(entity);
      Object.assign(entity.pos, body.position);
    }
    const pos_assign = Date.now() - _start;

    const diff = Date.now() - start;
    if (diff > 50) {
      this.enabled = false;
      // eslint-disable-next-line max-len
      console.error(`Self disabled because it took ${diff} ms to update. [first=${first}, engine_update=${engine_update}, pos_assign=${pos_assign}]`);
    }
  }

  createBody (entity) {
    const { pos, shape, bodyOptions = {} } = entity;
    switch (shape) {
      case 'circle':
        return Bodies.circle(pos.x, pos.y, entity.radius ?? 0.5, {
          isStatic: !!entity.static,
          ...bodyOptions,
        });
    }
  }

  onEntityAdded (entity, collectionName) {
    // Skip if already added
    if (getEntityBody(entity)) return;

    const body = this.createBody(entity);
    if (!body) return console.warn(`Couldn't create a body for shape ${entity.shape}`);

    body[BodyLink] = entity;
    entity[BodyLink] = body;

    Composite.add(this.world, body);
    console.log('added new body');
  }

  removeEntity (entity, collectionName) {
    if (this.entities.has(entity)) {
      const body = getEntityBody(entity);
      World.remove(this.world, body);
    }
    return super.removeEntity(entity, collectionName);
  }

  onCollisionStart = e => {
    const { pairs } = e;

    // console.log('collision start; pair count =', pairs.length);
    for (const { bodyA, bodyB } of pairs) {
      const a = getEntityBody(bodyA);
      const b = getEntityBody(bodyB);
      on_collision_start(a, b);
    }
  };

  onCollisionEnd = e => {
    const { pairs } = e;
    // console.log('collision end; pair count =', pairs.length);
    for (const { bodyA, bodyB } of pairs) {
      const a = getEntityBody(bodyA);
      const b = getEntityBody(bodyB);
      on_collision_end(a, b);
    }
  };

}
