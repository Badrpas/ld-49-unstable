import { System } from 'eaciest';
import { Vector3 } from 'three';

const ensureVector = v => v instanceof Vector3 ? v : Object.assign(new Vector3(), v || {});

export class TargetPosSystem extends System {
  constructor () {
    super(['pos', 'targetPos']);
  }

  update () {
    for (const entity of this.getEntities()) {

      if (!entity.targetPos) {
        continue;
      }

      if (entity.targetPos.distanceTo(entity.pos) <= 0.1) {
        delete entity.targetPos;
        entity.dir = ensureVector(entity.dir).set(0,0,0)
        continue;
      }

      entity.dir = ensureVector(entity.dir)
        .copy(entity.targetPos)
        .sub(entity.pos)
        .normalize();
    }
  }
}
