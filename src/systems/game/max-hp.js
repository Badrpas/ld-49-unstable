import { System } from 'eaciest';

export const MaxHP = 'maxHP';

export class MaxHpSystem extends System {
  constructor () {
    super('hp');
  }

  onEntityAdded (entity, collectionName) {
    entity[MaxHP] = entity.hp;
  }

  update () {
    for (const entity of this.getEntities()) {
      entity[MaxHP] = Math.max(entity[MaxHP], entity.hp);
    }
  }
}
