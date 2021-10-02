import { LDEngine } from './ld-engine';
import { createLvl1 } from './levels/lvl1';
import { setup_systems } from './setup-systems';
import { loop } from './utils/update-loop';
import { initDebug } from './utils/debug';


const world = new LDEngine();
initDebug(world);

setup_systems(world);


createLvl1(world);



loop((dt) => world.update(dt / 1000));



