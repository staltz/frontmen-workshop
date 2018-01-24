function makeArrayGG(arr) {
  return () => {
    let i = 0;
    return function getArrayItem() {
      if (i < arr.length) {
        return { done: false, value: arr[i++] };
      } else {
        return { done: true };
      }
    };
  };
}

const arrGG = makeArrayGG([1, 2, 3]);
const getRes = arrGG();

for (let res = getRes(); !res.done; res = getRes()) {
  console.log(res.value);
}
