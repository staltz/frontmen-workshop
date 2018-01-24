/**
 * Exercise: implement a fibonacci() pull stream.
 * Hint: Fibonacci numbers follow the rule
 *   current = prev + prevprev
 * and the first two Fibonacci numbers are 1 and 1.
 * E.g.: 1, 1, 2, 3, 5, 8, 13, ...
 */

const pull = require('pull-stream');

function fibonacci() {
  let prev = 1;
  let prevprev = 1;
  let i = 0;
  return function read(end, cb) {
    if (end) return cb(end);
    if (i === 0 || i === 1) {
      i++;
      cb(null, 1);
    } else {
      const current = prev + prevprev;
      prevprev = prev;
      prev = current;
      cb(null, current);
    }
  };
}

pull(
  fibonacci(),
  pull.take(10),
  pull.drain(x => {
    console.log(x);
  })
);
