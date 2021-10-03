import { init_stars } from '../game/stars';
import { createCaster } from '../proto/caster';
import { createPlayer, PlayerMark } from '../proto/player';
import { DeathMark } from '../systems/game/death';
import { WasdController } from '../systems/game/wasd-controller';


/**
 * @param world {LDEngine}
 */
export const createLvl1 = (world) => {
  init_stars(world);


  const player = window.player = world.addEntity(createPlayer({
    pos: { x: 1, y: -1 },
    [WasdController]: true,
  }));

  world.addEntity(createCaster({
    pos: { x: Math.random() * 10 - 5, y: Math.random() * 10 - 5 },
  }));
  world.addEntity(createCaster({
    pos: { x: Math.random() * 10 - 5, y: Math.random() * 10 - 5 },
  }));
  world.addEntity(createCaster({
    pos: { x: Math.random() * 10 - 5, y: Math.random() * 10 - 5 },
  }));
  world.addEntity(createCaster({
    pos: { x: Math.random() * 10 - 5, y: Math.random() * 10 - 5 },
  }));
  world.addEntity(createCaster({
    pos: { x: Math.random() * 10 - 5, y: Math.random() * 10 - 5 },
  }));


  world.hook([PlayerMark, DeathMark])
    .on('onEntityAdded', function (entity) {

    })
    .execute();

}
