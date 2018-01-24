function range(from, to) {
  return {
    [Symbol.iterator]: function() {
      return {
        current: from,
        last: to,

        next() {
          if (this.current <= this.last) {
            return { done: false, value: this.current++ };
          } else {
            return { done: true };
          }
        }
      };
    }
  };
}

for (let num of range(40, 49)) {
  console.log(num);
}
