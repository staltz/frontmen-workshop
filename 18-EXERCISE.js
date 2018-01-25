function tenSS(cb) {
  cb(10);
}

function randomSS(cb) {
  cb(Math.random());
}

function intervalSS(cb) {
  let i = 1;
  setInterval(() => { cb(i++); }, 500);
}

/**
 * Exercise: implement add() for setter-setters
 * and use it to create tenPlusRandom.
 * Hint: beware of race conditions!
 */

function add(xSS, ySS) {
  // return zSS
}
