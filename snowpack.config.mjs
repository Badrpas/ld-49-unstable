/** @type {import("snowpack").SnowpackUserConfig } */
const config = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/' },
  },
  plugins: [
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
  env: {
  }
};

export default config;
