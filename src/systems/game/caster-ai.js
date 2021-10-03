import { System } from 'eaciest';
import { Vector3 } from 'three';
import { invert_phase, UnitPhaseToColor } from '../../game/unit-phase';
import { cast_bullet } from '../../proto/bullet';
import { PlayerMark } from '../../proto/player';
import { set_color } from '../../utils/color';
import { rand, rand_int } from '../../utils/random';
import { SceneObject } from '../core/scene-object';


export const CasterAI = 'CasterAI';

const t = new Vector3();
const t1 = new Vector3();

export class CasterAiSystem extends System {

  constructor () {
    super([CasterAI]);
  }

  initialize () {
    super.initialize();

    this.getEngine().hook([PlayerMark])
      .on('onEntityAdded', player => this.player = player)
      .execute();
  }

  update (dt) {
    if (!this.player) return;

    for (const entity of this.getEntities()) {
      const phaseMatch = this.player.phase === entity.phase;

      if (!entity.targetPos) {
        t1.copy(entity.pos).sub(this.player.pos);

        entity.targetPos = (new Vector3)
          .randomDirection()
          .setZ(0)
          .normalize();

        if (phaseMatch) { // run
          entity.targetPos
            .multiplyScalar(rand(4, 5))
            .add(this.player.pos);
        } else { // attack
          entity.targetPos
            .multiplyScalar(rand(1, 3))
            .add(this.player.pos)
            .add(t1.multiplyScalar(rand(0.1, 0.5)));
        }
      }

      const bullet = cast_bullet(entity, this.player.pos, entity.cast_cooldown || 0);
      if (bullet) {
        entity.cast_cooldown = rand(1000, 5000);
        bullet.speed = 7;

        const target = phaseMatch ? this.getOtherAI(entity) : this.player;

        if (!target) {
          continue;
        }

        if (target.dir) {
          const d = target.pos.distanceTo(bullet.pos);
          const sec = d / bullet.speed;
          t.copy(target.dir)
            .multiplyScalar(sec * target.speed)
            .add(target.pos)
            .sub(bullet.pos)
            .normalize();

          bullet.dir.copy(t);
        }
      }
    }
  }

  getOtherAI (caster, retries = 2) {
    let idx = rand_int(1, this.entities.size);
    while (idx) for (const other of this.entities) {
      if (caster === other || --idx) continue;
      if (other.phase !== caster.phase) {
        if (retries) {
          return this.getOtherAI(caster, --retries);
        }
        return;
      }
      return other;
    }
  }


}
