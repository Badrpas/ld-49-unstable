import { ENGINE } from 'eaciest';

/**
 * @interface Entity
 * @extends import('eaciest').IEntity
 */

/**
 * @param e {Entity}
 * @return {LDEngine}
 */
export const get_engine = e => {
  return e?.[ENGINE];
};

/** @param e {Entity} */
export const destroy_entity = e => {
  get_engine(e)?.removeEntity?.(e);
};

/** @param e {Entity} */
export const refresh_entity = e => {
  get_engine(e)?.refreshEntity(e);
};
