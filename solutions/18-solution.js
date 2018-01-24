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

function add(xSS, ySS) {
  return cb => {
    let latestX = undefined;
    let latestY = undefined;
    let gotX = false;
    let gotY = false;
    xSS(x => {
      latestX = x;
      gotX = true;
      if (gotY) {
        cb(x + latestY);
      }
    });
    ySS(y => {
      latestY = y;
      gotY = true;
      if (gotX) {
        cb(latestX + y);
      }
    });
  };
}

const tenPlusRandomSS = add(tenSS, randomSS);

tenPlusRandomSS(z => console.log(z));
