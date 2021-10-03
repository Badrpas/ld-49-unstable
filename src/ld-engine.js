import { Engine, System } from 'eaciest';
import { PerfMeasurer } from './utils/perf-measurer';


const LastSystemCallUpdate = Symbol('Last system update');

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

  perf = new PerfMeasurer();

  updateSystem (system) {
    const key = system.constructor?.name || system;

    if (system.interval) {
      if (!system[LastSystemCallUpdate] || this.time - system[LastSystemCallUpdate] >= system.interval * 1000) {
        system[LastSystemCallUpdate] = this.time;
      } else {
        this.perf.markPerf(key, 0);
        return;
      }
    }

    this.perf.start(key);
    super.updateSystem(system);
    this.perf.end(key);
  }

}
