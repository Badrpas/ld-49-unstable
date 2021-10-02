import { System } from 'eaciest';

export const SceneObject = 'SceneObject';

export class SceneObjectSystem extends System {

  constructor () {
    super([SceneObject]);
  }

  _root = null;
  /**
   * @return {import('three').Scene}
   */
  get root () { return this._root; }
  set root (val) {
    if (!(this._root = val)) return;

    for (const entity of this.buffered) {
      this.onEntityAdded(entity);
    }
    this.buffered = [];
  }

  buffered = [];

  onEntityAdded (entity) {
    if (!this.root) {
      this.buffered.push(entity);
    } else {
      const object3d = entity[SceneObject];
      this.root.add(object3d);
      if (entity.pos) {
        Object.assign(object3d.position, entity.pos);
      }
      entity.pos = object3d.position;
    }
  }

  onEntityRemoved (entity, deletedComponents) {
    // Assuming root is already set
    this.root.remove(entity[SceneObject] || deletedComponents.get(SceneObject));
  }

}


export class RootInitSystem extends System {

  constructor () {
    super(['scene']);
  }

  onEntityAdded (entity) {
    /** @type {LDEngine} */
    const world = this.getEngine();

    for (const system of world._systems) {
      if (system instanceof SceneObjectSystem) {
        system.root = entity.scene;
        world.removeSystem(this);
        return;
      }
    }
  }



}
