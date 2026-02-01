<template>
<LiveWeb code="const utilizator = {
  nume: 'Ana',
  varsta: 28,
  esteActiv: true,
  'adresa-livrare': 'Str. Principală, Nr. 10',
  salut: function() {
    console.log(`Salut, numele meu este ${this.nume}`);
  },
  // Sintaxă modernă pentru metode
  afiseazaVarsta() {
    console.log(`Am ${this.varsta} de ani.`);
  }
};

// Accesare
console.log('Nume:', utilizator.nume);
console.log('Adresa:', utilizator['adresa-livrare']);

// Apelare metode
utilizator.salut();
utilizator.afiseazaVarsta();" consoleOnly editorHeight="400px" />
</template>
