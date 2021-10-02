import { InputCursorTranslationSystem } from './systems/input-cursor-translation';
import { MatterSystem } from './systems/matter';
import { MoveSystem } from './systems/move';
import { WasdControllerSystem } from './systems/wasd-controller';
import { SceneObjectSystem, RootInitSystem } from './systems/scene-object';
import { RenderSystem } from './systems/render';
import { InputSystem } from './systems/input';
import { TestSystem } from './systems/test';


export const setup_systems = (world) => {
  world.addSystemClass(InputCursorTranslationSystem);
  world.addSystemClass(InputSystem);
  world.addSystemClass(TestSystem);
  world.addSystemClass(SceneObjectSystem);
  world.addSystemClass(RootInitSystem);
  world.addSystemClass(WasdControllerSystem);
  world.addSystemClass(MoveSystem);
  world.addSystemClass(RenderSystem);
  world.addSystemClass(MatterSystem);
};
