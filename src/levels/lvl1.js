import { init_stars } from '../game/stars';
import { createCaster } from '../proto/caster';
import { createPlayer, PlayerMark } from '../proto/player';
import { CasterAI } from '../systems/game/caster-ai';
import { DeathMark } from '../systems/game/death';
import { WasdController } from '../systems/game/wasd-controller';


/**
 * @param world {LDEngine}
 */
export const createLvl1 = (world) => {
  init_stars(world);


  const player = window.player = world.addEntity(createPlayer({
    pos: { x: 1, y: -1 },
    [WasdController]: true,
  }));

  const casterCount = 3;
  world.addEntity(createCaster({
    pos: { x: Math.random() * 10 - 5, y: Math.random() * 10 - 5 },
  }));

  world.hook([PlayerMark, DeathMark])
    .on('onEntityAdded', function (entity) {
      showEndMessage()
    })
    .execute();

  let deadCasterCount = 0;
  world.hook([CasterAI])
    .on('onEntityRemoved', function () {
      if (++deadCasterCount >= casterCount) {
        showEndMessage(true);
      }

      if (deadCasterCount === 1) {
        for (let i = 0; i < casterCount - 1; i++) {
          world.addEntity(createCaster({
            pos: { x: Math.random() * 20 - 5, y: Math.random() * 20 - 5 },
          }));
        }
      }

    })
    .execute();
}


function showEndMessage (win) {
  const container = document.createElement('div');
  container.innerHTML = `
      <div id="bg">
        <a href="#" id="retry">Retry</a>
      </div>
      `;
  document.body.append(container);
  Object.assign(container.style, {
    position: 'fixed',
    color: 'cyan',
    top: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'flex-end',
  });

  const bg = document.getElementById('bg');
  Object.assign(bg.style, {
    width: '400px',
    height: '300px',
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
    'background-color': '#19191b',
    'border-radius': '25px',
    'font-family': 'sans-serif',
    'font-size': '46px',
  });

  if (win) {
    const message = document.createElement('div');
    message.innerHTML = `
      <p>Well done!</p>
    `;
    bg.prepend(message);
  }
  const retry = document.getElementById('retry');
  retry.onclick = () => window.location.reload();
}
