import { System } from 'eaciest';
import { invert_phase } from '../../game/unit-phase';
import { createSoundCommand } from '../../proto/audio';
import { rand } from '../../utils/random';
import { not } from '../../utils/selectors';
import { MagicMark } from './magic';

export class PhaseSwitchSystem extends System {
  constructor () {
    super(['phase', not(MagicMark)]);
  }
  
  update () {
    const now = Date.now();
    for (const entity of this.getEntities()) {
      if (!entity.next_switch) {
        entity.next_switch = now + rand(3500, 17000);
      }

      if (now - entity.next_switch >= 0) {
        entity.next_switch = now + rand(3500, 17000);
        entity.phase = invert_phase(entity.phase);
        // this.getEngine().addEntity(createSoundCommand('switch'));
        delete entity.targetPos;
      }
    }
  }
}
