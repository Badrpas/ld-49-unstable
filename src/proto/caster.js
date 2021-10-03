import { UnitPhases } from '../game/unit-phase';
import { OnDeathCallback } from '../systems/game/death';
import { CasterAI } from '../systems/game/caster-ai';
import { OnDamageReceivedCallback, OnHealReceivedCallback } from '../systems/game/received-damage';
import { set_color } from '../utils/color';
import { destroy_entity } from '../utils/entity';
import { createSprite } from './sprite';


export const createCaster = (props = {}) => {

  return {
    ...createSprite('img/caster-gs.png'),

    [CasterAI]: true,

    speed: 2,
    shape: 'circle',
    rigid: true,

    hp: 4,

    [OnDeathCallback] () {
      setTimeout(destroy_entity, 0, this);
    },

    [OnDamageReceivedCallback] () {
      set_color(this, 0xFF0000);
      setTimeout(set_color, 70, this, 0xFFFFFF);
    },

    [OnHealReceivedCallback] () {
      set_color(this, 0x00FF00);
      setTimeout(set_color, 70, this, 0xFFFFFF);
    },

    phase: UnitPhases.Purple,

    hasMagic: true,

    ...props,
  };

};
