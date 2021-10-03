import { System } from 'eaciest';
import { BodyLink, getCollisionList, getEndCollisionList, getStartCollisionList } from './matter';

export class CollisionCleanupSystem extends System {

  constructor () {
    super(BodyLink);
  }

  update () {
    for (const entity of this.entities) {
      getStartCollisionList(entity).clear();
      const continuous = getCollisionList(entity);
      const ended = getEndCollisionList(entity);
      for (const e of ended) {
        continuous.delete(e);
      }
      ended.clear();
    }
  }

}
