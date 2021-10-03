import { SceneObject } from '../systems/core/scene-object';


export const set_color = (entity, color) => {
  entity[SceneObject].material.color.set(color);
};
