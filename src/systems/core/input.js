import { System } from 'eaciest';
import { Vector2, Vector3 } from 'three';

export const MouseLeft = Symbol('MouseLeft');
export const MouseMiddle = Symbol('MouseMiddle');
export const MouseRight = Symbol('MouseRight');

export const MOUSE_MAPPING = {
  0: MouseLeft,
  1: MouseMiddle,
  2: MouseRight,
};

export const InputComponent = Symbol('InputInfo');

export class InputSystem extends System {

  priority = Infinity;

  constructor () {
    super('canvas');
  }

  store = {
    keysJustPressed: new Set,
    keysDown: new Set,
    keysReleased: new Set,
    cursor: new Vector3,
    cursorGlobal: new Vector3,
  };

  initialize () {
    super.initialize();

    this.getEngine().add({ [InputComponent]: this.store });

    document.addEventListener('keydown', this.on_key_down);
    document.addEventListener('keyup', this.on_key_up);
  }

  update () {
    this.store.keysReleased.clear();
    this.store.keysJustPressed.clear();
  }

  /**
   * @param canvas {HTMLCanvasElement}
   */
  onEntityAdded ({ canvas }) {
    canvas.addEventListener('contextmenu', this.on_rmb);

    canvas.addEventListener('mousemove', this.on_mouse_move);
    canvas.addEventListener('mousedown', this.on_mouse_down);
    canvas.addEventListener('mouseup', this.on_mouse_up);
  }

  // silence context menu
  on_rmb = (e) => e.preventDefault();

  /** @param e {KeyboardEvent} */
  on_key_down = e => this.on_down(e.code);
  /** @param e {MouseEvent} */
  on_mouse_down = e => this.on_down(MOUSE_MAPPING[e.button]);

  /** @param e {KeyboardEvent} */
  on_key_up = e => this.on_up(e.code);
  /** @param e {MouseEvent} */
  on_mouse_up = e => this.on_up(MOUSE_MAPPING[e.button]);

  /** @param e {MouseEvent} */
  on_mouse_move = e => {
    this.store.cursor.x = e.offsetX;
    this.store.cursor.y = e.offsetY;
  };


  on_down (key) {
    if (!this.store.keysDown.has(key)) {
      this.store.keysJustPressed.add(key);
    }
    this.store.keysDown.add(key);
  }
  on_up (key) {
    this.store.keysDown.delete(key);
    this.store.keysReleased.add(key);
  }
}
