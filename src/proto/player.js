import { createSprite } from './sprite';

export const createPlayer = (props = {}) => {
  return {
    speed: 5,

    shape: 'circle',

    rigid: true,

    ...createSprite('img/buddy.png'),
    ...props,
  };
};
