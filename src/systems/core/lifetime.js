import { System } from 'eaciest';
import { destroy_entity } from '../../utils/entity';
import { not } from '../../utils/selectors';

export class LifetimeSystem extends System {

  constructor () {
    super(['lifespan', not('lifespan_exceeded')]);
  }

  update (dt) {
    for (const entity of this.entities) {
      const { lifespan } = entity;
      entity.lifetime = (entity.lifetime ?? 0) + dt;
      if (entity.lifetime >= lifespan) {
        const shouldDestroy = entity.onLifeEnd?.() !== false;
        if (shouldDestroy) {
          destroy_entity(entity);
        }
        entity.lifespan_exceeded = true;
      }
    }
  }
}
