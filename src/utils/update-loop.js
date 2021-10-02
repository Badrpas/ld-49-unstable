export const loop = (cb) => {
  let last_update = Date.now();

  requestAnimationFrame(function frame () {
    const dt = Date.now() - last_update;
    last_update = Date.now();

    cb(dt);

    requestAnimationFrame(frame);
  });
};


