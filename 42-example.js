class Maybe {
  constructor(val, nothing) {
    this.nothing = nothing ? true : false;
    this.value = nothing ? null : val;
  }

  static of(val) {
    return new Maybe(val);
  }

  static nothing() {
    return new Maybe(null, true);
  }

  map(fn) {
    return this.nothing ? this : new Maybe(fn(this.value));
  }

  chain(valToMaybe) {
    return this.nothing ? this : valToMaybe(this.value);
  }
}

const obj = {
  address:
    Math.random() < 0.5
      ? null
      : {
          street:
            Math.random() < 0.5
              ? null
              : {
                  num: Math.random() < 0.5 ? null : '17'
                }
        }
};

const prop = field => x => (x[field] ? Maybe.of(x[field]) : Maybe.nothing());

const num = Maybe.of(obj)
  .chain(prop('address'))
  .chain(prop('street'))
  .chain(prop('num'))
  .map(x => '#' + x);

console.log(num.value);
