<template>
<LiveWeb code="class Calculator {
  static suma(a, b) {
    return a + b;
  }
}
// Se apelează direct pe clasă
const rezultat = Calculator.suma(5, 7);
console.log('Suma statică:', rezultat);

class Utilizator {
  constructor(prenume, nume) {
    this.prenume = prenume;
    this.nume = nume;
  }

  // Getter pentru a obține numele complet
  get numeComplet() {
    return `${this.prenume} ${this.nume}`;
  }

  // Setter pentru a seta numele complet
  set numeComplet(valoare) {
    const [prenume, nume] = valoare.split(' ');
    this.prenume = prenume;
    this.nume = nume;
  }
}

const user = new Utilizator('Ion', 'Popescu');
console.log('Getter:', user.numeComplet); 

user.numeComplet = 'Vasile Ionescu';
console.log('După setter:', user.prenume);" consoleOnly editorHeight="450px" />
</template>
