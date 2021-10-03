
export const allocObj = () => ({});
export const allocArray = () => [];

/**
 * Used to reduce allocations
 * @param keyObj {object|Array}
 * @param storage {Map|WeakMap}
 * @param ctor {function}
 */
export const get_alloc_bucket = (keyObj, storage, ctor = allocObj) => {
  if (!storage.has(keyObj)) {
    storage.set(keyObj, ctor(keyObj));
  }
  return storage.get(keyObj);
};
