const Getter = {
  of: x => () => {
    // console.log(x);
    return x;
  },

  map: (fn, getter) => () => {
    const x = getter();
    return fn(x);
  },

  chain: (fn, getter) => Getter.map(fn, getter)()
};

const getA = Getter.of(10);
const getB = Getter.chain(x => Getter.of(x * 0.2), getA);
const getC = Getter.chain(x => Getter.of('a' + x), getB);
const getD = Getter.map(str => str.toUpperCase(), getC);

console.log(getD());
