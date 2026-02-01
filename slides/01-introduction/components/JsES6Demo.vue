<template>
<LiveWeb code="// --- Destructurare ---
const persoana = { nume: 'Elena', varsta: 30 };
const { nume, varsta } = persoana;
console.log('Destructurare obj:', nume);

const puncte = [10, 20, 30];
const [primul, alDoilea] = puncte;
console.log('Destructurare array:', primul);

// --- Spread ---
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4];
console.log('Spread array:', arr2);

const obj1 = { a: 1 };
const obj2 = { ...obj1, b: 2 };
console.log('Spread obj:', obj2);

// --- Rest ---
function suma(...numere) {
  return numere.reduce((acc, n) => acc + n, 0);
}
console.log('Rest params:', suma(1, 2, 3, 4));

// --- Scurtcircuitare ---
const utilizatorLogat = true;
utilizatorLogat && console.log('Afișează profil (&&)');

const numeUtilizator = null;
const numeAfisat = numeUtilizator ?? 'Anonim';
console.log('Nullish coalescing (??):', numeAfisat);" consoleOnly editorHeight="600px" />
</template>
