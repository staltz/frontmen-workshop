function* take(amount, iterable) {
  let i = 0;
  for (let x of iterable) {
    if (i++ >= amount) {
      return;
    } else {
      yield x;
    }
  }
}

function* range(from, to) {
  for (let x = from; x <= to; x++) {
    yield x;
  }
}

for (let num of take(4, range(40, 49))) {
  console.log(num);
}
