import { System } from 'eaciest';


export const DeathMark = 'is_dead';
export const DeathTime = 'death_time';
export const OnDeathCallback = 'OnDeath';



export class DeathSystem extends System {

  constructor () {
    super(['hp']);
  }

  justDied = new Set();

  update () {
    for (const entity of this.entities) {
      if (entity.hp <= 0 && !entity[DeathMark]) {
        entity.hp = 0;
        entity[DeathMark] = true;
        entity[DeathTime] = this.getEngine().now;

        entity.rooted = true;

        this.justDied.add(entity);
      }
    }

    for (const entity of this.justDied) {
      entity[OnDeathCallback]?.();
    }
    this.justDied.clear();
  }

}
