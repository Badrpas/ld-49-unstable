import { System } from 'eaciest';
import { Vector2 } from 'three';
import { createSprite } from '../proto/sprite';
import { InputComponent, MouseLeft } from './input';

export const WasdController = 'WasdController';

export class WasdControllerSystem extends System {

  constructor () {
    super({
      pawns: [WasdController],
      input: [InputComponent],
    });
  }

  update () {
    const pawn = this.getEntity('pawns');
    const input = this.getInput();

    if (!(pawn && input)) return;

    this.ensureDir(pawn);
    pawn.dir.x = pawn.dir.y = 0;

    if (input.keysDown.has('KeyW')) {
      pawn.dir.y++;
    }
    if (input.keysDown.has('KeyS')) {
      pawn.dir.y--;
    }
    if (input.keysDown.has('KeyD')) {
      pawn.dir.x++;
    }
    if (input.keysDown.has('KeyA')) {
      pawn.dir.x--;
    }

    pawn.dir.normalize();
    // console.log(pawn.dir);
    
    if (input.keysReleased.has(MouseLeft)) {
      world.addEntity({
        ...createSprite ('img/def.png'),
        shape: 'circle',
        rigid: true,
        pos: input.cursorGlobal
      });
      console.log(input.cursor, input.cursorGlobal);
    }

  }

  getInput () {
    return this.getEntity('input')?.[InputComponent];
  }


  ensureDir (entity) {
    entity.dir = entity.dir || new Vector2();
  }
}
