/**
 * Exercise: implement a fibonacci() getter getter.
 * Hint: Fibonacci numbers follow the rule
 *   current = prev + prevprev
 * and the first two Fibonacci numbers are 1 and 1.
 * E.g.: 1, 1, 2, 3, 5, 8, 13, ...
 */

function fibonacci() {
  let prev = 1;
  let prevprev = 1;
  let i = 0;
  return () => {
    if (i === 0 || i === 1) {
      i++;
      return 1;
    } else {
      const current = prev + prevprev;
      prevprev = prev;
      prev = current;
      return current;
    }
  };
}

const getNextNum = fibonacci();

setInterval(() => {
  console.log(getNextNum());
}, 500);
