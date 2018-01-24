function prepend(initial, getterGetter) {
  return () => {
    let getter = getterGetter();
    let initialSent = false;
    return () => {
      if (initialSent) {
        const x = getter();
        return x;
      } else {
        initialSent = true;
        return initial;
      }
    };
  };
}

function makeArrayGG(arr) {
  return () => {
    let i = 0;
    return function getArrayItem() {
      return arr[i++];
    };
  };
}

const empty = () => () => {};

const startSeq = prepend(10, prepend(20, prepend(30, prepend(30, empty))));
const seq = startSeq();

console.log(seq());
console.log(seq());
console.log(seq());
console.log(seq());
