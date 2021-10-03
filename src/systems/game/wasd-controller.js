import { System } from 'eaciest';
import { Vector3 } from 'three';
import { invert_phase } from '../../game/unit-phase';
import { cast_bullet } from '../../proto/bullet';
import { InputComponent, MouseLeft, MouseRight } from '../core/input';
import { DeathMark } from './death';

export const WasdController = 'WasdController';

export class WasdControllerSystem extends System {

  constructor () {
    super({
      pawn: [WasdController],
      input: [InputComponent],
    });
  }

  update () {
    const pawn = this.getEntity('pawn');
    const input = this.getInput();

    if (!(pawn && input) || pawn[DeathMark]) return;

    this.ensureDir(pawn);
    pawn.dir.x = pawn.dir.y = 0;

    if (input.keysDown.has('KeyW')) {
      pawn.dir.y++;
    }
    if (input.keysDown.has('KeyS')) {
      pawn.dir.y--;
    }
    if (input.keysDown.has('KeyD')) {
      pawn.dir.x++;
    }
    if (input.keysDown.has('KeyA')) {
      pawn.dir.x--;
    }

    pawn.dir.normalize();

    if (input.keysDown.has(MouseLeft)) {
      cast_bullet(pawn, input.cursorGlobal);
    }

    // if (input.keysJustPressed.has(MouseRight) && !pawn.rooted) {
    //   pawn.phase = invert_phase(pawn.phase);
    //   pawn.rooted = true;
    //   setTimeout(() => pawn.rooted = false, 200);
    // }
  }

  getInput () {
    return this.getEntity('input')?.[InputComponent];
  }

  ensureDir (entity) {
    entity.dir = entity.dir || new Vector3();
  }
}
