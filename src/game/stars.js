import { Vector3 } from 'three';
import { createSprite } from '../proto/sprite';
import { rand } from '../utils/random';

/**
 * @param world {LDEngine}
 */
export const init_stars = world => {
  for (let i = 0; i < 200; i++) {
    const pos = new Vector3()
      .randomDirection()
      .setZ(0)
      .normalize()
      .multiplyScalar(rand(1, 500))
      .setZ(rand(-700, -100));

    world.addEntity({
      ...createSprite('img/blank.png'),
      pos,
    });
  }
};
