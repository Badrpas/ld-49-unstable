import { System } from 'eaciest';
import { UnitPhases, UnitPhaseToColor } from '../../game/unit-phase';
import { createSprite } from '../../proto/sprite';
import { set_color } from '../../utils/color';

export const MagicMark = 'MagicMark';

export class MagicSystem extends System {

  constructor () {
    super(['hasMagic']);
  }

  onEntityAdded (entity, collectionName) {
    entity.magic = world.add({
      ...createSprite('img/magic.png'),
      parent: entity,
      [MagicMark]: true,
    });

    if (!entity.phase) {
      entity.phase = UnitPhases.Purple;
    }
  }

  update () {
    for (const entity of this.getEntities()) {
      set_color(entity.magic, UnitPhaseToColor[entity.phase])
    }
  }

}


export class PhaseToColorSystem extends System {



}

