//a stream of random numbers.
function random(n) {
  return function(end, cb) {
    if (end) return cb(end);
    //only read n times, then stop.
    if (0 > --n) return cb(true);
    cb(null, Math.random());
  };
}

function log(endOrErr, data) {
  if (endOrErr) {
    console.error(endOrErr);
  } else {
    console.log(data);
  }
}

const readRandom = random(3);
readRandom(null, log);
readRandom(null, log);
readRandom(null, log);
readRandom(null, log);
readRandom(null, log);
