function tenSS(cb) {
  cb(10);
}

function randomSS(cb) {
  cb(Math.random());
}

/**
 * Exercise: implement add() for setter-setters
 * and use it to create tenPlusRandom.
 * Hint: beware of race conditions!
 */
