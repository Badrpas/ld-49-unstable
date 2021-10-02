import { System } from 'eaciest';
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';


export class RenderSystem extends System {

  // Set it to be the last
  priority = Infinity;

  constructor () {
    super(['renderer', 'scene', 'camera']);
  }

  // enabled = false;

  initialize () {
    super.initialize();

    const camera = new PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 200 );
    camera.position.z = 10;

    const scene = new Scene();

    const renderer = new WebGLRenderer( { antialias: true } );
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.append(renderer.domElement);

    this.getEngine().addEntity({
      canvas: renderer.domElement
    });

    this.getEngine().addEntity({
      renderer,
      camera,
      scene,
    });
  }

  update () {
    const e = this.getEntity();
    e.renderer.render(e.scene, e.camera);
  }

}
