function* range(from, to) {
  for (let x = from; x <= to; x++) {
    yield x;
  }
}

for (let num of range(40, 49)) {
  console.log(num);
}
