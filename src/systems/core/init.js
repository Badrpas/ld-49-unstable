import { System } from 'eaciest';

export class InitializationSystem extends System {
  constructor () {
    super(['init']);
  }

  onEntityAdded (entity, collectionName) {
    entity.init?.(this.getEngine());
  }
}
