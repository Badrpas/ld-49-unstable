import { System } from 'eaciest';
import { or } from '../../utils/selectors';
import { getEndCollisionList, getStartCollisionList } from './matter';


export const OnCollisionCallback = 'onCollision';
export const OnCollisionEndCallback = 'onCollisionEnd';


export class OnCollisionSystem extends System {

  constructor () {
    super(or(OnCollisionCallback, OnCollisionEndCallback));
  }

  update () {
    for (const entity of this.entities) {
      if (entity[OnCollisionCallback]) {
        const list = getStartCollisionList(entity);
        for (const other of list) {
          entity[OnCollisionCallback](other);
        }
      }
      if (entity[OnCollisionEndCallback]) {
        const list = getEndCollisionList(entity);
        for (const other of list) {
          entity[OnCollisionEndCallback](other);
        }
      }
    }
  }

}

