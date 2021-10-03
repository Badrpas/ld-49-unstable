import { Mesh, MeshBasicMaterial, PlaneBufferGeometry, TextureLoader } from 'three';
import { SceneObject } from '../systems/core/scene-object';

export const createSprite = (url, name = 'sprite') => {

  const map = new TextureLoader().load(url);

  const material = new MeshBasicMaterial({
    map,
    transparent: true,
  });

  const geometry = new PlaneBufferGeometry();
  const plane = new Mesh( geometry, material );
  plane.name = name;

  return {
    [SceneObject]: plane,
  };
};
