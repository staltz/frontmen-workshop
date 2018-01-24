function makeArrayGG(arr) {
  return () => {
    let i = 0;
    return function getArrayItem() {
      return arr[i++];
    };
  };
}

const arrGG = makeArrayGG([1, 2, 3]);
const getNum = arrGG();

console.log(getRes());
console.log(getRes());
console.log(getRes());
console.log(getRes());
console.log(getRes());
console.log(getRes());
