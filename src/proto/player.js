import { OnDamageReceivedCallback, OnHealReceivedCallback } from '../systems/game/received-damage';
import { set_color } from '../utils/color';
import { createSprite } from './sprite';

export const PlayerMark = 'Player';

export const createPlayer = (props = {}) => {
  return {
    [PlayerMark]: true,

    speed: 5,

    shape: 'circle',

    rigid: true,

    hp: 4,

    invincible: true,

    [OnDamageReceivedCallback] () {
      set_color(this, 0xFF0000);
      setTimeout(set_color, 70, this, 0xFFFFFF);
    },

    [OnHealReceivedCallback] () {
      set_color(this, 0x00FF00);
      setTimeout(set_color, 70, this, 0xFFFFFF);
    },

    init () {
      set_color(this, 0x00FF80);
      setTimeout(() => {
        this.invincible = false;
        set_color(this, 0xFFFFFF);
      }, 1000);
    },

    hasMagic: true,

    ...createSprite('img/player-caster.png', 'main_sprite'),
    ...props,
  };
};
