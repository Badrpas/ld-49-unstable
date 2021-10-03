
/**
 * @param world {LDEngine}
 */
export const initDebug = world => {
  const g  = window;


  g.world = g.engine = world;


  g.f = new Proxy({}, {
    get (target, component) {
      const r = [];
      for (const entity of world.entities) {
        if (component in entity) {
          r.push(entity);
        }
      }

      if (!r.length) {
        return null;
      }

      if (r.length === 1) {
        return r[0];
      }
      return r;
    },
  });


  g.fs = new Proxy({}, {
    get (target, query) {
      query = query.toLowerCase();
      const r =  world._systems.filter(system => {
        return system.constructor.name.toLowerCase().includes(query);
      });

      if (!r.length) {
        return null;
      }

      if (r.length === 1) {
        return r[0];
      }
      return r;
    },
  });

  g.fm = g.fmap = new Proxy({}, {
    get (target, query) {
      const r = g.f[query];
      if (!r) return r;

      if (r instanceof Array) {
        return r.map(x => x[query]);
      }

      return r[query];
    },
  });
  
  g.fwatch = new Proxy({}, {
    get (target, prop, receiver) {
      const map = new WeakMap;
      const o = world.isWatchedProperty;
      let last_prop;
      world.isWatchedProperty = function (key) {
        last_prop = key;
        if (key === prop) {
          return true;
        }
        return o.call(this, prop);
      };

      const eb = world._markEntityChanged;
      world._markEntityChanged = function (e, b) {
        if (last_prop === prop) {
          if (!map.has(e) || map.get(e) !== e[prop]) {
            console.log(`[${prop}] changed to`, e[prop], 'on', e);
            map.set(e, e[prop]);
          }
        }
        return eb.call(this, e, b);
      };

      return 'OK';
    },
  });


  return world;
};


const container = document.createElement('div');
Object.assign(container.style, {
  'pointer-events': 'none',
  'user-select': 'none',
  'color': 'white',
  position: 'absolute',
  font: 'caption',
  bottom: '0',
  left: '0',
});

container.addEventListener('contextmenu', e => e.preventDefault());

const rows = {};
const ensure_element = name => {
  if (!rows[name]) {
    const el = document.createElement('div');
    el.innerHTML = name + ' <a><a/>';
    container.appendChild(el);
    rows[name] = el.firstElementChild;

    rows[name].style.color = '#3391ff';
  }
  return rows[name];
};
const set_val = (name, val) => {
  ensure_element(name).innerText = val;
};

window.debug_values = new Proxy({}, {
  set (target, prop, value, receiver) {
    if (typeof value === 'number') {
      value = value.toFixed(2);
    }
    set_val(prop, value);
    return true;
  },
});


document.body.appendChild(container);

let t = 0;
Object.defineProperty(window, 'frameTime', {
  set (v) {
    if (t !== v) set_val('frame time', t = v);
  },
});
