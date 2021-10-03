import { System } from 'eaciest';
import { DeathMark } from './death';

export const ReceivedDamage = 'ReceivedDamage';
export const OnDamageReceivedCallback = 'OnDamageReceived';
export const OnHealReceivedCallback = 'OnHealReceived';


export const add_received_damage = (entity, amount = 0) => {
  if (typeof entity.hp !== 'number' || entity[DeathMark]) return false;

  (entity[ReceivedDamage] = entity[ReceivedDamage] || []).push(amount);
  return true;
};

export class ReceivedDamageSystem extends System {
  constructor () {
    super([ReceivedDamage]);
  }

  update () {
    for (const entity of this.getEntities()) {
      let dmg_taken = 0;
      if (!entity.invincible) for (const dmg of entity[ReceivedDamage]) {
        entity.hp -= dmg;
        dmg_taken += dmg;
      }
      entity.dmg_taken = dmg_taken;
    }

    for (const entity of this.getEntities()) {
      entity.dmg_taken > 0 && entity[OnDamageReceivedCallback]?.();
      entity.dmg_taken < 0 && entity[OnHealReceivedCallback]?.();

      delete entity[ReceivedDamage];
    }
  }
}
