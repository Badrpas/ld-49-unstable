import { Engine, System } from 'eaciest';


export class LDEngine extends Engine {
  persistentQuery (query) {
    const system = super.addSystem(new System(query));
    return system.entities;
  }

  query (query, cb) {
    const system = super.addSystem(new System(query));
    if (typeof cb === 'function') {
      cb(system.entities);
    }
    super.removeSystem(system);
    return system.entities;
  }

  hook (query) {
    const system = new System(query);

    return {
      /**
       * @param event {string}
       * @param handler {function}
       */
      on (event, handler) {
        system[event] = handler;
        return this;
      },

      execute: () => {
        this.addSystem(system);
      },

      cleanup: () => {
        this.removeSystem(system);
      },

      system,
    };
  }
}
