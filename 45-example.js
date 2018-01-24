const fs = require('fs');

const Write = {
  of: x => () => {
    console.log('--> write to file: ' + x);
    fs.appendFileSync('log.txt', JSON.stringify(x) + '\n');
    return x;
  },

  map: (fn, getter) => () => {
    const x = getter();
    return fn(x);
  },

  chain: (fn, getter) => () => {
    const x = getter();
    const getY = fn(x);
    const y = getY();
    return y;
  }
};

const getA = Write.of(10);
const getB = Write.chain(x => Write.of(x * 0.2), getA);
const getC = Write.chain(x => Write.of('a' + x), getB);
const getD = Write.map(str => str.toUpperCase(), getC);

console.log(getD());
