import { Vector3 } from 'three';
import { invert_phase, UnitPhaseToColor } from '../game/unit-phase';
import { DeathMark } from '../systems/game/death';
import { OnCollisionCallback } from '../systems/physics/collision-dispatching';
import { add_received_damage } from '../systems/game/received-damage';
import { set_color } from '../utils/color';
import { destroy_entity, get_engine } from '../utils/entity';
import { createSoundCommand } from './audio';
import { createSprite } from './sprite';

const BODY_OPTIONS = {
  isSensor: true,
};

const t = new Vector3;

const clearRoot = entity => entity.rooted = false;

const ShotCooldown = 200;

export const cast_bullet = (shooter, target, cooldown = ShotCooldown) => {
  if (target[DeathMark]) return;

  const last_shot_at = shooter.time_from_last_shoot;
  if (last_shot_at && ((Date.now() - last_shot_at) < cooldown)) {
    return;
  }
  shooter.time_from_last_shoot = Date.now();

  shooter.rooted = true;
  setTimeout(clearRoot, 50, shooter);
  const world = get_engine(shooter);
  const dir = t.copy(target).sub(shooter.pos).normalize()
                        .clone();
  const pos = t.multiplyScalar(0.2).add(shooter.pos)
                        .clone();

  const phase = invert_phase(invert_phase(shooter.phase));
  const bullet = createBullet({
    dir,
    pos,
    shooter,
    phase,
    [OnCollisionCallback] (other) {
      if (other === shooter) return;

      const damage = +(other.phase !== this.phase) * 2 - 1;

      const damaged = add_received_damage(other, damage);

      if (damage <= 0) {
        world.addEntity(createSoundCommand('bulk'));
      } else {
        world.addEntity(createSoundCommand('zoom'));
      }

      destroy_entity(this);
    }
  });
  set_color(bullet, UnitPhaseToColor[phase])

  return world.addEntity(bullet);
};

export const createBullet = (
  props = {},
  url = 'img/power-shot-gs.png'
) => {

  return {
    ...createSprite(url),
    lifespan: 2,
    speed: 10,
    shape: 'circle',
    rigid: true,
    bodyOptions: BODY_OPTIONS,
    scale: { x: 0.5, y: 0.5 },
    ...props,
  }
};
