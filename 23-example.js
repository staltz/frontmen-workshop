function makeArrayIterable(arr) {
  return {
    [Symbol.iterator]: function() {
      return {
        i: 0,
        next() {
          if (this.i < arr.length) {
            return { done: false, value: arr[this.i++] };
          } else {
            return { done: true };
          }
        }
      };
    }
  };
}

const iter = makeArrayIterable([1, 2, 3]);

for (let num of iter) {
  console.log(num);
}
