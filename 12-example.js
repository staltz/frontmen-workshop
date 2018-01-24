function add(getX, getY) {
  return () => {
    const x = getX();
    const y = getY();
    return x + y;
  };
}

const arr = [10, 20, 30, 40];
let i = 0;
function getArrayItem() {
  return arr[i++];
}

const arrItemPlusRandom = add(getArrayItem, Math.random);

console.log(arrItemPlusRandom());
console.log(arrItemPlusRandom());
console.log(arrItemPlusRandom());
console.log(arrItemPlusRandom());
