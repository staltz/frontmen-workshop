function add(getX, getY) {
  return () => {
    const x = getX();
    const y = getY();
    return x + y;
  };
}

function arrayGG() {
  const arr = [10, 20, 30, 40];
  let i = 0;
  return function getArrayItem() {
    return arr[i++];
  };
}

let arrItemPlusRandom = add(arrayGG(), Math.random);

console.log(arrItemPlusRandom());
console.log(arrItemPlusRandom());
console.log(arrItemPlusRandom());
console.log(arrItemPlusRandom());
