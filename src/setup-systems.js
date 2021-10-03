import { AudioSystem } from './systems/core/audio';
import { DirToFlipSystem } from './systems/game/dir-to-flip';
import { PerfCollectionSystem } from './systems/core/perf';
import { MaxHpSystem } from './systems/game/max-hp';
import { PhaseSwitchSystem } from './systems/game/phase-switch';
import { HpRenderSystem } from './systems/game/hp-render';
import { MagicSystem, PhaseToColorSystem } from './systems/game/magic';
import { InitializationSystem } from './systems/core/init';
import { TargetPosSystem } from './systems/core/target-pos';
import { CasterAiSystem } from './systems/game/caster-ai';
import { ReceivedDamageSystem } from './systems/game/received-damage';
import { DeathSystem } from './systems/game/death';
import { CollisionCleanupSystem } from './systems/physics/collision-cleanup';
import { OnCollisionSystem } from './systems/physics/collision-dispatching';
import { LifetimeSystem } from './systems/core/lifetime';
import { InputCursorTranslationSystem } from './systems/core/input-cursor-translation';
import { MatterSystem } from './systems/physics/matter';
import { MoveSystem } from './systems/core/move';
import { WasdControllerSystem } from './systems/game/wasd-controller';
import { SceneObjectSystem, RootInitSystem } from './systems/core/scene-object';
import { RenderSystem } from './systems/core/render';
import { InputSystem } from './systems/core/input';


export const setup_systems = (world) => {
  world.addSystemClass(InputCursorTranslationSystem);
  world.addSystemClass(InputSystem);


  world.addSystemClass(LifetimeSystem);
  world.addSystemClass(SceneObjectSystem);
  world.addSystemClass(RootInitSystem);

  world.addSystemClass(PhaseSwitchSystem);

  world.addSystemClass(WasdControllerSystem);
  world.addSystemClass(TargetPosSystem);
  world.addSystemClass(MoveSystem);
  world.addSystemClass(MatterSystem);
  world.addSystemClass(OnCollisionSystem);

  world.addSystemClass(ReceivedDamageSystem);
  world.addSystemClass(DeathSystem);

  world.addSystemClass(RenderSystem);

  world.addSystemClass(CollisionCleanupSystem);
  world.addSystemClass(CasterAiSystem);
  world.addSystemClass(InitializationSystem);
  world.addSystemClass(MagicSystem);
  world.addSystemClass(PhaseToColorSystem);
  world.addSystemClass(MaxHpSystem);
  world.addSystemClass(HpRenderSystem);
  world.addSystemClass(PerfCollectionSystem);
  world.addSystemClass(DirToFlipSystem);
  world.addSystemClass(AudioSystem);
};
