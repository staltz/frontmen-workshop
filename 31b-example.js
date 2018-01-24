// Works in very few browsers, e.g. Firefox 57

function wait(period) {
  return new Promise(resolve => {
    setTimeout(resolve, period);
  });
}

async function* users(from, to) {
  for (let x = from; x <= to; x++) {
    const res = await fetch('http://jsonplaceholder.typicode.com/users/' + x);
    const json = await res.json();
    yield json;
  }
}

function map(f) {
  return async function*(source) {
    for await (let x of source) {
      yield f(x);
    }
  };
}

function filter(condition) {
  return async function*(source) {
    for await (let x of source) {
      if (condition(x)) {
        yield x;
      }
    }
  };
}

async function main() {
  for await (let x of filter(name => name[0] === 'M')(
    map(u => u.name)(users(1, 10)),
  )) {
    console.log(x);
  }
}

main();
