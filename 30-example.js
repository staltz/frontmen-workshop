function wait(period) {
  return new Promise(resolve => {
    setTimeout(resolve, period);
  });
}

function range(from, to) {
  return {
    [Symbol.iterator]: function() {
      return {
        current: from,
        last: to,

        next() {
          if (this.current <= this.last) {
            return wait(500).then(() => ({
              done: false,
              value: this.current++
            }));
          } else {
            return wait(500).then(() => ({ done: true }));
          }
        }
      };
    }
  };
}

const iterable = range(40, 49);
const iterator = iterable[Symbol.iterator]();

function logAndNext(res) {
  if (res && !res.done) {
    console.log(res.value);
    return iterator.next();
  }
}

iterator
  .next()
  .then(logAndNext)
  .then(logAndNext)
  .then(logAndNext)
  .then(logAndNext)
  .then(logAndNext)
  .then(logAndNext)
  .then(logAndNext)
  .then(logAndNext)
  .then(logAndNext)
  .then(logAndNext)
  .then(logAndNext)
  .then(logAndNext);
