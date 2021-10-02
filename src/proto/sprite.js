import { Mesh, MeshBasicMaterial, PlaneBufferGeometry, TextureLoader } from 'three';
import { SceneObject } from '../systems/scene-object';

export const createSprite = (url) => {

  const map = new TextureLoader().load(url);

  const material = new MeshBasicMaterial( { map } );

  // const sprite = new Sprite( material );


  const geometry = new PlaneBufferGeometry();
  const plane = new Mesh( geometry, material );


  return {
    [SceneObject]: plane,
  };
};
