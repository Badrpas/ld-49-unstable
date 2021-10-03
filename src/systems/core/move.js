import { System } from 'eaciest';
import { Vector3 } from 'three';

const t = new Vector3;

export class MoveSystem extends System {
  constructor () {
    super(['pos', 'dir']);
  }

  update (dt) {
    for (const entity of this.getEntities()) {
      if (entity.rooted) continue;
      const speed = entity.speed ?? 1;

      Object.assign(t, entity.dir);
      t.multiplyScalar(dt * speed);

      entity.pos.add(t);
    }
  }
}
