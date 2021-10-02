const components_to_predicats = (components) => {
  return components.map(c => {
    if (typeof c === 'function') {
      return c;
    }
    return e => c in e;
  });
};

export const not = component => {
  const [predicate] = components_to_predicats([component]);
  return entity => {
    return !predicate(entity);
  };
};

export const or = (...components) => {
  const predicates = components_to_predicats(components);
  return entity => predicates.some(p => p(entity));
};


export const xor = (...components) => {
  const predicates = components_to_predicats(components);
  return entity => {
    let count = 0;
    for (const predicate of predicates) {
      count += (predicate(entity));
    }
    return count === 1;
  };
};

export const and = (...components) => {
  const predicates = components_to_predicats(components);
  return entity => predicates.every(p => p(entity));
};
