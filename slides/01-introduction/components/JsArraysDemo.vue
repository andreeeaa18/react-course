<template>
<LiveWeb code="const numere = [1, 2, 3, 4, 5];

// map: Creează un nou array cu valorile dublate
const dublate = numere.map(numar => numar * 2);
console.log('Dublate:', dublate);

// filter: Creează un nou array doar cu numerele pare
const pare = numere.filter(numar => numar % 2 === 0);
console.log('Pare:', pare);

// reduce: Calculează suma tuturor numerelor
const suma = numere.reduce((acumulator, numarCurent) => {
  return acumulator + numarCurent;
}, 0); 
console.log('Suma:', suma);

// Combinarea metodelor (chaining)
const sumaParelorDublate = numere
  .filter(n => n % 2 === 0)
  .map(n => n * 2)         
  .reduce((acc, n) => acc + n, 0);
console.log('Suma parelor dublate:', sumaParelorDublate);" consoleOnly editorHeight="500px" />
</template>
