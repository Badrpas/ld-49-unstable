import { System } from 'eaciest';
import { Howl, Howler } from 'howler';
import { AudioCmd } from '../../proto/audio';
import { rand_int } from '../../utils/random';


export class AudioSystem extends System {

  constructor () {
    super([AudioCmd]);
  }

  initialize () {
    super.initialize();
    this.sounds = {};

    this.sounds = {
      switch: new Howl({
        src: [`audio/switch.mp3`],
      }),
      bulk: new Howl({
        src: [`audio/bulk.mp3`],
      }),
      zoom: new Howl({
        src: [`audio/zoom.mp3`],
      }),
      pop: new Howl({
        src: [`audio/pops.mp3`],
        sprite: {
          p0: [0, 50],
          p1: [100, 50],
          p2: [200, 50],
          p3: [300, 50],
        }
      }),
    };
  }

  update () {
    const world = this.getEngine();
    for (const entity of this.getEntities()) {
      const sound = this.sounds[entity[AudioCmd]];
      if (!sound) {
        console.warn(`Sound not found: ${entity[AudioCmd]}`);
        continue;
      }

      const sprites = Object.keys(sound._sprite);
      if (!sprites.length) {
        sound.play();
      } else {
        const spriteName = sprites[rand_int(0, sprites.length - 1)];
        sound.play(spriteName);
      }

      world.removeEntity(entity);
    }
  }

}
