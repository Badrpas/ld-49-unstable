import { System } from 'eaciest';
import { createSprite } from '../../proto/sprite';
import { set_color } from '../../utils/color';
import { SceneObject } from '../core/scene-object';
import { MaxHP } from './max-hp';

export class HpRenderSystem extends System {

  constructor () {
    super(['hp', MaxHP]);
  }

  onEntityAdded (entity, collectionName) {
    entity.hp_gui = world.addEntity({
      ...createSprite('img/blank.png'),
      parent: entity,
      pos: { x: -0.5, y: -0.6, z: -0.1 },
    });

    set_color(entity.hp_gui, 0x00FFFF);
    entity.hp_gui[SceneObject].geometry.translate(0.5, -0.5, 0);
    entity.hp_gui[SceneObject].scale.y = 0.1;
  }

  update () {
    for (const entity of this.getEntities()) {
      const { hp_gui } = entity;
      hp_gui.scale.x = Math.max(0, entity.hp / entity[MaxHP]);
    }
  }

}
