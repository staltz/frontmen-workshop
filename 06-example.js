const a = {}; // Object.create()
const b = {}; // Object.create()
console.log(a === b);

a.name = 'Alice';
Reflect.set(a, 'age', 38);
console.log(a);
