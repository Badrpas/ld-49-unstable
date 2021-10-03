

export const rand = (from, to) => {
  if (typeof to === 'undefined') {
    to = from;
    from = 0;
  }
  return from + Math.random() * (to - from);
};

export const rand_int = (from, to) => {
  const r = Math.round(rand(from, to));
  return r === 0 ? 0 : r;
};

export const rand_bool = () => Math.random() >= 0.5;
