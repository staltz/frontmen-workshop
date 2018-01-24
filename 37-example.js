function* range(from, to) {
  for (let x = from; x <= to; x++) {
    yield x;
  }
}

function* concat(iterableA, iterableB) {
  for (let x of iterableA) {
    yield x;
  }
  for (let x of iterableB) {
    yield x;
  }
}

const numbers = concat(range(4, 8), range(14, 18));

for (let num of numbers) {
  console.log(num);
}
