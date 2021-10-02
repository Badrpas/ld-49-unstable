import { System } from 'eaciest';
import { InputComponent } from './input';
import { Vector3 } from 'three';

const vec = new Vector3;
const pos = new Vector3;

export class InputCursorTranslationSystem extends System {

  constructor () {
    super({
      input: [InputComponent],
      camera: ['camera'],
      canvas: ['canvas'],
    });
  }

  update () {
    const input = this.getEntity('input')?.[InputComponent];
    const camera = this.getEntity('camera')?.camera;
    const canvas = this.getEntity('canvas')?.canvas;
    if (!(input && camera && canvas)) return;

    camera.getWorldPosition(input.cursorGlobal);
    // input.cursorGlobal.add(input.cursor);

    vec.set(
      ( input.cursor.x / canvas.width ) * 2 - 1,
      - ( input.cursor.y / canvas.height ) * 2 + 1,
      0.5 );

    vec.unproject( camera );

    vec.sub( input.cursorGlobal ).normalize();

    var distance = - input.cursorGlobal.z / vec.z;

    input.cursorGlobal.copy( input.cursorGlobal ).add( vec.multiplyScalar( distance ) );

  }
}
