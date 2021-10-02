import { createPlayer } from '../proto/player';
import { createSprite } from '../proto/sprite';
import { SceneObject } from '../systems/scene-object';
import { WasdController } from '../systems/wasd-controller';


/**
 * @param world {LDEngine}
 */
export const createLvl1 = (world) => {
  world.addEntity({
    ...createSprite ('img/def.png'),
    shape: 'circle',
    rigid: true,
  });
  world.addEntity({
    ...createSprite ('img/def.png'),
    shape: 'circle',
    rigid: true,
    pos: { x: 0, y: 1 }
  });

  const player = window.player = world.addEntity(createPlayer({
    pos: { x: 1, y: -1 },
    [WasdController]: true,
  }));

  world.hook(['camera'])
    .on('onEntityAdded', function (cameraEntity) {
      player[SceneObject].add(cameraEntity.camera);
    })
    .execute();

}
