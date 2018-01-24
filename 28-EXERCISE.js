function* take(amount, iterable) {
  /**
   * Exercise: implement this generator so that
   * it yields a maximum of 'amount' items from the
   * given iterable.
   */
}

function* range(from, to) {
  for (let x = from; x <= to; x++) {
    yield x;
  }
}

for (let num of take(4, range(40, 49))) {
  console.log(num);
}
// 40
// 41
// 42
// 43
