import { System } from 'eaciest';
import { SceneObject } from '../core/scene-object';

export class DirToFlipSystem extends System {

  constructor () {
    super(['dir', SceneObject]);
  }

  onEntityAdded (entity, collectionName) {
    entity.vis_dir = 1;
  }

  update () {
    for (const entity of this.getEntities()) {
      const { vis_dir } = entity;
      const next_dir = entity.dir.x < 0 ? -1 : 1;
      if (next_dir !== vis_dir) {
        entity.vis_dir = next_dir;
        entity.scale.x = -entity.scale.x;
        const attachedCamera = entity[SceneObject].getObjectByProperty('type', 'PerspectiveCamera');
        if (attachedCamera) {
          attachedCamera.scale.x = -attachedCamera.scale.x;
        }
      }
    }
  }

}
