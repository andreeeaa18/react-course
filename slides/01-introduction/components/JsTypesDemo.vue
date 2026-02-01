<template>
  <LiveWeb code="let a = 10;
let b = a;
b = 20;
console.log('Primitivă: a =', a, ', b =', b);

let obj1 = { val: 10 };
let obj2 = obj1;
obj2.val = 20;
console.log('Referință: obj1.val =', obj1.val, ', obj2.val =', obj2.val);" consoleOnly editorHeight="400px" />
</template>
