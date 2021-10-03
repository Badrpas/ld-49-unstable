import { System } from 'eaciest';

export class PerfCollectionSystem extends System {

  interval = 1;

  top_max = 6;

  enabled = false;

  update () {
    const infos = this.getEngine().perf.collect();
    for (let i = 0; i < this.top_max; i++) {
      const { name, avg, sum } = infos[i];
      window.debug_values[`Sys${i}`] = `${(avg).toFixed(5)} (${(sum).toFixed(3)}) ${name}`;
    }
  }

}
