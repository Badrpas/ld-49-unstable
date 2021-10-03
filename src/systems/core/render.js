import { System } from 'eaciest';
import { Object3D, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { WasdController } from '../game/wasd-controller';
import { SceneObject } from './scene-object';
import { Vector3 } from 'three';

export class RenderSystem extends System {

  // Set it to be the last
  priority = Infinity;

  constructor () {
    super(['renderer', 'scene', 'camera']);
  }

  // enabled = false;

  initialize () {
    super.initialize();

    const aspect = window.innerWidth / window.innerHeight;
    const camera = new PerspectiveCamera( 70, aspect, 0.01, 2000 );
    camera.position.z = 10;

    const scene = new Scene();

    const renderer = new WebGLRenderer( {
      antialias: false,
      // alpha: true,
    });
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


    this.getEngine().hook([WasdController])
      .on('onEntityAdded', entity => {
        const t = new Vector3();

        this.getEngine().addEntity({
          [SceneObject]: camera,
          parent: entity,
        })
      })
      .execute();
  }

  update () {
    const e = this.getEntity();
    e.renderer.render(e.scene, e.camera);
  }

}
