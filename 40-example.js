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
